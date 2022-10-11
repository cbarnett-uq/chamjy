import {
    Audio,
    InterruptionModeAndroid,
    InterruptionModeIOS
} from 'expo-av';

import MusicInfo from './expo-music-info/MusicInfo';

/**
 * Service that controls audio playback.
 */
export default class AudioPlayback {
    static audioFile = {
        filename: '',
        uri: '',
        albumCover: require("../assets/default-album2.png"),
        title: "No Song Selected",
        artist: ""
    };

    static _isReady = false;
    static audioPlayer = null;
    static playbackStatus = null;
    static playbackRate = 1;
    static playbackTime = "0:00";
    static markerAPosition = -1;
    static markerBPosition = -1;
    static shouldLoop = false;
    static isPlaying = false;
    static totalTimeMillis = 0;
    static playbackPosition = 0;

    /**
     * Initialises the service.
     */
    static async init() {
        if (AudioPlayback._isReady) return;

        let permissions = await Audio.getPermissionsAsync();
        while (!permissions.granted && permissions.canAskAgain) {
            permissions = await Audio.requestPermissionsAsync();
        }

        if (!permissions.granted) return;
        await Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
            shouldDuckAndroid: false,
            playThroughEarpieceAndroid: false,
            allowsRecordingIOS: false,
            interruptionModeIOS: InterruptionModeIOS.DoNotMix,
            playsInSilentModeIOS: true,
        });

        AudioPlayback.audioPlayer = new Audio.Sound();
        AudioPlayback._isReady = true;
        AudioPlayback.audioPlayer.setOnPlaybackStatusUpdate(AudioPlayback.audioPlaybackUpdate)
    }

    /**
     * Returns whether the service is ready to be used.
     */
    static async ready() {
        if (!AudioPlayback._isReady) await AudioPlayback.init();

        return AudioPlayback._isReady;
    }

    /**
     * Toggles the audio between paused and playing.
     */
    static async toggleAudio() {
        if (!AudioPlayback._isReady) return;

        if (AudioPlayback.playbackStatus.isPlaying) {
            AudioPlayback.pause()
        } else {
            AudioPlayback.play()
        }
    };

    /**
     * Pauses the current audio file.
     */
    static async pause() {
        if (!AudioPlayback._isReady) return;

        if (AudioPlayback.audioPlayer._loaded) {
            if (AudioPlayback.playbackStatus.isPlaying) {
                AudioPlayback.status = await AudioPlayback.audioPlayer.pauseAsync();
            }
            AudioPlayback.isPlaying = false;
        }
    }

    /**
     * Plays the current audio file.
     */
    static async play() {
        if (!AudioPlayback._isReady) return;

        if (AudioPlayback.audioPlayer._loaded) {
            if (!AudioPlayback.playbackStatus.isPlaying) {
                AudioPlayback.status = await AudioPlayback.audioPlayer.playAsync()
            }
            AudioPlayback.isPlaying = true;
        }
    }

    /**
     * Skips the playback to the beginning of the song.
     */
    static async skipToBeginning() {
        await AudioPlayback._setPlaybackState(AudioPlayback.playbackRate, 0);
    }

    /**
     * Sets the position of marker A.
     */
    static async setMarkerA() {
        if (!AudioPlayback._isReady) return;
        if (!AudioPlayback.audioPlayer._loaded) return;

        AudioPlayback.markerAPosition = AudioPlayback.playbackPosition;
    }

    /**
     * Sets the position of marker B.
     */
    static async setMarkerB() {
       
        if (!AudioPlayback._isReady) return;
        if (!AudioPlayback.audioPlayer._loaded) return;

        AudioPlayback.markerBPosition = AudioPlayback.playbackPosition;
    }

    /**
     * Toggles looping of the audio track.
     */
    static async toggleLoop() {
        if (!AudioPlayback._isReady) return;
        if (!AudioPlayback.audioPlayer._loaded) return;
        if (AudioPlayback.markerAPosition < 0 || AudioPlayback.markerBPosition < 0) return;

        if (AudioPlayback.shouldLoop) AudioPlayback.shouldLoop = false;
        else AudioPlayback.shouldLoop = true;
    }

    /**
     * Sets the playback state including rate and position.
     */
    static async _setPlaybackState(rate, position) {
        if (!AudioPlayback._isReady) return;
        if (!AudioPlayback.audioPlayer._loaded) return;

        const status = {
            rate: rate,
            positionMillis: position,
            shouldCorrectPitch: true
        };
        await AudioPlayback.audioPlayer
            .setStatusAsync(status);
    }

    static millisToTime(millis) {
        var totalSeconds = millis / 1000
        var currentSeconds = ("0" + Math.floor(totalSeconds) % 60).slice(-2)
        var currentMinutes = Math.floor(Math.floor(totalSeconds) / 60)
        return currentMinutes + ":" + currentSeconds;
    }

    // This function runs every 100 milliseconds when the audio is playing.
    static audioPlaybackUpdate(status) {
        if (status.isLoaded) {
            AudioPlayback.playbackStatus = status;
            
            AudioPlayback.playbackPosition = status.positionMillis;
            AudioPlayback.playbackTime = AudioPlayback.millisToTime(status.positionMillis);

            if (AudioPlayback.shouldLoop) {
                if (AudioPlayback.playbackPosition >= AudioPlayback.markerBPosition) {
                    AudioPlayback._setPlaybackState(
                        AudioPlayback.playbackRate,
                        AudioPlayback.markerAPosition);
                }
            }
        }

    }

    static getFileName(musicFile) {
        var fileName = musicFile.name;
        if (fileName == null) {
            fileName = musicFile.filename;
        }
        return fileName;
    }

    static setMetaData(metadata) {
        if (metadata) {
            if (metadata.picture != undefined) {
                AudioPlayback.audioFile.albumCover = { uri: metadata.picture.pictureData };
            } else {
                AudioPlayback.audioFile.albumCover = require("../assets/default-album2.png");
            }

            if (metadata.title != undefined) {
                AudioPlayback.audioFile.title = metadata.title;
            } else {
                AudioPlayback.audioFile.title = AudioPlayback.audioFile.filename;
            }

            if (metadata.artist != undefined) {
                AudioPlayback.audioFile.artist = metadata.artist;
            } else {
                AudioPlayback.audioFile.artist = "";
            }

        } else {
            AudioPlayback.audioFile.albumCover = require("../assets/default-album2.png");
            AudioPlayback.audioFile.title = AudioPlayback.audioFile.filename;
            AudioPlayback.audioFile.artist = "";
        }
    }

    /**
     * Loads an audio file.
     */
    static async loadAudio(musicFile) {
        if (!AudioPlayback._isReady) return;
        let status;
        
        if (AudioPlayback.audioPlayer._loaded) {
            await AudioPlayback.unloadAudio()
        }

        AudioPlayback.audioFile.uri = musicFile.uri;

        try {
            const source = { uri: AudioPlayback.audioFile.uri };
            const state = {
                shouldPlay: false,
                rate: AudioPlayback.playbackRate,
                isMuted: false
            };

            status = await AudioPlayback.audioPlayer
                .loadAsync(
                source,
                state,
                AudioPlayback.audioPlaybackUpdate
            );
            AudioPlayback.audioFile.filename = AudioPlayback.getFileName(musicFile)

            let metadata = await MusicInfo.getMusicInfoAsync(AudioPlayback.audioFile.uri, {
                title: true,
                artist: true,
                album: true,
                genre: true,
                picture: true  
            })
            AudioPlayback.setMetaData(metadata);

        } catch (e) {
            console.error(e);
        }
        
        AudioPlayback.playbackStatus = status
        AudioPlayback.playbackTime = "0:00"
        AudioPlayback.setPlaybackRate(AudioPlayback.playbackRate)
        AudioPlayback.isPlaying = false;
        AudioPlayback.totalTimeMillis = status.durationMillis
    }

    static getIsPlaying() {
        return AudioPlayback.isPlaying;
    }

    /**
     * Unloads the current audio file.
     */
    static async unloadAudio() {
        await AudioPlayback.audioPlayer
            .unloadAsync();
        AudioPlayback.markerAPosition = -1;
        AudioPlayback.markerBPosition = -1;
        AudioPlayback.shouldLoop = false;
    }

    /**
     * Returns whether the input is a numeric string.
     */
    static async isNumericc(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    /**
     * Sets the playback rate of the current audio file.
     * @param {decimal} tempRate Playback rate
     */
    static async setPlaybackRate(tempRate) {
        var rate = Number(tempRate)
        AudioPlayback.playbackRate = rate


        if (AudioPlayback.audioPlayer._loaded) {
            try {
                AudioPlayback.playbackStatus = await AudioPlayback.audioPlayer.setStatusAsync({ rate: rate, shouldCorrectPitch: true })
            } catch (error) {
                console.log(error)
                console.log("Changing the Playback Rate requires Android API >= 23")
            }
        }
    }


}