import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NavigationService from '../../services/navigationService';

export default class TestPage extends React.Component {
    constructor(props) {
        super(props);
    }

    onTouch() {
        NavigationService.navigate("session");
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.onTouch}>
                    <Text>
                        Click here
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}