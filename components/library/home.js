import React from "react";
import { View, Text, ScrollView } from "react-native";
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
        console.log(this.state.items.length);
        return (
            <ScrollView>
                <View style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginLeft: 30,
                    marginTOp: 50
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
            </ScrollView>
        );
    }
}