import React from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { StyleService } from "../../services/StyleService";
import { SongEntry } from "./songEntry";

export class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items,
            results: this.props.items
        };
    }

    _searchItems(filter) {
        let str = filter.toLowerCase();
        let results = this.state
            .items
            .filter((x) => x.name
                .toLowerCase()
                .includes(str));
        
        this.setState({
            results: results
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            let sortedItems = this.props.items.sort((x, y) => x.name.localeCompare(y.name));

            this.setState({
                items: sortedItems
            });

            this._searchItems();
        }
    }

    handleNewSearchString(filter) {
        this._searchItems(filter);
    }

    render() {
        return (
            <ScrollView style={{
                marginLeft: 30,
                marginTop: 50
            }}>
                <View>
                    <Text style={StyleService.library.libraryCategoryLabel}>
                        SEARCH
                    </Text>

                    <TextInput
                        autoFocus={true}
                        autoCorrect={true}
                        onChangeText={(x) => {
                            this.handleNewSearchString(x);
                        }}
                        style={StyleService.library.searchTextInput}/>

                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap"
                    }}>
                        {
                            this.state.results.map((x, index) => {
                                return (
                                    <SongEntry
                                        key={`SongEntry_Home_${index}`}
                                        asset={x}
                                        onTouch={(uri) => {
                                            this.props.onTrackSelect?.(uri);
                                        }}/>
                                );
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        );
    }
}