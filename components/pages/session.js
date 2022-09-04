import React from 'react';
import { View } from 'react-native';
import GestureCamera from '../gestures/GestureCamera.js';
import FileSelection from '../FileSelection.js';
import AudioPlayback from '../../services/AudioPlayback.js';
import { StyleService } from '../../services/StyleService.js';

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
            </View>
        );
    }
}