import React from "react";
import { Text, ScrollView } from "react-native";

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                items: this.props.items
            });
        }
    }

    render() {
        return (
            <ScrollView>
                <Text>Home</Text>
                <Text>Your Favourite Artists</Text>
                <Text>Recently Played</Text>
            </ScrollView>
        );
    }
}