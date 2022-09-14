import { View, Text, TextInput, Image, ScrollView, TouchableHighlight } from 'react-native';
import React from "react";
import { StyleService } from '../../services/StyleService';

export default class FileSelection extends React.Component {
    constructor(props) {
        super(props);
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
            sideWidth: this.sideWidth,
            leftNavExpand: "Expand",
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

        this.changeRightView = props.changeRightView;
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
                                <Text numberOfLines={1} style={StyleService.fileSelect.fileSelctionLeftMenuText}>Home</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchable.underlayColor} onPress={() => {console.log("press") }} style={StyleService.fileSelect.fileSelctionLeftMenuTouchable}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                <Image source={require("../../assets/search.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImage}></Image>
                                <TextInput placeholder="" style={StyleService.fileSelect.searchBar} />
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
                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchableShrunk.underlayColor} onPress={() => { }} style={{ padding: 5, marginTop: 10 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require("../../assets/home.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImageShrunk} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchableShrunk.underlayColor} onPress={() => { this.changeLeftNav("Expand") }} style={{ padding: 5, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 3 }}>
                                <Image source={require("../../assets/search.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImageShrunk} />
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
                                <Image source={require("../../assets/recently-added.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImageShrunk} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={StyleService.fileSelect.fileSelctionLeftMenuTouchableShrunk.underlayColor} onPress={() => { this.changeLeftNav("toggle") }} style={StyleService.fileSelect.fileSelctionLeftMenuTouchableShrunk}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require("../../assets/expand-nav.png")} style={StyleService.fileSelect.fileSelctionLeftMenuImageShrunk} />
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        )
    }


    render() {
        return (
            <>{this.leftLayouts[this.state.leftNavExpand]()}</>            
        );
    }
}