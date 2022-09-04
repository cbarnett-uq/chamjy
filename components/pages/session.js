import React from 'react';
import { View } from 'react-native';
import GestureCamera from '../gestures/GestureCamera.js';
import AudioPlayback from '../../services/AudioPlayback.js';
import { StyleService } from '../../services/StyleService.js';
import { AlbumCover } from '../playback/albumCover.js';
import { TrackSelectNext, TrackSelectPrevious } from '../playback/trackSelect.js';

/**
 * Component that renders the session page.
 */
export default class Session extends React.Component {
    /**
     * Initialises the session component.
     * @param { Object } props 
     */
    constructor(props) {
        super(props);
    }

    /**
     * Handles when the play gesture is detected.
     */
    handleOnPlay() {
        console.log("Play");
        AudioPlayback.play();
    }

    /**
     * Handles when the pause gesture is detected.
     */
    handleOnPause() {
        console.log("Pause");
        AudioPlayback.pause();
    }

    /**
     * Handles when the previous track button is pressed.
     */
    handleOnPrevious() {
        console.log("Play previous track");
    }

    /**
     * Handles when the next track button is pressed.
     */
    handleOnNext() {
        console.log("Play next track");
    }

    /**
     * Renders the session component.
     */
    render() {
        return (
            <View style={StyleService.session.container}>
                <View style={StyleService.session.camera}>
                    <GestureCamera
                        onPlay={this.handleOnPlay}
                        onPause={this.handleOnPause}/>
                </View>

                <View style={StyleService.session.cameraBorder}/>
                <View style={StyleService.session.cameraBackground}/>

                <View style={StyleService.session.verticalContainer}>
                    <View style={StyleService.session.controlsContainer}/>
                    <View style={StyleService.session.controlsContainer}>
                        <TrackSelectPrevious onPress={this.handleOnPrevious}/>
                        <AlbumCover/>
                        <TrackSelectNext onPress={this.handleOnNext}/>
                    </View>
                    <View style={StyleService.session.controlsContainer}/>
                </View>
            </View>
        );
    }
}