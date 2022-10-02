import * as Device from "expo-device";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

/**
 * Directory name of the media library within local documents on iOS.
 */
const _iOSLibraryDirectory = "library";

/**
 * Service that provides cross-compatibility access to the media library for
 * iOS and Android systems.
 */
export default class FileSystemService {
    static _isReady = false;

    /**
     * Initialises the file system service.
     */
    static async init() {
        if (!FileSystemService._isIOS()) {
            let permission = await MediaLibrary.getPermissionsAsync();
            while (!permission.granted && permission.canAskAgain) {
                permission = await MediaLibrary.requestPermissionsAsync();
            }
            if (!permission.granted) return;
        }

        await FileSystemService._clearDocumentsAndCache();
        FileSystemService._isReady = true;
    }

    /**
     * Clears the document and cache directories. Should only be used
     * while debugging.
     */
    static async _clearDocumentsAndCache() {
        console.warn("FileSystemService: Clearing cache and documents. Disable for production builds.");
        let files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
        for (const file of files) {
            await FileSystem.deleteAsync(`${FileSystem.documentDirectory}${file}`);
        }

        files = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory);
        for (const file of files) {
            await FileSystem.deleteAsync(`${FileSystem.cacheDirectory}${file}`);
        }
    }

    /**
     * Returns whether the file system service is ready for use.
     */
    static async ready() {
        if (!FileSystemService._isReady) await FileSystemService.init();

        return FileSystemService._isReady;
    }

    /**
     * Returns true if the operating system is an iOS variant.
     */
    static _isIOS() {
        return Device.osName === "iOS" || Device.osName === "iPadOS";
    }

    /**
     * Returns a promise that resolves to an array of assets URIs that have been
     * added to the systems media library.
     */
    static async getAssets() {
        if (FileSystemService._isIOS()) return await FileSystemService._getAssetsIOS();
        return await FileSystemService._getAssetsAndroid();
    }

    /**
     * Returns the audio assets via MediaLibrary for the Android system.
     */
    static async _getAssetsAndroid() {
        const options = {
            mediaType: "audio"
        };

        let results = await MediaLibrary.getAssetsAsync(options);
        return await Promise.all(results.assets.map((asset) => {
            return new AudioAsset(asset.uri, asset);
        }));
    }

    /**
     * Returns the audio assets via FileSystem for the iOS system.
     */
    static async _getAssetsIOS() {
        const directory = `${FileSystem.documentDirectory}${_iOSLibraryDirectory}/`;

        await FileSystemService._ensureLibraryDirectoryExistsIOS();

        let results = await FileSystem.readDirectoryAsync(directory);
        return await Promise.all(results.map(async (uri) => {
            return new AudioAsset(uri, await FileSystem.getInfoAsync(`${directory}${uri}`));
        }));
    }

    /**
     * Ensures that the library directory exists on iOS by creating it if it does
     * not already exist.
     */
    static async _ensureLibraryDirectoryExistsIOS() {
        const directory = `${FileSystem.documentDirectory}${_iOSLibraryDirectory}/`;

        let result = await FileSystem.getInfoAsync(directory);
        if (result.exists && result.isDirectory) return;

        await FileSystem.makeDirectoryAsync(directory);
    }

    /**
     * Shows the native document picker and returns true if a file is selected
     * to be added to the library.
     */
    static async addAssetViaDocumentPicker() {
        if (FileSystemService._isIOS()) {
            return await FileSystemService._addAssetViaDocumentPickerIOS();
        }
        return await FileSystemService._addAssetViaDocumentPickerAndroid();
    }

    /**
     * Uses the native document picker and returns true if an asset is selected.
     * This method doesn't really do anything but it exists none-the-less.
     */
    static async _addAssetViaDocumentPickerAndroid() {
        const options = {
            mediaType: "audio"
        };

        let result = await DocumentPicker.getDocumentAsync(options);
        return result.type !== "cancel";
    }

    /**
     * Uses the native document picker, and copies the asset into the media library
     * for iOS. Returns true on success.
     */
    static async _addAssetViaDocumentPickerIOS() {
        const options = {
            type: "*/*",
            copyToCacheDirectory: true
        };
        const directory = `${FileSystem.documentDirectory}${_iOSLibraryDirectory}/`;

        let result = await DocumentPicker.getDocumentAsync(options);
        if (result.type === "cancel") return false;
        const fileName = result.uri
            .substring(result.uri.lastIndexOf("/") + 1);

        try {
            await FileSystem.moveAsync({
                from: result.uri,
                to: `${directory}${fileName}@${result.name}`
            });
        } catch(err) {
            console.error(err);
            return false;
        }

        return true;
    }
}

/**
 * Defines an audio asset class that can be used cross platform. Metadata
 * pulled from files can be stored here.
 */
export class AudioAsset {
    /**
     * Instantiates the asset.
     * @param {string} uri      Asset uri
     * @param {object} fileInfo File info
     */
    constructor(uri, fileInfo) {
        if (FileSystemService._isIOS()) this._buildFromFileInfoIOS(uri, fileInfo);
        else this._buildFromAssetInfoAndroid(uri, fileInfo);
    }

    /**
     * Builds this audio asset from the FileSystem file info.
     * @param {string} uri      Asset uri
     * @param {object} fileInfo File info from FileSystem
     */
    _buildFromFileInfoIOS(uri, fileInfo) {
        const directory = `${FileSystem.documentDirectory}${_iOSLibraryDirectory}/`;

        if (fileInfo === null) {
            this.name = "Untitled";
        } else {
            this.name = uri.substring(uri.lastIndexOf("@") + 1);
        }
        this.uri = `${directory}${uri}`;
    }

    /**
     * Builds this audio asset from the MediaLibrary asset.
     * @param {string} uri      Asset uri
     * @param {object} fileInfo Asset from MediaLibrary
     */
    _buildFromAssetInfoAndroid(uri, fileInfo) {
        this.uri = uri;
        this.name = fileInfo.filename;
    }
}