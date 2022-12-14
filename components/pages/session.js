import React from 'react';
import { View, TouchableHighlight, Text, Dimensions, Image, Switch } from 'react-native';
import GestureCamera from '../gestures/GestureCamera.js';
import AudioPlayback from '../../services/AudioPlayback.js';
import { StyleService } from '../../services/StyleService.js';
import Slider from '@react-native-community/slider';
import NavigationService from "../../services/navigationService.js"
import DimensionService from "../../services/DimensionService.js"
import { GestureFeedbackOverlay } from '../playback/gestureFeedbackOverlay.js';
import PredictionService from '../../services/gestures/predictionService.js';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
        
        DimensionService.addListener(() => {
            this.setState({ orientation: DimensionService.getOrientaetion() });
        })

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
            currentPopup: "",
            playbackTime: AudioPlayback.playbackTime,
            isPlaying: AudioPlayback.isPlaying,
            shouldLoop: AudioPlayback.shouldLoop,
            playbackPosition: AudioPlayback.playbackPosition,
            isScrubbing: false,
            orientation: DimensionService.getOrientaetion(),
            lastMessage: ""
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
        AudioPlayback.toggleAudio().then(
            () => {
                this.setState({
                    isPlaying: AudioPlayback.isPlaying,
                    lastMessage: AudioPlayback.isPlaying ? "Paused" : "Playing"
                })
            }
        );
    }

    /**
     * Handles when the previous track button is pressed.
     */
    handleOnMarkerA() {
        AudioPlayback.setMarkerA();
        console.log("Marker A Set");
        this.setState({
            lastMessage: "Set Marker A"
        });
    }

    handleOnMarkerB() {
        AudioPlayback.setMarkerB();
        console.log("Marker B set");
        this.setState({
            lastMessage: "Set Marker B"
        });
    }

    handleOnLoop() {
        let that = this;
        AudioPlayback.toggleLoop().then(
            () => {
                that.setState({
                    shouldLoop: AudioPlayback.shouldLoop,
                    lastMessage: AudioPlayback.shouldLoop ? "Looping on" : "Looping off"
                });
            }
        );
        console.log("Looping toggled");
    }

    handleOnSkipToBeginning() {
        AudioPlayback.skipToTime(0);
        this.setState({
            lastMessage: "Skip to beginning"
        });
    }

    handleOnTempoUp() {
        if (AudioPlayback.playbackRate < 1.75){
            AudioPlayback.setPlaybackRate(AudioPlayback.playbackRate + 0.25);
            console.log("Tempo Up");
            this.setState({
                lastMessage: "Tempo increased"
            });
        } else {
            this.setState({
                lastMessage: "Tempo at maximum"
            });
        }
    }

    handleOnTempoDown() {
        if (AudioPlayback.playbackRate > 0.25){
            AudioPlayback.setPlaybackRate(AudioPlayback.playbackRate - 0.25);
            console.log("Tempo Down");
            this.setState({
                lastMessage: "Tempo decreased"
            });
        } else {
            this.setState({
                lastMessage: "Tempo at minimum"
            });
        }
    }

    handleOnUpdate() {
        var tempState = {
            isPlaying: AudioPlayback.isPlaying,
            shouldLoop: AudioPlayback.shouldLoop,
            playbackPosition: AudioPlayback.playbackPosition,
        }
        if (this.state.isScrubbing === false) {
            tempState.playbackTime = AudioPlayback.playbackTime;
        }

        this.setState(tempState);
    }

    handleStepBack() {
        AudioPlayback.skipToTime(AudioPlayback.playbackPosition - 5 * 1000);
    }

    handleStepForward() {
        AudioPlayback.skipToTime(AudioPlayback.playbackPosition + 5 * 1000);
    }

    handlePlaybackRate(rate) {
        AudioPlayback.setPlaybackRate(rate);
        this.closePopups();
    }
    handlePreferredHands(hand) {
        PredictionService.setPreferredHand(hand);
    }

    closePopups() {
        this.setState({ currentPopup: "" });
    }

    async scrub(value) {
        this.setState({ isScrubbing: false });
        if (this.state.currentPopup === "") {
            this.setState({ playbackPosition: value });
            this.setState({ playbackTime: AudioPlayback.millisToTime(AudioPlayback.percentToTime(value)) });

            await AudioPlayback.skipToTime(AudioPlayback.percentToTime(value));
        }
    }

    scrubChange(value) {
        this.setState({ isScrubbing: true });
        this.setState({ playbackTime: AudioPlayback.millisToTime(AudioPlayback.percentToTime(value)) });
    }

    renderMarkerPopup() {
        return (
            <View style={StyleService.session.popUpContainer}>
                <TouchableHighlight
                    style={StyleService.session.popUpTouchableTop}
                    onPress={() => { this.handleOnMarkerA(); this.closePopups() }}>
                    <View style={StyleService.session.popUpTouchableInnerContainer}>
                        <Text style={StyleService.session.popUpText}>Marker A</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={StyleService.session.popUpTouchableBottom}
                    onPress={() => { this.handleOnMarkerB(); this.closePopups() }}>
                    <View style={StyleService.session.popUpTouchableInnerContainer}>
                        <Text style={StyleService.session.popUpText}>Marker B</Text>
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
                    onPress={() => this.handlePlaybackRate(0.25)}>
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
                <TouchableHighlight style={StyleService.session.popUpTouchableTop}
                    onPress={() => this.handlePreferredHands("Right")}>
                    <View style={StyleService.session.popUpTouchableInnerContainer}>
                        <Text style={StyleService.session.popUpText}>Right Hand</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={StyleService.session.popUpTouchableBottom}
                    onPress={() => this.handlePreferredHands("Left")}>
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
                <View style={StyleService.session.markerContainer}>
                    <View style={{
                        width: percent,
                        alignItems: 'flex-end'
                    }}/>
                    <View>
                        <Text style={StyleService.session.markerText}>A</Text>
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
                <View style={StyleService.session.markerContainer}>
                    <View style={{
                        width: percent,
                        alignItems: 'flex-end'
                    }}/>
                    <View>
                        <Text style={StyleService.session.markerText}>B</Text>
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
                    style={StyleService.session.blurImageBackground}
                    blurRadius={7} />

                <View style={StyleService.session.topHalfContainer}>

                    <View>
                        <TouchableHighlight
                            underlayColor={"#29292977"}
                            onPress={() => { NavigationService.navigate("library") }}
                            style={StyleService.session.libraryButton}>
                            <View>
                                <Image source={require("../../assets/back.png")}
                                    style={{ height: "100%", aspectRatio: 1.36, resizeMode: 'cover'}} />
                            </View>
                        </TouchableHighlight>

                        <GestureFeedbackOverlay
                            message={this.state.lastMessage}/>
                    </View>

                    <View style={this.state.orientation === "verticle" ? StyleService.session.cameraContainerVerticle : StyleService.session.cameraContainerHorizontal}>
                        <GestureCamera
                            onTogglePlay={() => this.handleOnTogglePlay()}
                            onMarkerA={() => this.handleOnMarkerA()}
                            onMarkerB={() => this.handleOnMarkerB()}
                            onLoop={() => this.handleOnLoop()}
                            onSkipToBeginning={() => this.handleOnSkipToBeginning()}
                            onTempoUp={() => this.handleOnTempoUp()}
                            onTempoDown={() => this.handleOnTempoDown()}
                        />
                    </View>

                    <View style={this.state.orientation === "verticle" ? StyleService.session.cameraOutlineVerticle : StyleService.session.cameraOutlineHorizontal} />

                    <View style={StyleService.session.currentSongContainer}>
                        <Image source={AudioPlayback.audioFile.albumCover}
                            style={StyleService.session.currentSongImage} />
                        <Text numberOfLines={1}
                            style={StyleService.session.currentSongNameText}
                        >{AudioPlayback.audioFile.title}</Text>
                        <Text numberOfLines={1}
                            style={StyleService.session.currentSongArtistText}
                        >{AudioPlayback.audioFile.artist}</Text>

                        <View style={StyleService.session.currentSongSliderContainer}>
                            <View style={{}}>
                                <Slider
                                    value={AudioPlayback.totalTimeMillis === 0 ? 0 :
                                        this.state.playbackPosition / AudioPlayback.totalTimeMillis}
                                    minimumValue={0}
                                    maximumValue={1}
                                    onSlidingComplete={(value) => this.scrub(value)}
                                    onValueChange={(value) => this.scrubChange(value)}
                                />
                                {this.renderMarkerA()}
                                {this.renderMarkerB()}


                            </View>

                            <View style={StyleService.session.rowContainerMargin}>

                                <Text style={StyleService.session.mainText}>{this.state.playbackTime}</Text>


                                <View style={StyleService.session.footerPlayButtonContainer}>
                                    <TouchableHighlight
                                        underlayColor={StyleService.session.footerBarButton.onTouchColor}
                                        onPress={() => { this.handleStepBack() }}
                                        style={StyleService.session.footerPlayButton}>
                                        <View style={StyleService.session.footerPlayButtonImageContainer}>
                                            <Image source={require("../../assets/rewind.png")}
                                                style={StyleService.session.footerPlayStepBackImage} />
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        underlayColor={StyleService.session.footerBarButton.onTouchColor}
                                        onPress={() => { this.handleOnTogglePlay() }}
                                        style={StyleService.session.footerPlayButton}>
                                        <View style={StyleService.session.footerPlayButtonImageContainer}>
                                            <Image source={this.state.isPlaying === false ? this.playImage : this.pauseImage}
                                                style={StyleService.session.footerPlayButtonImage} />
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        underlayColor={StyleService.session.footerBarButton.onTouchColor}
                                        onPress={() => { this.handleStepForward() }}
                                        style={StyleService.session.footerPlayButton}>
                                        <View style={StyleService.session.footerPlayButtonImageContainer}>
                                            <Image source={require("../../assets/rewind.png")}
                                                style={StyleService.session.footerPlayStepForwardImage} />
                                        </View>
                                    </TouchableHighlight>
                                </View>


                                <View style={StyleService.session.endContainer}>
                                    <Text style={StyleService.session.mainText}>
                                        {AudioPlayback.millisToTime(AudioPlayback.totalTimeMillis)}
                                    </Text>
                                </View>
                            </View>


                        </View>
                    </View>

                </View>



                <View style={StyleService.session.footerContainer}>
                    <View style={StyleService.session.footerBar}>

                        <View style={StyleService.session.footerBarButton}>
                            <TouchableHighlight
                                underlayColor={StyleService.session.footerBarButton.onTouchColor}
                                onPress={() => {
                                    this.state.currentPopup === "hand" ?
                                        this.setState({ currentPopup: "" }) :
                                        this.setState({ currentPopup: "hand" })
                                }}
                                style={StyleService.session.footerBarButton}>
                                <View style={StyleService.session.footerBarButtonInsideContainer}>
                                    <Image source={require("../../assets/hand.png")}
                                        style={StyleService.session.footerBarButtonImage} />
 
                                    <Text
                                        numberOfLines={1}
                                        style={StyleService.session.footerBarButtonText}>Preferred Hand
                                    </Text>
                                </View>
                            </TouchableHighlight>


                            {this.state.currentPopup === "hand" ? this.renderHandPopup() : null}

                        </View>

                        <View style={StyleService.session.footerBarButton}>
                            <TouchableHighlight
                                underlayColor={StyleService.session.footerBarButton.onTouchColor}
                                onPress={() => {
                                    this.state.currentPopup === "tempo" ?
                                        this.setState({ currentPopup: "" }) :
                                        this.setState({ currentPopup: "tempo" })
                                }}
                                style={StyleService.session.footerBarButton}>
                                <View style={StyleService.session.footerBarButtonInsideContainer}>
                                    <Image source={require("../../assets/tempo.png")}
                                        style={StyleService.session.footerBarButtonImage} />
                                    <Text numberOfLines={1}
                                        style={StyleService.session.footerBarButtonText}>
                                        Tempo: {AudioPlayback.playbackRate * 100 + "%"}
                                    </Text>
                                </View>
                            </TouchableHighlight>

                            {this.state.currentPopup === "tempo" ? this.renderTempoPopup() : null}

                        </View>


                        <View style={StyleService.session.footerBarButton}>
                            <TouchableHighlight
                                underlayColor={StyleService.session.footerBarButton.onTouchColor}
                                onPress={() => {
                                    this.state.currentPopup === "marker" ?
                                        this.setState({ currentPopup: "" }) :
                                        this.setState({ currentPopup: "marker" })
                                }}
                                style={StyleService.session.footerBarButton}>
                                <View style={StyleService.session.footerBarButtonInsideContainer}>
                                    <Image source={require("../../assets/marker.png")}
                                        style={StyleService.session.footerBarButtonImage} />
                                    <Text numberOfLines={1}
                                        style={StyleService.session.footerBarButtonText}>Marker</Text>
                                </View>
                            </TouchableHighlight>

                            {this.state.currentPopup === "marker" ? this.renderMarkerPopup() : null}

                        </View>
                        <View style={StyleService.session.footerBarButton}>
                            <TouchableHighlight
                                underlayColor={StyleService.session.footerBarButton.onTouchColor}
                                style={StyleService.session.footerBarButton}>
                                <View style={StyleService.session.footerBarButtonInsideContainer}>
                                    <Switch
                                        value={this.state.shouldLoop}
                                        onValueChange={(value) => { this.handleOnLoop() }}/>
                                    <Text numberOfLines={1}
                                        style={StyleService.session.footerBarButtonText}>Loop</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        
                    </View>
                </View>

            </View>
        );
    }
}