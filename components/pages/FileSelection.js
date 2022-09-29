import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import React from "react";
import { StyleService } from '../../services/StyleService';
import AudioPlayback from "../../services/AudioPlayback";
import MusicButton from "../FileSelection/MusicButton";
import LeftNavBar from "../FileSelection/LeftNavBar.js";
import FileSystemService from "../../services/fileSystemService.js";

/**
 * Library component for selecting songs from the device.
 */
export default class FileSelection extends React.Component {
    /**
     * Instantiates the library component.
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);

        // Maps named layouts to their respective render functions.
        this.rightLayouts = {
            "Library": () => {
                return this.LibraryLayout();
            },
            "Favourites": () => {
                return this.FavouritesLayout();
            },
            "Played": () => {
                return this.PlayedLayout();
            },
            "Added": () => {
                return this.AddedLayout();
            },
            "Search": () => {
                return this.SearchLayout();
            }
        };

        this.state = {
            hasPermission: false,
            fileURI: "",
            rightView: "Library",
            libraryAssets: [],
            recentlyPlayedAssets: [],
            recentlyAddedAssets: [],
            favouriteAssets: [],
            searchAssets: []
        };
    }

    /**
     * Loads the library.
     */
    async getLibrary() {
        let media = await FileSystemService.getAssets();
        this.setState({ libraryAssets: media });
    }

    /**
     * Displays the document picker to select an audio file.
     */
    async manualSelection() {
        if (await FileSystemService.addAssetViaDocumentPicker()) {
            await this.getLibrary();
        }
    }

    /**
     * Expands / collapses the left panel.
     */
    toggleSide() {
        if (this.state.sideWidth === this.sideWidth) {
            this.setState({ sideWidth: 0 });
        } else {
            this.setState({ sideWidth: this.sideWidth });
        }
    }

    /**
     * Selects a song for play back from the provided URI.
     * @param {string} uri Music resource uri
     */
    async onMusicSelect(uri) {
        await AudioPlayback.loadAudio(uri);
        await AudioPlayback.play();
    }

    /**
     * Changes the current view displayed on the right panel.
     * @param {string} newView View name
     */
    changeRightView(newView) {
        this.setState({ rightView: newView });
    }

    /**
     * Updates the search results from the current search string.
     * @param {string} text New search text
     */
    async onSearchUpdate(text) {
        this.changeRightView("Search");
        var letText = String(text.toLowerCase());
        const newList = [];

        if (letText !== "" && letText !== undefined) {
            let length = this.state
                .libraryAssets
                .length;
            for (var i = 0; i < length; i++) {
                if (this.state
                    .libraryAssets[i]
                    .filename
                    .toLowerCase()
                    .includes(letText)) {
                    newList.push(this.state
                        .libraryAssets[i]);
                }
            }
        }
        this.setState({ searchAssets: newList });
    }

    /**
     * When component is mounted, check for permissions and request
     * them if necessary. Perform initiation.
     */
    async componentDidMount() {
        await this.getLibrary();
    }

    /**
     * Returns the library right hand panel layout.
     */
    LibraryLayout() {
        return (
            <ScrollView>
                <View style={{ marginLeft: "5%", marginTop: "7%" }}>
                    <Text
                        numberOfLines={1}
                        style={StyleService.fileSelect.fileSelectionRightHeader}>
                        Browse
                    </Text>
                    <ScrollView
                        style={StyleService.fileSelect.fileSelectionRightScrollView}
                        horizontal={true}>
                        <TouchableHighlight
                            onPress={() => this.manualSelection()}
                            style={StyleService.fileSelect.musicButtonTouchable}>
                            <View style={{ alignItems: "center" }}>
                                <Image
                                    source={require("../../assets/upload.png")}
                                    style={StyleService.fileSelect.musicButtonImage} />
                            </View>
                        </TouchableHighlight>
                    </ScrollView>
                </View>

                <View style={{ marginLeft: "5%", marginTop: "5%" }}>
                    <Text
                        numberOfLines={1}
                        overflow="scroll"
                        style={StyleService.fileSelect.fileSelectionRightHeader}>
                        Library
                    </Text>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            this.state.libraryAssets.map((item, index) => {
                                return (
                                    <MusicButton
                                        key={item.name + index}
                                        musicAsset={item}
                                        onPress={this.onMusicSelect} />
                                );
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }

    /**
     * Returns the favourites right hand panel layout.
     */
    FavouritesLayout() {
        return (
            <ScrollView>
                <View style={{ marginLeft: "5%", marginTop: "7%" }}>
                    <Text
                        numberOfLines={1}
                        style={StyleService.fileSelect.fileSelectionRightHeader}>
                        FAVOURITES
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap:'wrap'}}>
                        {
                            this.state.libraryAssets.map((item, index) => {
                                return (
                                    <MusicButton
                                        key={item.name + index}
                                        musicAsset={item}
                                        onPress={this.onMusicSelect} />
                                );
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }

    /**
     * Returns the recently played right hand panel layout.
     */
    PlayedLayout() {
        return (
            <ScrollView>
                <View style={{ marginLeft: "5%", marginTop: "7%" }}>
                    <Text
                        numberOfLines={1}
                        style={StyleService.fileSelect.fileSelectionRightHeader}>
                        RECENTLY PLAYED
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            this.state.recentlyPlayedAssets.map((item, index) => {
                                return (
                                    <MusicButton
                                        key={item.name + index}
                                        musicAsset={item}
                                        onPress={this.onMusicSelect} />
                                );
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }

    /**
     * Returns the recently added right hand panel layout.
     */
    AddedLayout() {
        return (
            <ScrollView>
                <View style={{ marginLeft: "5%", marginTop: "7%" }}>
                    <Text
                        numberOfLines={1}
                        style={StyleService.fileSelect.fileSelectionRightHeader}>
                        RECENTLY ADDED
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            this.state.recentlyAddedAssets.map((item, index) => {
                                return (
                                    <MusicButton
                                        key={item.name + index}
                                        musicAsset={item}
                                        onPress={this.onMusicSelect} />
                                );
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }

    /**
     * Returns the search bar right hand panel layout.
     */
    SearchLayout() {
        return (
            <ScrollView>
                <View style={{ marginLeft: "5%", marginTop: "7%" }}>
                    <Text
                        numberOfLines={1}
                        style={StyleService.fileSelect.fileSelectionRightHeader}>
                        SEARCH
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            this.state.searchAssets.map((item, index) => {
                                return (
                                    <MusicButton
                                        key={ item.name + index }
                                        musicAsset={item}
                                        onPress={this.onMusicSelect} />
                                );
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }

    /**
     * Renders the component.
     */
    render() {
        return (
            <View style={StyleService.layout.outerContainer}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <LeftNavBar
                        changeRightView={(view) => this.changeRightView(view) }
                        searchUpdate={(text) => this.onSearchUpdate(text) }/>

                    <View style={{ flex: 2, elevation: 1, backgroundColor: "#fff" }}>
                        {this.rightLayouts[this.state.rightView]()}
                    </View>
                </View>
            </View>
        );
    }
}