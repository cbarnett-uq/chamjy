import { Audio } from 'expo-av';

export default class AudioPlayback {
   
    static audioFile = {
        filename: '',
        uri: '',
    };

    static _isReady = false;
    static audioPlayer = null;
    static playbackStatus = null;
    static playbackRate = 1;
    static playbackTime = "0:00";

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
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            shouldDuckAndroid: false,
            playThroughEarpieceAndroid: false,
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
        });
        AudioPlayback.audioPlayer = new Audio.Sound();
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
            if (!AudioPlayback.playbackStatus.isPlaying) {
                AudioPlayback.status = await AudioPlayback.audioPlayer.pauseAsync();
            }
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
        }
    }

    // This function runs every 100 milliseconds when the audio is playing.
    static audioPlaybackUpdate(status) {
        if (status.isLoaded) {
            var totalSeconds = status.positionMillis / 1000
            var currentSeconds = ("0" + Math.floor(totalSeconds) % 60).slice(-2)
            var currentMinutes = Math.floor(Math.floor(totalSeconds) / 60)
            AudioPlayback.playbackTime = currentMinutes + ":" + currentSeconds
        }
    }

    /**
     * Loads an audio file.
     */
    static async loadAudio(uri) {
        if (!AudioPlayback._isReady) return;
        let status;
        
        if (AudioPlayback.audioPlayer._loaded) {
            await AudioPlayback.unloadAudio()
        }

        AudioPlayback.audioFile.uri = uri;

        try {
            const source = { uri: AudioPlayback.audioFile.uri };
            const state = {
                shouldPlay: false,
                rate: 1.0,
                isMuted: false
            };

            status = await AudioPlayback.audioPlayer
                .loadAsync(
                source,
                state,
                AudioPlayback.audioPlaybackUpdate
            );
        } catch (e) {
            console.error(e);
        }

        AudioPlayback.playbackStatus = status
        AudioPlayback.playbackTime = "0:00"
        AudioPlayback.setPlaybackRate(AudioPlayback.playbackRate)
    }

    static async unloadAudio() {
        await AudioPlayback.audioPlayer
            .unloadAsync();
    }

    static async isNumericc(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

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