import NavigationService from "../services/navigationService.js";
import React from "react";
import { View, Text } from "react-native";

/**
 * A component for routing between different screens by listening to
 * events from the navigation service.
 */
export class NavigationComponent extends React.Component {
    /**
     * Creates the navigation component.
     * @param { Object } props Component properties
     */
    constructor(props) {
        super(props);

        if ("defineScreens" in props) {
            props.defineScreens();
        }

        NavigationService.registerListener(() => {
            this.forceUpdate();
        });
    }

    /**
     * Renders the component with the current component.
     */
    render() {
        const screen = NavigationService.getComponent();

        if (screen === undefined) {
            return (
                <View>
                    <Text>No screen.</Text>
                </View>
            );
        } else { 
            return React.createElement(View, null, screen);
        }
    }
}