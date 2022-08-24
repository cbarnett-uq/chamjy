import { StyleSheet, View, Text, Button, TextInput, SafeAreaView } from 'react-native';
import React, { useState, useEffect, useRef } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Audio } from 'expo-av';
import AudioPlayback from "./components/AudioPlayback.js"

export default function App() {
    const [fileName, setFileName] = useState("")
    const ap = useRef()
    
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ mediaType: "audio"});
        if (result) {
            ap.current.loadAudio(result.uri)
            setFileName(result.name)
        }
    };

    return (
        <View style={styles.container}>
            <Text>{fileName}</Text>
            <Button title="Choose File" onPress={pickDocument} />
            <AudioPlayback ref={ ap } />
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
