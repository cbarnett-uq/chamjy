import React from 'react';
import { View } from 'react-native';
import GestureCamera from '../gestures/GestureCamera.js';
import FileSelection from '../FileSelection.js';
import AudioPlayback from '../../services/AudioPlayback.js';
import StyleService from '../../services/StyleService.js';
import FileSelection from '../FileSelection.js'
import AudioPlayback from '../../services/AudioPlayback.js'

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
        this.style = (new StyleService()).getMainStyle();
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
            <View style={this.style}>
                <FileSelection/>
                <GestureCamera
                    onPlay={this.handleOnPlay}
                    onPause={this.handleOnPause}/>
            </View>
        );
    }
}