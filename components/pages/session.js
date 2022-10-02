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
                
                <View style={StyleService.session.topHalfContainer}>
                    <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => { }} style={StyleService.session.homeButton}>
                        <View style={StyleService.session.rowContainer}>
                            <Text numberOfLines={1} style={StyleService.fileSelect.fileSelctionLeftMenuText}> -- Back</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={{
                        position: 'absolute',
                        zIndex: 10,
                        width: this.getMaxDimension() * 0.2,
                        top: 30,
                        aspectRatio: 1.33,
                        borderColor: Colors.dark.mid,
                        borderWidth: 8,
                        borderRadius: 22,
                    }}>
                        <GestureCamera
                            onPlay={this.handleOnPlay}
                            onPause={this.handleOnPause} />
                    </View>

                    <View style={{
                        position: 'absolute',
                        zIndex: 20,
                        width: this.getMaxDimension() * 0.2,
                        top: 30,
                        aspectRatio: 1.33,
                        borderColor: Colors.dark.mid,
                        borderWidth: 8,
                        borderRadius: 22
                    }} />

                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Image source={require("../../assets/default-album.png")} style={{ height: this.getMinDimension()*0.40, resizeMode: "contain", aspectRatio: 1, alignSelf: 'center' }} />
                        <Text numberOfLines={1} style={{ alignSelf: 'center', marginTop: "1%", fontSize: 17}}>{ AudioPlayback.audioFile.filename === "" ? "No Song Selected" :  AudioPlayback.audioFile.filename }</Text>
                        <View style={{ marginTop:"2%" }}>
                            <Slider value={0} minimumValue={0} maximumValue={1} thumbImage={null} />
                            <View style={{ flexDirection: 'row', marginHorizontal: "2%" }}>
                                <Text>{AudioPlayback.playbackTime}</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text>3:32</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                

                <View style={{ flex: 0.25, alignItems:'center', maxHeight:this.getMinDimension()*0.25}}>
                    <View style={{ flex: 1, position: "absolute", zIndex: 10, height:"100%"}}>
                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => { this.handleOnPlay() }} style={{
                            backgroundColor: "#84A07C", justifyContent: "center", alignItems: "center", height: this.getMinDimension()*0.18, borderRadius: 100, 
                            bottom: this.getMinDimension() * 0.09, alignSelf: 'center', alignContent: "center", aspectRatio: 1
                        }}>
                            <View style={{ flex:1, flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require("../../assets/play.png")} style={{width:"30%", aspectRatio:1, alignSelf:'center'}}/>
                                
                            </View>
                        </TouchableHighlight>
                    </View>
                    
                    <View style={{ width:"100%", flex: 1, backgroundColor: "#C2CDBC", borderTopLeftRadius: 20, borderTopRightRadius: 20, flexDirection:'row'}}>
                        
                        <View style={{ flex: 1, flexDirection: 'row', alignContent: 'space-around', alignItems: 'center', justifyContent: 'space-evenly', }}>
                            
                            <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => {this.handleOnPlay() }} style={{ margin: 10, borderRadius:10, height:"100%", justifyContent:'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require("../../assets/music-note.png")} style={{width: 15, height: 15, marginRight:3}}/>
                                    <Text numberOfLines={1} style={{ fontWeight: "bold", color: "#3E3E3E" }}>Sheet Music</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => { }} style={{ padding: "1%" }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text numberOfLines={1} style={{ fontWeight: "bold", color: "#3E3E3E" }}>Rewind</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', alignContent: 'space-around', alignItems: 'center', justifyContent: 'space-evenly', }}>
                            <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => { }} style={{ padding: "1%" }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text numberOfLines={1} style={{ fontWeight: "bold", color: "#3E3E3E" }}>Temp: 100%</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => { NavigationService.navigate("library")}} style={{ padding: "1%" }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text numberOfLines={1} style={{ fontWeight: "bold", color: "#3E3E3E" }}>Marker</Text>
                                </View>
                            </TouchableHighlight>
                        </View> 
                    </View>
                </View>

            </View>
        );
    }
}