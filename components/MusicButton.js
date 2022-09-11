import { View, Text, Image, TouchableHighlight } from 'react-native';
import React from "react";
import StyleService from '../services/StyleService';

export default class FileSelection extends React.Component {
    constructor(props) {
        super(props)
        this.style = (new StyleService()).getMainStyle();

        this.onTouch = () => {
            this.props.onPress?.(props.musicAsset.uri)
        }

        this.state = {
            musicAsset: props.musicAsset,
        }
    }

    render() {
        return (
            <TouchableHighlight underlayColor={this.style.musicButtonTouchable.underlayColor} onPress={this.onTouch} style={this.style.musicButtonTouchable}>
                <View style={{alignItems:"center"}}>
                    <Image source={require("../assets/music-note.png")}
                        style={this.style.musicButtonImage}/>
                    <Text numberOfLines={this.style.musicButtonText.numberOfLines}
                        style={this.style.musicButtonText}>
                        {this.state.musicAsset.filename}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}