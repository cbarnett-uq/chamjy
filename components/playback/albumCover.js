import { Colors, StyleService } from "../../services/StyleService";
import { View, ActivityIndicator } from 'react-native';
import React from "react";
import { Fontisto } from '@expo/vector-icons';

/**
 * Component for rendering the album cover of the current track.
 */
export class AlbumCover extends React.Component {
    constructor(props) {
        super(props);

        if ('imageUri' in props) {
            this.state = {
                hasCover: true,
                imageUri: props.imageUri
            };
        } else {
            this.state = {
                hasCover: false
            };
        }
    }

    onChange(props) {
        if ('imageUri' in props) {
            this.state = {
                hasCover: true,
                imageUri: props.imageUri
            };
        } else {
            this.state = {
                hasCover: false
            };
        }
    }

    render() {
        if (this.state.hasCover) {
            return (
                <View style={StyleService.playback.albumCover}>
                    <Image
                        style={StyleService.playback.fillContainer}
                        source={{uri: this.state.imageUri}}/>
                </View>
            );
        } else {
            return (
                <View style={StyleService.playback.albumCover}>
                    <Fontisto
                        style={StyleService.playback.centerInFlexContainer}
                        name="music-note"
                        size={48}
                        color={Colors.dark.contrast}/>
                </View>
            );
        }
    }
}