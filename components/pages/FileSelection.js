import { View, Text, Button, TextInput, Image, ScrollView, Dimensions, TouchableHighlight, FlatList } from 'react-native';
import React from "react";
import * as DocumentPicker from "expo-document-picker";
import * as MediaLibrary from 'expo-media-library';
import { StyleService } from '../../services/StyleService';
import AudioPlayback from "../../services/AudioPlayback"
import MusicButton from "../FileSelection/MusicButton"
import LeftNavBar from "../FileSelection/LeftNavBar.js"

export default class FileSelection extends React.Component {
    
    constructor(props) {
        super(props)

        this.rightLayouts = {
            "Library": () => {
                return this.LibraryLayout()
            },

            "Favourites": () => {
                return this.FavouritesLayout()
            },
            "Played": () => {
                return this.PlayedLayout()
            },
            "Added": () => {
                return this.AddedLayout();
            },
            "Search": () => {
                return this.SearchLayout();
            }
        }

        this.state = {
            fileURI: "",
            rightView: "Library",
            libraryAssets: [],
            recentlyPlayedAssets: [],
            recentlyAddedAssets: [],
            favouriteAssets: [],
            searchAssets: [],
        }
        
        this.getLibrary = async () => {
            await FileSelection.getPermissions();

            let media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
            this.setState({ libraryAssets: media.assets });
        };

        this.manualSelection = async () => {
            let result = await DocumentPicker.getDocumentAsync({ mediaType: "audio" });
            if (result.type !== "cancel") {
                this.onMusicSelect(result.uri)
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
            await AudioPlayback.loadAudio(uri)
            await AudioPlayback.play()
        }

        this.changeRightView = (newView) => {
            this.setState({ rightView: newView });
        }

        this.getLibrary();

        this.onSearchUpdate = async (text) => {
            this.changeRightView("Search")
            var letText = String(text.toLowerCase());
            const newList = []

            if (letText !== "" && letText !== undefined) {
                for (var i = 0; i < this.state.libraryAssets.length; i++) {
                    if (this.state.libraryAssets[i].filename.toLowerCase().includes(letText)) {
                        newList.push(this.state.libraryAssets[i])
                    }
                }
            }
            this.setState({ searchAssets: newList })
        }
    }

    static async getPermissions() {
        const permission = await MediaLibrary.getPermissionsAsync();
        if (!permission.granted && permission.canAskAgain) {
            const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
        }
    }

    LibraryLayout() {
        return (
            <ScrollView>
                <View style={{ marginLeft: "5%", marginTop: "7%" }}>
                    <Text numberOfLines={1} style={StyleService.fileSelect.fileSelectionRightHeader}>Browse</Text>
                    <ScrollView style={StyleService.fileSelect.fileSelectionRightScrollView} horizontal={true}>
                        <TouchableHighlight onPress={this.manualSelection} style={StyleService.fileSelect.musicButtonTouchable}>
                            <View style={{ alignItems: "center" }}>
                                <Image source={require("../../assets/upload.png")} style={StyleService.fileSelect.musicButtonImage} />
                            </View>
                        </TouchableHighlight>
                    </ScrollView>
                </View>

                <View style={{ marginLeft: "5%", marginTop: "5%" }}>
                    <Text numberOfLines={1} overflow="scroll" style={StyleService.fileSelect.fileSelectionRightHeader}>Library</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {this.state.libraryAssets.map((item, index) => {
                            return <MusicButton key={item.filename + index} musicAsset={item} onPress={this.onMusicSelect} />
                        })}

                    </View>
                </View>
            </ScrollView>
        )
    }

    FavouritesLayout() {
        return (
            <ScrollView>
                <View style={{ marginLeft: "5%", marginTop: "7%" }}>
                    <Text numberOfLines={1} style={StyleService.fileSelect.fileSelectionRightHeader}>FAVOURITES</Text>
                    <View style={{ flexDirection: 'row', flexWrap:'wrap'}}>
                        {this.state.libraryAssets.map((item, index) => {
                            return <MusicButton key={item.filename + index} musicAsset={item} onPress={this.onMusicSelect} />
                        })}
                    </View>
                </View>
            </ScrollView>
        )
    }

    PlayedLayout() {
        return (
            <ScrollView>
                <View style={{ marginLeft: "5%", marginTop: "7%" }}>
                    <Text numberOfLines={1} style={StyleService.fileSelect.fileSelectionRightHeader}>RECENTLY PLAYED</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {this.state.recentlyPlayedAssets.map((item, index) => {
                            return <MusicButton key={item.filename + index} musicAsset={item} onPress={this.onMusicSelect} />
                        })}
                    </View>
                </View>
            </ScrollView>
        )
    }

    AddedLayout() {
        return (
            <ScrollView>
                <View style={{ marginLeft: "5%", marginTop: "7%" }}>
                    <Text numberOfLines={1} style={StyleService.fileSelect.fileSelectionRightHeader}>RECENTLY ADDED</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {this.state.recentlyAddedAssets.map((item, index) => {
                            return <MusicButton key={item.filename + index} musicAsset={item} onPress={this.onMusicSelect} />
                        })}
                    </View>
                </View>
            </ScrollView>
        )
    }

    SearchLayout() {
        return (
            <ScrollView>
                <View style={{ marginLeft: "5%", marginTop: "7%" }}>
                    <Text numberOfLines={1} style={StyleService.fileSelect.fileSelectionRightHeader}>SEARCH</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {this.state.searchAssets.map((item, index) => {
                            return <MusicButton key={ item.filename + index } musicAsset={item} onPress={this.onMusicSelect} />
                        })}
                    </View>
                </View>
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={StyleService.layout.outerContainer }>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <LeftNavBar changeRightView={this.changeRightView} searchUpdate={ this.onSearchUpdate }></LeftNavBar>

                    <View style={{ flex: 2, elevation: 1, backgroundColor: "#fff" }}>
                        {this.rightLayouts[this.state.rightView]()}
                    </View>
                </View>
            </View>

        );
    }
}