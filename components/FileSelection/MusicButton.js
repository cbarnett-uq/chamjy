import { View, Text, Image, TouchableHighlight } from 'react-native';
import React from "react";
import { StyleService } from '../../services/StyleService';

export default class FileSelection extends React.Component {
    constructor(props) {
        super(props)

        this.onTouch = () => {
            this.props.onPress?.(props.musicAsset.uri)
        }

        this.state = {
            musicAsset: props.musicAsset,
        }
    }

    render() {
        return (
            <TouchableHighlight underlayColor={StyleService.fileSelect.musicButtonTouchable.underlayColor} onPress={this.onTouch} style={StyleService.fileSelect.musicButtonTouchable}>
                <View style={{alignItems:"center"}}>
                    <Image source={require("../../assets/music-note.png")}
                        style={StyleService.fileSelect.musicButtonImage}/>
                    <Text numberOfLines={StyleService.fileSelect.musicButtonText.numberOfLines}
                        style={StyleService.fileSelect.musicButtonText}>
                        {this.state.musicAsset.filename}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}