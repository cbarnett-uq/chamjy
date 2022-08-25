import { View, Text, Button, TextInput } from 'react-native';
import React from "react";
import { Audio } from 'expo-av';

class AudioPlayback extends React.Component {
    

    constructor(props) {
        super(props)

        this.audio = {
            filename: '',
            uri: '',
        };

        this.state = {
            buttonName: "Play",
            audioPlayer: new Audio.Sound(),
            playbackStatus: null,
            playbackTime: "0:00",
            playbackRate: 1
        }

        this.handleAudioPlayPause = async () => {
            if (this.state.audioPlayer !== null && this.state.playbackStatus !== null && this.state.playbackStatus.isLoaded === true) {
                // It will pause our audio
                if (this.state.playbackStatus.isPlaying) {
                    const status = await this.state.audioPlayer.pauseAsync();
                    this.setState({buttonName: "Play"})
                    this.setState({playbackStatus: status})
                }

                // It will resume our audio
                else if (!this.state.playbackStatus.isPlaying) {
                    const status = await this.state.audioPlayer.playAsync();
                    this.setState({ buttonName: "Pause" })
                    this.setState({ playbackStatus: status })
                }
            }
        };

        this.isNumericc = async (str) => {
            if (typeof str != "string") return false // we only process strings!  
            return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
                !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
        }

        this.audioPlaybackUpdate = (status) => {
            if (status.isLoaded) {
                var totalSeconds = status.positionMillis / 1000
                var currentSeconds = ("0" + Math.floor(totalSeconds) % 60).slice(-2)
                var currentMinutes = Math.floor(Math.floor(totalSeconds) / 60)
                this.setState({ playbackTime: currentMinutes + ":" + currentSeconds })
            }
        }

        this.changePlaybackRate = async (rat) => {
            var rate = Number(rat)
            this.setState({ playbackRate: rate })

            if (this.state.audioPlayer !== null && this.state.playbackStatus !== null && this.state.playbackStatus.isLoaded === true) {
                try {
                    this.setState({ playbackStatus: await this.state.audioPlayer.setStatusAsync({ rate: rate, shouldCorrectPitch: true }) })
                } catch (error) {
                    console.log(error)
                    console.log("Changing the Playback Rate requires Android API >= 23")
                }
            }
        }

        this.playbackRateInputChange = (input) => {
            if (this.isNumericc(input)) {
                if (input < 0) { input = 0 }
                if (input > 16) { input = 16 }
                this.changePlaybackRate(input)
            }
        }

        this.loadAudio = async (uri) => {

            this.audio.uri = uri
            if (this.state.playbackStatus !== null) {
                await this.state.audioPlayer.unloadAsync();
            }
            const status = await this.state.audioPlayer.loadAsync(
                { uri: this.audio.uri },
                { shouldPlay: false }
            )
            this.setState({
                playbackStatus: status,
                buttonName: "Play",
                playbackTime: "0:00"
            })

            this.changePlaybackRate(this.state.playbackRate)
        }

        this.state.audioPlayer.setOnPlaybackStatusUpdate(this.audioPlaybackUpdate)
    }

    render() {
        return (
            <View>
                <Button title={this.state.buttonName} onPress={this.handleAudioPlayPause} />
                <Text>Playback Rate:</Text>
                <TextInput maxLength={3} placeholder="Playback Rate" onChangeText={this.playbackRateInputChange}></TextInput>
                <Text>{this.state.playbackTime}</Text>
            </View>
        );
    }
}

export default AudioPlayback