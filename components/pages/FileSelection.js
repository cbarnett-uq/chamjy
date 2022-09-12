import { View, Text, Button, TextInput, Image, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import React from "react";
import * as DocumentPicker from "expo-document-picker";
import * as MediaLibrary from 'expo-media-library';
import { StyleService } from '../../services/StyleService';
import AudioPlayback from "../../services/AudioPlayback"
import MusicButton from "./MusicButton.js"
1
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
                return (
                    <View></View>
                )
            },
        }

        this.leftLayouts = {
            "Expand": () => {
                return this.ExpandedLeftNav()
            },

            "Shrink": () => {
                return this.ShrunkLeftView()
            }
        }

        this.sideWidth = 250

        this.state = {
            fileURI: "",
            sideWidth: this.sideWidth,
            rightView: "Library",
            leftNavExpand: "Expand",
            libraryAssets: [],
            recentlyPlayedAssets: [],
            recentlyAddedAssets: [],
            favouriteAssets: [],
        }
        
        this.getLibrary = async () => {
            await FileSelection.getPermissions();

            let media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
            this.setState({ libraryAssets: media.assets });
            this.state.recentlyAddedAssets.push(this.state.libraryAssets[0]);
            this.setState({recentlyAddedAssets: this.state.recentlyAddedAssets});
        };

        this.manualSelection = async () => {
            let result = await DocumentPicker.getDocumentAsync({ mediaType: "audio" });
            console.log(result)
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

        this.changeLeftNav = (newView) => {
            if (newView === "toggle") {
                if (this.state.leftNavExpand === "Expand") {
                    this.setState({ leftNavExpand: "Shrink" })
                } else {
                    this.setState({ leftNavExpand: "Expand" })
                }
            } else {
                this.setState({ leftNavExpand: newView })
            }
        }

        this.getLibrary();
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
                    <Text numberOfLines={1} style={StyleService.fileSelect.fileSelectionRightHeader}>LIBRARY</Text>
                    <ScrollView style={StyleService.fileSelect.fileSelectionRightScrollView} horizontal={true}>
                        <TouchableHighlight onPress={this.manualSelection} style={StyleService.fileSelect.musicButtonTouchable}>
                            <View style={{ alignItems: "center" }}>
                                <Image source={require("../../assets/upload.png")} style={StyleService.fileSelect.musicButtonImage} />
                                <Text style={StyleService.fileSelect.musicButtonText}>Browse</Text>
                            </View>
                        </TouchableHighlight>

                        {this.state.libraryAssets.map((item, index) => {
                            return <MusicButton musicAsset={item} onPress={this.onMusicSelect} />
                        })}

                    </ScrollView>
                </View>

                <View style={{ marginLeft: "5%", marginTop: "5%" }}>
                    <Text numberOfLines={1} overflow="scroll" style={StyleService.fileSelect.fileSelectionRightHeader}>RECENTLY ADDED</Text>
                    <ScrollView style={StyleService.fileSelect.fileSelectionRightScrollView} horizontal={true}>
                        {this.state.recentlyAddedAssets.map((item, index) => {
                            return <MusicButton musicAsset={item} onPress={this.onMusicSelect} />
                        })}

                    </ScrollView>
                </View>

                <View style={{ marginLeft: "5%", marginTop: "5%" }}>
                    <Text numberOfLines={1} overflow="scroll" style={StyleService.fileSelect.fileSelectionRightHeader}>RECENTLY PLAYED</Text>
                    <ScrollView style={StyleService.fileSelect.fileSelectionRightScrollView} horizontal={true}>
                        {this.state.recentlyPlayedAssets.map((item, index) => {
                            return <MusicButton key={index} musicAsset={item} onPress={this.onMusicSelect} />
                        })}

                    </ScrollView>
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
                            return <MusicButton musicAsset={item} onPress={this.onMusicSelect} />
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
                        {this.state.libraryAssets.map((item, index) => {
                            return <MusicButton musicAsset={item} onPress={this.onMusicSelect} />
                        })}
                    </View>
                </View>
            </ScrollView>
        )
    }

    ExpandedLeftNav() {
        return (
            <View style={{
                flexDirecton: 'row',
                backgroundColor: '#ccc',
                flexBasis: this.state.sideWidth
            }}>
                <ScrollView>
                    <View style={{
                        marginTop: 30,
                        marginLeft: 15,
                        marginRight: 15,
                    }}>
                        
                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => { }} style={StyleService.fileSelect.fileSelctionLeftMenuTouchable}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require("../../assets/home.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImage}></Image>
                                <Text numberOfLines={ 1 } style={StyleService.fileSelect.fileSelctionLeftMenuText}>Home</Text>
                            </View>
                        </TouchableHighlight>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                            <Image source={require("../../assets/search.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImage}></Image>
                            <TextInput placeholder="" style={StyleService.fileSelect.searchBar} />
                        </View>

                        <View
                            style={{
                                borderBottomColor: '#777',
                                borderBottomWidth: 1,
                                marginTop: 30,
                                marginBottom: 20,
                            }}
                        />

                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => { this.changeRightView("Library") }} style={StyleService.fileSelect.fileSelctionLeftMenuTouchable}>
                            <View style={StyleService.fileSelect.fileSelctionLeftMenuItemView}>
                                <Image source={require("../../assets/library.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImage}></Image>
                                <Text numberOfLines={1} style={StyleService.fileSelect.fileSelctionLeftMenuText}>Library</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => { this.changeRightView("Favourites") }} style={StyleService.fileSelect.fileSelctionLeftMenuTouchable}>
                            <View style={StyleService.fileSelect.fileSelctionLeftMenuItemView}>
                                <Image source={require("../../assets/heart.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImage}></Image>
                                <Text numberOfLines={1} style={StyleService.fileSelect.fileSelctionLeftMenuText}>Favourites</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => { this.changeRightView("Played") }} style={StyleService.fileSelect.fileSelctionLeftMenuTouchable}>
                            <View style={StyleService.fileSelect.fileSelctionLeftMenuItemView}>
                                <Image source={require("../../assets/recently-played.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImage}></Image>
                                <Text numberOfLines={1} style={StyleService.fileSelect.fileSelctionLeftMenuText}>Recently Played</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => { this.changeRightView("Added") }} style={StyleService.fileSelect.fileSelctionLeftMenuTouchable}>
                            <View style={StyleService.fileSelect.fileSelctionLeftMenuItemView}>
                                <Image source={require("../../assets/recently-added.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImage}></Image>
                                <Text numberOfLines={1} style={StyleService.fileSelect.fileSelctionLeftMenuText}>Recently Added</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => { this.changeLeftNav("toggle") }} style={StyleService.fileSelect.fileSelctionLeftMenuTouchable}>
                            <View style={StyleService.fileSelect.fileSelctionLeftMenuItemView}>
                                <Image source={require("../../assets/expand-nav.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImage}></Image>
                                <Text numberOfLines={1} style={StyleService.fileSelect.fileSelctionLeftMenuText}>Hide</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        )
    }

    ShrunkLeftView() {
        return (
            <View style={{
                flexDirecton: 'row',
                backgroundColor: '#ccc',
            }}>
                <ScrollView>
                    <View style={{
                        marginTop: 30,
                        marginLeft: 19,
                        marginRight: 15,
                    }}>
                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchableShrunk.underlayColor} onPress={() => { }} style={{ padding:5, marginTop:10 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require("../../assets/home.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImageShrunk}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchableShrunk.underlayColor} onPress={() => { this.changeLeftNav("Expand") }} style={{ padding: 5, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 3}}>
                                <Image source={require("../../assets/search.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImageShrunk}/>
                            </View>
                        </TouchableHighlight>
                        <View
                            style={{
                                borderBottomColor: '#777',
                                borderBottomWidth: 1,
                                marginTop: 30,
                                marginBottom: 20,
                            }}
                        />
                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchableShrunk.underlayColor} onPress={() => { this.changeRightView("Library") }} style={StyleService.fileSelect.fileSelctionLeftMenuTouchableShrunk}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require("../../assets/library.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImageShrunk} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchableShrunk.underlayColor} onPress={() => { this.changeRightView("Favourites") }} style={StyleService.fileSelect.fileSelctionLeftMenuTouchableShrunk}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require("../../assets/heart.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImageShrunk} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchableShrunk.underlayColor} onPress={() => { this.changeRightView("Played") }} style={StyleService.fileSelect.fileSelctionLeftMenuTouchableShrunk}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require("../../assets/recently-played.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImageShrunk} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchableShrunk.underlayColor} onPress={() => { this.changeRightView("Added") }} style={StyleService.fileSelect.fileSelctionLeftMenuTouchableShrunk}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require("../../assets/recently-added.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImageShrunk}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchableShrunk.underlayColor} onPress={() => { this.changeLeftNav("toggle") }} style={StyleService.fileSelect.fileSelctionLeftMenuTouchableShrunk}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require("../../assets/expand-nav.png")} style={ StyleService.fileSelect.fileSelctionLeftMenuImageShrunk }/>
                            </View>
                        </TouchableHighlight>
                     </View>
                </ScrollView>
            </View>
        )
    }

    render() {
        return (
            <View style={StyleService.style.container }>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {this.leftLayouts[this.state.leftNavExpand]()}

                    <View style={{ flex: 2, elevation: 1, backgroundColor: "#fff" }}>
                        {this.rightLayouts[this.state.rightView]()}
                    </View>
                </View>
            </View>

        );
    }
}