import React from "react";
import { TouchableHighlight, Dimensions } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Colors, StyleService } from "../../services/StyleService";
import { View } from "react-native";

/**
 * Base class for the track select buttons.
 */
export class TrackSelect extends React.Component {
    /**
     * Constructor for the track select button component.
     * @param { Object } props Component properties
     * @param { String } icon  Name of AntDesign icon
     */
    constructor(props, icon) {
        super(props);

        if ('onPress' in props) {
            this.state = {
                icon: icon,
                onPress: props.onPress
            };
        } else {
            this.state = {
                icon: icon,
                onPress: () => { ; }
            };
        }
    }

    /**
     * Renders this component.
     */
    render() {
        const windowWidth = Dimensions.get("window")
            .width;
        const iconScale = windowWidth / 15;

        return (
            <View style={StyleService.playback.selectTrackContainer}>
                <TouchableHighlight
                    style={StyleService.playback.centerInFlexContainer}
                    onPress={this.state.onPress}>
                    <AntDesign
                        name={this.state.icon}
                        size={iconScale}
                        color={Colors.dark.mid}/>
                </TouchableHighlight>
            </View>
        );
    }
}

/**
 * The select next component.
 */
export class TrackSelectNext extends TrackSelect {
    /**
     * Icon button in flex box container to select next track.
     * @param { Object } props Component properties
     */
    constructor(props) {
        super(props, "forward");
    }
}

/**
 * The select previous component.
 */
export class TrackSelectPrevious extends TrackSelect {
    /**
     * Icon button in flex box container to select previous track.
     * @param { Object } props Component properties 
     */
    constructor(props) {
        super(props, "banckward"); // Not a typo
    }
}