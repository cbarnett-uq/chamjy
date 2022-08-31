import React from 'react';
import GestureCamera from '../gestures/GestureCamera.js';
import StyleService from '../../services/StyleService.js';

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
        // TODO: Implement playing music
        console.log("Play");
    }

    /**
     * Handles when the pause gesture is detected.
     */
    handleOnPause() {
        // TODO: Implement pausing music
        console.log("Pause");
    }

    /**
     * Renders the session component.
     */
    render() {
        return (
            <GestureCamera
                onPlay={this.handleOnPlay}
                onPause={this.handleOnPause}/>
        );
    }
}