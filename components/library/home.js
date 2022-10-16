import React from "react";
import { Text, ScrollView } from "react-native";
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
            let sortedItems = this.props.items.sort((x, y) => {
                if (x.name < y.name) return 1;
                if (x.name > y.name) return -1;
                return 0;
            });

            this.setState({
                items: sortedItems
            });
        }
    }

    render() {
        console.log(this.state.items.length);
        return (
            <ScrollView>
                {
                    this.state.items.map((x) => {
                        return (
                            <SongEntry
                                asset={x}
                                onTouch={(uri) => {
                                    this.props.onTrackSelect?.(uri);
                                }}/>
                        );
                    })
                }
            </ScrollView>
        );
    }
}