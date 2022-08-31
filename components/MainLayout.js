import { SafeAreaView } from 'react-native';
import React from 'react';
import StyleService from "../services/StyleService.js";

/**
 * Component that renders the main layout of the app.
 */
export default class MainLayout extends React.Component {
    /**
     * Component that renders the main layout of the app.
     * @param {Object} props    Props for component, should contain children 
     */
    constructor(props) {
        super(props);
        this.style = (new StyleService()).getMainStyle();
    }
    
    /**
     * Renders the layout.
     */
    render() {
        return (
            <SafeAreaView style={this.style.container}>
                {this.props.children}
            </SafeAreaView>
        );
    }
}