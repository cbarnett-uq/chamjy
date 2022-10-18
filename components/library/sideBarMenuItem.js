import React from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import { StyleService } from "../../services/StyleService";

/**
 * A menu item on the sidebar navigation bar.
 */
export class SideBarMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.showLabel) {
            return (
                <TouchableHighlight
                    onPress={this.props.onPress}
                    style={StyleService.library.sideBarMenuItem}>
                    <View style={StyleService.layout.rowFlexContainer}>
                        <Image
                            source={this.props.icon}
                            style={StyleService.library.sideBarMenuItemIcon}/>
                        <Text
                            numberOfLines={1}
                            style={StyleService.library.sideBarMenuItemLabel}>
                            {this.props.label}
                        </Text>
                    </View>
                </TouchableHighlight>
            );
        } else {
            return (
                <TouchableHighlight
                    onPress={this.props.onPress}
                    style={StyleService.library.sideBarMenuItem}>
                    <View style={StyleService.layout.rowFlexContainer}>
                        <Image
                            source={this.props.icon}
                            style={StyleService.library.sideBarMenuItemIcon}/>
                    </View>
                </TouchableHighlight>
            );
        }
    }
}