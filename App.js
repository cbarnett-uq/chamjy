import { StyleSheet, View } from 'react-native';
import React, { useRef } from "react";

import AudioPlayback from "./components/AudioPlayback.js"
import FileSelection from "./components/FileSelection.js"

export default function App() {
    const audioPlayback = useRef()

    return (
        <View style={styles.container}>
            <FileSelection audioPlayback={audioPlayback}/>
            <AudioPlayback ref={ audioPlayback } />
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
