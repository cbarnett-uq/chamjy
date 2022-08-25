import { View, Text, Button } from 'react-native';
import React from "react";
import * as DocumentPicker from "expo-document-picker";

class AudioPlayback extends React.Component {
    constructor(props) {
        super(props)

        this.audioPlayback = props.audioPlayback
        this.state = {
            fileName: "",
            fileURI: ""
        }
        
        this.pickDocument = async () => {
            let result = await DocumentPicker.getDocumentAsync({ mediaType: "audio" });
            if (result) {
                this.audioPlayback.current.loadAudio(result.uri)
                this.setState({fileName: result.name})
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

export default AudioPlayback