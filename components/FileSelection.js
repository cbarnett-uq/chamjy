import { View, Text, Button } from 'react-native';
import React from "react";
import * as DocumentPicker from "expo-document-picker";

import AudioPlayback from "../services/AudioPlayback"

export default class FileSelection extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            fileName: "No File Selected",
            fileURI: ""
        }
        
        this.pickDocument = async () => {
            let result = await DocumentPicker.getDocumentAsync({ mediaType: "audio" });
            if (result.type !== "cancel") {
                await AudioPlayback.loadAudio(result.uri)
                this.setState({ fileName: result.name })
            }
        };
    }

    render() {
        return (
            <View>
                <Text>{this.state.fileName}</Text>
                <Button title="Choose File" onPress={this.pickDocument} />
            </View>
        );
    }
}