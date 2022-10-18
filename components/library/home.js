import React from "react";
import { View, Text, ScrollView } from "react-native";
import { StyleService } from "../../services/StyleService";
import { SongEntry } from "./songEntry";

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            let sortedItems = this.props.items.sort((x, y) => x.name.localeCompare(y.name));

            this.setState({
                items: sortedItems
            });
        }
    }

    render() {
        return (
            <ScrollView style={{
                marginLeft: 30,
                marginTop: 50
            }}>
                <View>
                    <Text style={StyleService.library.libraryCategoryLabel}>
                        2022
                    </Text>
                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap"
                    }}>
                        {
                            this.state.items.map((x, index) => {
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