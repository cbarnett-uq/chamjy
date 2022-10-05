import React from 'react';
import { View, Text } from 'react-native';
import AudioPlayback from '../../services/AudioPlayback';
import NavigationService from '../../services/navigationService';
import FileSystemService from '../../services/fileSystemService';

/**
 * Component that initialises services for the app.
 */
export default class InitPage extends React.Component {
    /**
     * Instantiates the component.
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);

        this.state = {
            isFailed: false,
            error: ""
        };
    }

    /**
     * When component is mounted, try load all necessary services
     * here or set an appropriate error message.
     */
    async componentDidMount() {
        if (!await AudioPlayback.ready()) {
            this.setState({
                isFailed: true,
                error: "Audio playback failed to load."
            });
            return;
        }

        if (!await FileSystemService.ready()) {
            this.setState({
                isFailed: true,
                error: "File system failed to load."
            });
            return;
        }

        NavigationService.navigate("library");
    }

    /**
     * Renders the component.
     */
    render() {
        if (this.state.isFailed) {
            return (
                <View>
                    <Text>{this.state.error}</Text>
                </View>
            );
        }

        return (
            <View>
                <Text>Initialising...</Text>
            </View>
        );
    }
}