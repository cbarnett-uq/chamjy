import { View, Text, Button, TextInput, Image, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import React from "react";
import * as DocumentPicker from "expo-document-picker";
import * as MediaLibrary from 'expo-media-library';
import StyleService from '../services/StyleService';
import AudioPlayback from "../services/AudioPlayback"
import MusicButton from "./MusicButton.js"

export default class FileSelection extends React.Component {
    constructor(props) {
        super(props)
        FileSelection.getPermissions();
        
        this.style = (new StyleService()).getMainStyle();
        this.sideWidth = 250

        this.state = {
            fileURI: "",
            sideWidth: this.sideWidth,
            libraryAssets: [],
            recentlyPlayedAssets: [],
            recentlyAddedAssets: [],
            favouriteAssets: [],
        }
        

        this.getLibrary = async () => {
            let media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
            this.setState({ libraryAssets: media.assets });
            this.state.recentlyAddedAssets.push(this.state.libraryAssets[0]);
            this.setState({recentlyAddedAssets: this.state.recentlyAddedAssets});
        };

        this.manualSelection = async () => {
            let result = await DocumentPicker.getDocumentAsync({ mediaType: "audio" });
            console.log(result)
            if (result.type !== "cancel") {
                await AudioPlayback.loadAudio(result.uri)
            }
        }

        this.toggleSide = async () => {
            if (this.state.sideWidth === this.sideWidth) {
                this.setState({ sideWidth: 0 })
            } else {
                this.setState({ sideWidth: this.sideWidth })
            }
        }

        this.onMusicSelect = async (uri) => {
            console.log(uri);
            await AudioPlayback.loadAudio(uri)
            await AudioPlayback.play()
        }

        this.getLibrary();
    }

    static async getPermissions() {
        const permission = await MediaLibrary.getPermissionsAsync();
        if (!permission.granted && permission.canAskAgain) {
            const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
            }}>

                <View style={{
                    flexDirecton: 'row',
                    backgroundColor: '#ccc',
                    flexBasis: this.state.sideWidth
                }}>
                    <ScrollView>
                        <View style={{
                            marginTop: "15%",
                            marginLeft: "5%",
                            marginRight: "5%",
                        }}>
                            <TouchableHighlight underlayColor={ this.style.fileSelctionLeftMenuTouchable.underlayColor } onPress={() => { }} style={this.style.fileSelctionLeftMenuTouchable}>
                                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                    <Image source={require("../assets/home.png")} style={this.style.fileSelctionLeftMenuImage}></Image>
                                    <Text style={this.style.fileSelctionLeftMenuText}>Home</Text>
                                </View>
                            </TouchableHighlight>
                            
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: "3%" }}>
                                <Image source={require("../assets/search.png")} style={this.style.fileSelctionLeftMenuImage}></Image>
                                <TextInput placeholder="" style={this.style.searchBar} />
                            </View>

                            <View
                                style={{
                                    borderBottomColor: '#777',
                                    borderBottomWidth: 1,
                                    marginTop: "20%",
                                }}
                            />

                            <TouchableHighlight underlayColor={this.style.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => { }} style={this.style.fileSelctionLeftMenuTouchable}>
                                <View style={this.style.fileSelctionLeftMenuItemView}>
                                    <Image source={require("../assets/home.png")} style={this.style.fileSelctionLeftMenuImage}></Image>
                                    <Text style={this.style.fileSelctionLeftMenuText}>Library</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor={this.style.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => { }} style={this.style.fileSelctionLeftMenuTouchable}>
                                <View style={this.style.fileSelctionLeftMenuItemView}>
                                    <Image source={require("../assets/home.png")} style={this.style.fileSelctionLeftMenuImage}></Image>
                                    <Text style={this.style.fileSelctionLeftMenuText}>Favourites</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor={this.style.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => { }} style={this.style.fileSelctionLeftMenuTouchable}>
                                <View style={this.style.fileSelctionLeftMenuItemView}>
                                    <Image source={require("../assets/home.png")} style={this.style.fileSelctionLeftMenuImage}></Image>
                                    <Text style={this.style.fileSelctionLeftMenuText}>Recently Played</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor={this.style.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => { }} style={this.style.fileSelctionLeftMenuTouchable}>
                                <View style={this.style.fileSelctionLeftMenuItemView}>
                                    <Image source={require("../assets/home.png")} style={this.style.fileSelctionLeftMenuImage}></Image>
                                    <Text style={this.style.fileSelctionLeftMenuText}>Recently Added</Text>
                                </View>
                            </TouchableHighlight>

                        </View>
                    </ScrollView>
                </View>




                <View style={{
                    flex: 2,
                    elevation: 1,
                    backgroundColor: "#fff"
                }}>
                    <ScrollView>
                        <View style={{ marginLeft: "5%", marginTop: "7%"}}>
                            <Text numberOfLines={1} style={this.style.fileSelectionRightHeader}>LIBRARY</Text>
                            <ScrollView style={this.style.fileSelectionRightScrollView} horizontal={true}>
                                <TouchableHighlight onPress={this.manualSelection} style={this.style.musicButtonTouchable}>
                                    <View style={{ alignItems: "center" }}>
                                        <Image source={require("../assets/upload.png")} style={this.style.musicButtonImage} />
                                        <Text style={this.style.musicButtonText}>Browse</Text>
                                    </View>
                                </TouchableHighlight>

                                {this.state.libraryAssets.map((item, index) => {
                                    return <MusicButton musicAsset={item} onPress={this.onMusicSelect}/>
                                })}

                            </ScrollView>
                        </View>

                        <View style={{ marginLeft: "5%", marginTop: "5%"}}>
                            <Text numberOfLines={1} overflow="scroll" style={this.style.fileSelectionRightHeader}>RECENTLY ADDED</Text>
                            <ScrollView style={this.style.fileSelectionRightScrollView} horizontal={true}>
                                {this.state.recentlyAddedAssets.map((item, index) => {
                                    return <MusicButton musicAsset={item} onPress={this.onMusicSelect}/>
                                })}

                            </ScrollView>
                        </View>

                        <View style={{ marginLeft: "5%", marginTop: "5%" }}>
                            <Text numberOfLines={1} overflow="scroll" style={this.style.fileSelectionRightHeader}>RECENTLY PLAYED</Text>
                            <ScrollView style={this.style.fileSelectionRightScrollView} horizontal={true}>
                                {this.state.recentlyPlayedAssets.map((item, index) => {
                                    return <MusicButton key={index} musicAsset={item} onPress={ this.onMusicSelect }/>
                                })}

                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}