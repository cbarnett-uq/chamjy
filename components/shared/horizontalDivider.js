import React from "react";
import { View, Text } from "react-native";

/**
 * Component that renders a horizontal divider with optional label.
 */
export class HorizontalDivider extends React.Component {
    /**
     * Instantiates a horizontal divider.
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);

        this.state = {
            label: '',
            color: '#000000',
            height: 1
        };
    }

    /**
     * Sets the component state from props.
     */
    componentDidMount() {
        this._setStateFromProps();
    }

    /**
     * Updates the component state.
     * @param {object} prevProps Previous properties
     */
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) this._setStateFromProps();
    }

    /**
     * Updates the state from the current properties.
     */
    _setStateFromProps() {
        if (typeof(this.props.label) !== 'undefined') {
            this.setState({label: this.props.label});
        }

        if (typeof(this.props.color) !== 'undefined') {
            this.setState({color: this.props.color});
        }

        if (typeof(this.props.height) !== 'undefined') {
            this.setState({height: this.props.height});
        }
    }

    /**
     * Renders the horizontal divider.
     */
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 4,
                marginRight: 4
            }}>
                <View style={{
                    flex: 1,
                    height: this.state.height,
                    backgroundColor: this.state.color
                }}/>
                {() => {
                        if (this.state.label !== '') {
                        return (
                            <View>
                                <Text style={{
                                    marginLeft: 16,
                                    marginRight: 16,
                                    textAlign: 'center'
                                }}>
                                    {this.state.label}
                                </Text>
                            </View>
                        );
                    }
                }}
                <View style={{
                    flex: 1,
                    height: this.state.height,
                    backgroundColor: this.state.color
                }}/>
            </View>
        );
    }
}