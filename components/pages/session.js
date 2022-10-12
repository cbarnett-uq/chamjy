import React from 'react';
import { Button, View, TouchableHighlight, Text, Dimensions, Image, Switch } from 'react-native';
import GestureCamera from '../gestures/GestureCamera.js';
import AudioPlayback from '../../services/AudioPlayback.js';
import { StyleService } from '../../services/StyleService.js';
import Slider from '@react-native-community/slider';
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

        this.state = {
            currentPopup: ""
        }

        this.playImage = require("../../assets/play.png");
        this.pauseImage = require("../../assets/pause.png");

    }

    componentDidMount() {
        AudioPlayback.register(() => this.handleOnUpdate());
    }

    /**
     * Handles when the play gesture is detected.
     */
    handleOnTogglePlay() {
        console.log("Play");
        AudioPlayback.toggleAudio()
            .then(this.forceUpdate());
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
        AudioPlayback.skipToTime(0);
    }

    handleOnUpdate() {
        this.forceUpdate();
    }

    handleStepBack() {
        AudioPlayback.skipToTime(AudioPlayback.playbackPosition - 5 * 1000);
    }

    handlePlaybackRate(rate) {
        AudioPlayback.setPlaybackRate(rate);
        this.closePopups();
    }

    closePopups() {
        this.setState({currentPopup: ""});
    }

    async scrub(value) {
        await AudioPlayback.skipToTime(AudioPlayback.percentToTime(value));
    }

    renderMarkerPopup() {
        return (
            <View style={StyleService.session.popUpContainer}>
                <TouchableHighlight style={StyleService.session.popUpTouchableTop} onPress={() => { this.handleOnMarkerA(); this.closePopups()} }>
                    <View style={StyleService.session.popUpTouchableInnerContainer}>
                        <Text style={StyleService.session.popUpText}>Marker A</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={StyleService.session.popUpTouchableMiddle} onPress={() => { this.handleOnMarkerB(); this.closePopups() }}>
                    <View style={StyleService.session.popUpTouchableInnerContainer}>
                        <Text style={StyleService.session.popUpText}>Marker B</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={StyleService.session.popUpTouchableBottom}>
                    <View style={StyleService.session.popUpTouchableInnerContainer}>
                        <Text style={StyleService.session.popUpText}>Loop</Text>
                        <View style={{flex:1, flexDirection:'row-reverse'}}>
                            <Switch value={AudioPlayback.shouldLoop} />
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={StyleService.session.triangle} />
            </View>
            )
    }

    renderTempoPopup() {
        return (
            <View style={StyleService.session.popUpContainer}>
                <TouchableHighlight
                    style={StyleService.session.popUpTouchableTop}
                    onPress={() => this.handlePlaybackRate(0.25) }>
                    <View style={StyleService.session.popUpTouchableInnerContainer}>
                        <Text style={StyleService.session.popUpText}>25%</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={StyleService.session.popUpTouchableMiddle}
                    onPress={() => this.handlePlaybackRate(0.5)}>                
                    <View style={StyleService.session.popUpTouchableInnerContainer}>
                        <Text style={StyleService.session.popUpText}>50%</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={StyleService.session.popUpTouchableMiddle}
                    onPress={() => this.handlePlaybackRate(0.75)}>
                    <View style={StyleService.session.popUpTouchableInnerContainer}>
                        <Text style={StyleService.session.popUpText}>75%</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={StyleService.session.popUpTouchableMiddle}
                    onPress={() => this.handlePlaybackRate(1)}>
                    <View style={StyleService.session.popUpTouchableInnerContainer}>
                        <Text style={StyleService.session.popUpText}>Normal</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={StyleService.session.popUpTouchableMiddle}
                    onPress={() => this.handlePlaybackRate(1.25)}>
                    <View style={StyleService.session.popUpTouchableInnerContainer}>
                        <Text style={StyleService.session.popUpText}>125%</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={StyleService.session.popUpTouchableMiddle}
                    onPress={() => this.handlePlaybackRate(1.5)}>
                    <View style={StyleService.session.popUpTouchableInnerContainer}>
                        <Text style={StyleService.session.popUpText}>150%</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={StyleService.session.popUpTouchableBottom}
                    onPress={() => this.handlePlaybackRate(1.75)}>
                    <View style={StyleService.session.popUpTouchableInnerContainer}>
                        <Text style={StyleService.session.popUpText}>175%</Text>
                    </View>
                </TouchableHighlight>
                <View style={StyleService.session.triangle} />
            </View>
            )
    }

    renderHandPopup() {
        return (
            <View style={StyleService.session.popUpContainer}>
                <TouchableHighlight style={StyleService.session.popUpTouchableTop}>
                    <View style={StyleService.session.popUpTouchableInnerContainer}>
                        <Text style={StyleService.session.popUpText}>Right Hand</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={StyleService.session.popUpTouchableBottom}>
                    <View style={StyleService.session.popUpTouchableInnerContainer}>
                        <Text style={StyleService.session.popUpText}>Left Hand</Text>
                    </View>
                </TouchableHighlight>
                <View style={StyleService.session.triangle} />
            </View>
            )
    }

    renderMarkerA() {
        if (AudioPlayback.markerAPosition != -1) {
            var percent = AudioPlayback.markerAPosition / AudioPlayback.totalTimeMillis * 100 + "%";
            return (
                <View style={{ width: "100%", position: 'absolute', alignSelf: 'center', flexDirection: "row", paddingHorizontal: 16 }}>
                    <View style={{ width: percent, alignItems: 'flex-end' }}/>
                    <View>
                        <Text style={{ right: "50%", color: "#fff", fontWeight: "bold" }}>A</Text>
                    </View>
                </View>
            )
        } else {
            return null;
        }
    }

    renderMarkerB() {
        if (AudioPlayback.markerBPosition != -1) {
            var percent = AudioPlayback.markerBPosition / AudioPlayback.totalTimeMillis * 100 + "%";
            return (
                <View style={{ width: "100%", position: 'absolute', alignSelf: 'center', flexDirection: "row", paddingHorizontal: 16 }}>
                    <View style={{ width: percent, alignItems: 'flex-end' }}>
                        <View style={{ backgroundColor: "blue" }}>

                        </View>
                    </View>
                    <View>
                        <Text style={{ right: "50%", color: "#fff", fontWeight: "bold" }}>B</Text>
                    </View>
                </View>
            )
        } else {
            return null
        }
    }

    /**
     * Renders the session component.
     */
    render() {
        return (
            <View style={StyleService.session.container}>
                <Image source={AudioPlayback.audioFile.albumCover}
                    style={{ position: 'absolute', width: "100%", height: "100%", opacity:0.8}} blurRadius={7} />

                <View style={StyleService.session.topHalfContainer}>

                    <TouchableHighlight
                        underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor}
                        onPress={() => { NavigationService.navigate("library") }}
                        style={StyleService.session.homeButton}>
                        <View style={StyleService.session.rowContainerCenter}>
                            <Text numberOfLines={1}
                                style={StyleService.session.mainText}
                            >Back</Text>
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
                        <Image source={AudioPlayback.audioFile.albumCover} style={StyleService.session.currentSongImage} />

                        <Text numberOfLines={1}
                            style={StyleService.session.currentSongNameText}
                        >{AudioPlayback.audioFile.title}</Text>
                        <Text numberOfLines={1}
                            style={StyleService.session.currentSongArtistText}
                        >{AudioPlayback.audioFile.artist}</Text>

                        <View style={StyleService.session.currentSongSliderContainer}>
                            <View style={{}}>
                                <Slider
                                    value={AudioPlayback.totalTimeMillis === 0 ? 0 : AudioPlayback.playbackPosition / AudioPlayback.totalTimeMillis}
                                    minimumValue={0}
                                    maximumValue={1}
                                    onSlidingComplete={this.scrub}
                                />
                                { this.renderMarkerA() }
                                { this.renderMarkerB() }
                                

                            </View>

                            <View style={StyleService.session.rowContainerMargin}>
                                
                                <Text style={StyleService.session.mainText}>{AudioPlayback.playbackTime}</Text>
                                <View style={StyleService.session.endContainer}>
                                    <Text style={StyleService.session.mainText}>{ AudioPlayback.millisToTime(AudioPlayback.totalTimeMillis) }</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>

                

                <View style={StyleService.session.footerContainer}>
                    <View style={StyleService.session.footerPlayButtonContainer}>
                        <TouchableHighlight
                            underlayColor={StyleService.session.footerBarButton.onTouchColor}
                            onPress={() => { this.handleOnTogglePlay() }}
                            style={StyleService.session.footerPlayButton}>
                            <View style={StyleService.session.footerPlayButtonImageContainer}>
                                <Image source={AudioPlayback.getIsPlaying() == false ? this.playImage : this.pauseImage}
                                    style={StyleService.session.footerPlayButtonImage}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                    
                    <View style={StyleService.session.footerBar}>

                        <View style={StyleService.session.footerBarButton}>
                            <TouchableHighlight
                                underlayColor={StyleService.session.footerBarButton.onTouchColor}
                                onPress={() => { this.state.currentPopup === "hand" ? this.setState({ currentPopup: "" }) : this.setState({ currentPopup: "hand" }) }}
                                style={StyleService.session.footerBarButton}>
                                <View style={StyleService.session.footerBarButtonInsideContainer}>
                                    <Image source={require("../../assets/hand.png")}
                                        style={StyleService.session.footerBarButtonImage} />
                                    <Text numberOfLines={1} style={StyleService.session.footerBarButtonText}>Preferred Hand</Text>
                                </View>
                            </TouchableHighlight>


                            {this.state.currentPopup === "hand" ? this.renderHandPopup() : null}
                            
                        </View>
                        
                        <TouchableHighlight
                            underlayColor={StyleService.session.footerBarButton.onTouchColor}
                            onPress={() => { this.handleStepBack() }}
                            style={StyleService.session.footerBarButton}>
                            <View style={StyleService.session.footerBarButtonInsideContainer}>
                                <Image source={require("../../assets/rewind.png")}
                                    style={StyleService.session.footerBarButtonImage} />
                                <Text numberOfLines={1}
                                    style={StyleService.session.footerBarButtonText}>Rewind</Text>
                            </View>
                        </TouchableHighlight>


                        <View style={StyleService.session.footerBarButton}>
                            <TouchableHighlight
                                underlayColor={StyleService.session.footerBarButton.onTouchColor}
                                onPress={() => { this.state.currentPopup === "tempo" ? this.setState({ currentPopup: "" }) : this.setState({ currentPopup: "tempo" }) }}
                                style={StyleService.session.footerBarButton}>
                                <View style={StyleService.session.footerBarButtonInsideContainer}>
                                    <Image source={require("../../assets/tempo.png")}
                                        style={StyleService.session.footerBarButtonImage} />
                                    <Text numberOfLines={1}
                                        style={StyleService.session.footerBarButtonText}>Tempo: {AudioPlayback.playbackRate * 100 + "%" }</Text>
                                </View>
                            </TouchableHighlight>

                            {this.state.currentPopup === "tempo" ? this.renderTempoPopup() : null}

                        </View>

                        
                        <View style={StyleService.session.footerBarButton}>
                            <TouchableHighlight
                                underlayColor={StyleService.session.footerBarButton.onTouchColor}
                                onPress={() => { this.state.currentPopup === "marker" ? this.setState({currentPopup: ""}) : this.setState({currentPopup: "marker"})}}
                                style={StyleService.session.footerBarButton}>
                                <View style={StyleService.session.footerBarButtonInsideContainer}>
                                    <Image source={require("../../assets/marker.png")}
                                        style={StyleService.session.footerBarButtonImage} />
                                    <Text numberOfLines={1}
                                        style={StyleService.session.footerBarButtonText}>Marker</Text>
                                </View>
                            </TouchableHighlight>

                            { this.state.currentPopup === "marker" ? this.renderMarkerPopup() : null}
                            
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}