import React from "react";
import { View, Text } from "react-native";
import { StyleService } from "../../services/StyleService";

export class GestureFeedbackOverlay extends React.Component {
    constructor(props) {
        super(props);

        this.timer = null;

        this.state = {
            isVisible: false,
            label: ''
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message
            || (this.props.message !== "" && this.state.isVisible === false)) {
            this.setState({
                isVisible: true,
                label: this.props.message
            });

            if (this.timer !== null) clearTimeout(this.timer);

            let that = this;
            this.timer = setTimeout(() => {
                that.setState({
                    isVisible: false
                });
                that.timer = null;
            }, 5000);
        } 
    }

    render() {
        if (this.state.isVisible) {
            return (
                <View style={StyleService.session.overlay}>
                    <View style={StyleService.session.overlayTextContainer}>
                        <Text style={StyleService.session.overlayText}>
                            {this.state.label}
                        </Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={StyleService.session.overlay}/>
            )
        }
    }
}