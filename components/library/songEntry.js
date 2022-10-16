import React from "react";
import { ActivityIndicator, Image, Text, TouchableHighlight, View } from "react-native";
import { MusicInfo } from "../../services/expo-music-info/MusicInfo";
import { StyleService } from "../../services/StyleService";

export class SongEntry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            assetIsLoaded: false,
            albumCover: null,
            songTitle: '',
            artistName: '',
            asset: null
        };
    }

    async componentDidMount() {
        this.setState({
            assetIsLoaded: false
        });
        await this._setStateFromProps();
    }

    async _setStateFromProps() {
        if (typeof(this.props.asset) === 'undefined') {
            throw "Asset not defined for audio file.";
        }

        let uri = this.props.asset.uri;

        try {
            let metadata = await MusicInfo.getMusicInfoAsync(uri, {
                title: true,
                artist: true,
                picture: true
            });

            this.setState({
                assetIsLoaded: true,
                albumCover: metadata.picture,
                songTitle: metadata.title,
                artistName: metadata.artistName,
                asset: this.props.asset
            });
        } catch(e) {
            this.setState({
                assetIsLoaded: true,
                albumCover: null,
                songTitle: this.props.asset.name,
                artistName: "",
                asset: this.props.asset
            });
        }
    }

    render() {
        if (this.state.assetIsLoaded && this.state.albumCover !== null) {
            return (
                <TouchableHighlight
                    underlayColor={StyleService.fileSelect.musicButtonTouchable.underlayColor}
                    onPress={() => {
                        this.props.onTouch?.(this.state.asset);
                    }}
                    style={StyleService.fileSelect.musicButtonTouchable}>
                    <View style={{alignItems:"center"}}>
                        <Image
                            source={this.state.albumCover}
                            style={StyleService.fileSelect.musicButtonImage}/>
                        <Text
                            numberOfLines={StyleService.fileSelect.musicButtonText.numberOfLines}
                            style={StyleService.fileSelect.musicButtonText}>
                            {this.state.songTitle}
                        </Text>
                        <Text
                            numberOfLines={StyleService.fileSelect.musicButtonText.numberOfLines}
                            style={StyleService.fileSelect.musicButtonText}>
                            {this.state.artistName}
                        </Text>
                    </View>
                </TouchableHighlight>
            );
        } else if (this.state.assetIsLoaded) {
            return (
                <TouchableHighlight
                    underlayColor={StyleService.fileSelect.musicButtonTouchable.underlayColor}
                    onPress={() => {
                        this.props.onTouch?.(this.state.asset);
                    }}
                    style={StyleService.fileSelect.musicButtonTouchable}>
                    <View style={{alignItems:"center"}}>
                        <Image
                            source={require("../../assets/default-album.png")}
                            style={StyleService.fileSelect.musicButtonImage}/>
                        <Text
                            numberOfLines={StyleService.fileSelect.musicButtonText.numberOfLines}
                            style={StyleService.fileSelect.musicButtonText}>
                            {this.state.songTitle}
                        </Text>
                        <Text
                            numberOfLines={StyleService.fileSelect.musicButtonText.numberOfLines}
                            style={StyleService.fileSelect.musicButtonText}>
                            {this.state.artistName}
                        </Text>
                    </View>
                </TouchableHighlight>
            );
        } else {
            return (
                <TouchableHighlight
                    underlayColor={StyleService.fileSelect.musicButtonTouchable.underlayColor}
                    onPress={() => {
                        this.props.onTouch?.(this.state.asset);
                    }}
                    style={StyleService.fileSelect.musicButtonTouchable}>
                    <View style={{alignItems:"center"}}>
                        <ActivityIndicator />
                    </View>
                </TouchableHighlight>
            );
        }
    }
}