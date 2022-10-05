import React from 'react';
import { Button, View, TouchableHighlight, Text, Dimensions, Image } from 'react-native';
import GestureCamera from '../gestures/GestureCamera.js';
import AudioPlayback from '../../services/AudioPlayback.js';
import { StyleService } from '../../services/StyleService.js';
import { Colors } from '../../services/StyleService.js';
import { AlbumCover } from '../playback/albumCover.js';
import { TrackSelectNext, TrackSelectPrevious } from '../playback/trackSelect.js';
import Slider from '@react-native-community/slider';
import { hexToLong } from '@tensorflow/tfjs-core/dist/hash_util';
import NavigationService from "../../services/navigationService.js"

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

        this.getMinDimension = () => {
            const { height, width } = Dimensions.get('screen');
            const min = Math.min(height, width);
            return min;
        }

        this.getMaxDimension = () => {
            const { height, width } = Dimensions.get('screen');
            const max = Math.max(height, width);
            return max;
        }
    }

    /**
     * Handles when the play gesture is detected.
     */
    handleOnTogglePlay() {
        console.log("Play");
        AudioPlayback.toggleAudio();
    }

    /**
     * Handles when the previous track button is pressed.
     */
    handleOnMarkerA() {
        AudioPlayback.setMarkerA();
        console.log("Marker A Set");
    }

    handleOnMarkerB() {
        AudioPlayback.setMarkerB();
        console.log("Marker B set");
    }

    handleOnLoop() {
        AudioPlayback.toggleLoop();
        console.log("Looping toggled");
    }

    handleOnSkipToBeginning() {
        AudioPlayback.skipToBeginning();
    }

    /**
     * Renders the session component.
     */
    render() {
        return (
            <View style={StyleService.session.container}>
                
                <View style={StyleService.session.topHalfContainer}>

                    <TouchableHighlight
                        underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor}
                        onPress={() => { }}
                        style={StyleService.session.homeButton}>
                        <View style={StyleService.session.rowContainerCenter}>
                            <Text numberOfLines={1}
                                style={StyleService.fileSelect.fileSelctionLeftMenuText}
                            > -- Back</Text>
                        </View>
                    </TouchableHighlight>

                    <View style={StyleService.session.cameraContainer}>
                        <GestureCamera
                            onTogglePlay={this.handleOnTogglePlay}
                            onMarkerA={this.handleOnMarkerA}
                            onMarkerB={this.handleOnMarkerB}
                            onLoop={this.handleOnLoop}
                            onSkipToBeginning={this.handleOnSkipToBeginning} />
                    </View>
                    <View style={StyleService.session.cameraOutline} />

                    <View style={ StyleService.session.currentSongContainer }>
                        <Image source={require("../../assets/default-album.png")} style={StyleService.session.currentSongImage} />

                        <Text numberOfLines={1}
                            style={StyleService.session.currentSongNameText}
                        >{AudioPlayback.audioFile.filename === "" ? "No Song Selected" : AudioPlayback.audioFile.filename}</Text>

                        <View style={StyleService.session.currentSongSliderContainer}>
                            <Slider value={0} minimumValue={0} maximumValue={1}/>
                            <View style={StyleService.session.rowContainerMargin}>
                                <Text>{AudioPlayback.playbackTime}</Text>
                                <View style={StyleService.session.endContainer}>
                                    <Text>3:32</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>

                

                <View style={StyleService.session.footerContainer}>
                    <View style={StyleService.session.footerPlayButtonContainer}>
                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor}
                            onPress={() => { this.handleOnPlay() }}
                            style={StyleService.session.footerPlayButton}>
                            <View style={StyleService.session.footerPlayButtonImageContainer}>
                                <Image source={require("../../assets/play.png")}
                                    style={StyleService.session.footerPlayButtonImage}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                    
                    <View style={StyleService.session.footerBar}>
                      
                        <View style={StyleService.session.footerBarButtonContainer}>
                            
                            <TouchableHighlight
                                underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor}
                                onPress={() => { this.handleOnPlay() }}
                                style={StyleService.session.footerBarButton}>
                                <View style={StyleService.session.footerBarButtonInsideContainer}>
                                    <Image source={require("../../assets/music-note.png")}
                                        style={StyleService.session.footerBarButtonImage} />
                                    <Text numberOfLines={1} style={StyleService.session.footerBarButtonText}>Sheet Music</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight
                                underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor}
                                onPress={() => { }}
                                style={StyleService.session.footerBarButton}>
                                <View style={StyleService.session.footerBarButtonInsideContainer}>
                                    <Text numberOfLines={1}
                                        style={StyleService.session.footerBarButtonText}>Rewind</Text>
                                </View>
                            </TouchableHighlight>

                        </View>

                        <View style={StyleService.session.footerBarButtonContainer}>
                            <TouchableHighlight
                                underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor}
                                onPress={() => { }}
                                style={StyleService.session.footerBarButton}>
                                <View style={StyleService.session.footerBarButtonInsideContainer}>
                                    <Text numberOfLines={1}
                                        style={StyleService.session.footerBarButtonText}>Temp: 100%</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight
                                underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor}
                                onPress={() => { NavigationService.navigate("library") }}
                                style={StyleService.session.footerBarButton}>
                                <View style={ StyleService.session.footerBarButtonInsideContainer}>
                                    <Text numberOfLines={1}
                                        style={StyleService.session.footerBarButtonText}>Marker</Text>
                                </View>
                            </TouchableHighlight>
                        </View> 
                    </View>
                </View>

            </View>
        );
    }
}