import { Colors, StyleService } from "../../services/StyleService";
import { View, ActivityIndicator, Dimensions } from 'react-native';
import React from "react";
import { Fontisto } from '@expo/vector-icons';

/**
 * Component for rendering the album cover of the current track.
 */
export class AlbumCover extends React.Component {
    /**
     * Renders the album cover (or empty icon) of the current track.
     * @param { Object } props Component properties. 
     */
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

    /**
     * Updates the album image to display.
     * @param { Object } props Component properties 
     */
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

    /**
     * Renders the album cover component.
     */
    render() {
        const windowWidth = Dimensions.get("window")
            .width;
        const iconScale = windowWidth / 8;

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
                        size={iconScale}
                        color={Colors.dark.contrast}/>
                </View>
            );
        }
    }
}