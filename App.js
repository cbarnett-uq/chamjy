import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Audio } from 'expo-av';

export default function App() {

    const [buttonName, setButtonName] = useState("Play");
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackObject, setPlaybackObject] = useState(null);
    const [playbackStatus, setPlaybackStatus] = useState(null);
    const [playbackTime, setPlaybackTimeVar] = useState("0:00")
    const [playbackRate, setPlaybackRateVar] = useState(1)
    const [fileName, setFileName] = useState("")

    let audio = {
        filename: '',
        uri: '',
    };

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ mediaType: "audio"});
        if (result) {
            if (playbackStatus !== null) {
                playbackObject.unloadAsync();
            }
            audio.uri = result.uri
            setFileName(result.name)
            loadAudio();
        }
    };

    async function loadAudio() {
        const status = await playbackObject.loadAsync(
            { uri: audio.uri },
            { shouldPlay: isPlaying }
        );
        setPlaybackStatus(status);
        setPlaybackRate(playbackRate)
    }

    function audioPlaybackUpdate(status) {
        if (status.isLoaded) {
            var totalSeconds = status.positionMillis / 1000
            var currentSeconds = ("0" + Math.floor(totalSeconds) % 60).slice(-2)
            var currentMinutes = Math.floor(Math.floor(totalSeconds) / 60)
            setPlaybackTimeVar(currentMinutes + ":" + currentSeconds)
        }
    }

    const handleAudioPlayPause = async () => {
        if (playbackObject !== null && playbackStatus !== null && playbackStatus.isLoaded === true) {
            // It will pause our audio
            if (playbackStatus.isPlaying) {
                const status = await playbackObject.pauseAsync();
                setIsPlaying(false);
                setButtonName("Play");
                return setPlaybackStatus(status);
            }

            // It will resume our audio
            if (!playbackStatus.isPlaying) {
                const status = await playbackObject.playAsync();
                setIsPlaying(true);
                setButtonName("Pause");
                return setPlaybackStatus(status);
            }
        }
    };

    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    async function setPlaybackRate(rate) {
        rate = Number(rate)
        setPlaybackRateVar(rate)
        if (playbackObject !== null && playbackStatus !== null && playbackStatus.isLoaded === true) {
            try {
                status = await playbackObject.setStatusAsync({ rate: rate, shouldCorrectPitch: true });
            } catch (error) {
                console.log("Changing the Playback Rate requires Android API >= 23")
            }
        }
    }

    function playbackRateInputChange(input) {
        console.log(input)
        if (isNumeric(input)) {
            if (input < 0) { input = 0 }
            if (input > 16) { input = 16 }
            setPlaybackRate(input)
        }
    }

    useEffect(() => {
        if (playbackObject === null) {
            var audioPlayer = new Audio.Sound();
            setPlaybackObject(audioPlayer);
            audioPlayer.setOnPlaybackStatusUpdate(audioPlaybackUpdate)
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text>{fileName}</Text>
            <Button title={buttonName} onPress={handleAudioPlayPause}/>
            <Button title="Choose File" onPress={pickDocument} />
            <Text>Playback Rate:</Text>
            <TextInput maxLength={3} placeholder="Playback Rate" onChangeText={playbackRateInputChange}></TextInput>
            <Text>{playbackTime}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
