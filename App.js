import { StyleSheet, View } from 'react-native';
import React from "react";

import FileSelection from "./components/FileSelection.js"

export default function App() {

    return (
        <View style={styles.container}>
            <FileSelection/>
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
