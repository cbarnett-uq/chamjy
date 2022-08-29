import { Audio } from 'expo-av';

export default class AudioPlayback {
   
    static audioFile = {
        filename: '',
        uri: '',
    };
    static audioPlayer = new Audio.Sound();
    static playbackStatus = null;
    static playbackRate = 1;
    static playbackTime = "0:00"

    static async toggleAudio() {
        if (AudioPlayback.playbackStatus.isPlaying) {
            AudioPlayback.pause()
        }

        else if (!AudioPlayback.playbackStatus.isPlaying) {
            AudioPlayback.play()
        }
    };

    static async pause() {
        if (AudioPlayback.audioPlayer !== null && AudioPlayback.playbackStatus !== null && AudioPlayback.playbackStatus.isLoaded === true) {
            AudioPlayback.status = await AudioPlayback.audioPlayer.pauseAsync();
        }
    }

    static async play() {
        if (AudioPlayback.audioPlayer !== null && AudioPlayback.playbackStatus !== null && AudioPlayback.playbackStatus.isLoaded === true) {
            // It will resume our audio
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

    static async loadAudio(uri) {
        AudioPlayback.audioFile.uri = uri
        if (AudioPlayback.playbackStatus !== null) {
            await AudioPlayback.unloadAudio()
        }

        const status = await AudioPlayback.audioPlayer.loadAsync(
            { uri: AudioPlayback.audioFile.uri },
            { shouldPlay: false }
        )
        AudioPlayback.playbackStatus = status
        AudioPlayback.playbackTime = "0:00"

        AudioPlayback.setPlaybackRate(AudioPlayback.playbackRate)
    }

    static async unloadAudio() {
        await AudioPlayback.audioPlayer.unloadAsync();
    }

    static async isNumericc(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    static async setPlaybackRate(tempRate) {
        var rate = Number(tempRate)
        AudioPlayback.playbackRate = rate

        if (AudioPlayback.audioPlayer !== null && AudioPlayback.playbackStatus !== null && AudioPlayback.playbackStatus.isLoaded === true) {
            try {
                AudioPlayback.playbackStatus = await AudioPlayback.audioPlayer.setStatusAsync({ rate: rate, shouldCorrectPitch: true })
            } catch (error) {
                console.log(error)
                console.log("Changing the Playback Rate requires Android API >= 23")
            }
        }
    }
}