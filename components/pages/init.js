import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AudioPlayback from '../../services/AudioPlayback';
import NavigationService from '../../services/navigationService';
import FileSystemService from '../../services/fileSystemService';
import DimensionService from "../../services/DimensionService.js"
import { Colors, StyleService } from '../../services/StyleService';
import { Logo } from '../shared/logo';

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
        DimensionService.initEventListener();

        if (!await StyleService.ready()) {
            this.setState({
                isFailed: true,
                error: "Stye system failed to load."
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
                <Logo/>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator
                        size="large"
                        color={Colors.primary.mid}/>
                </View>
            </View>
        );
    }
}