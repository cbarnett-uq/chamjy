import React from 'react';
import { View } from 'react-native';
import { NavigationComponent } from './navigationComponent';
import { StyleService } from '../services/StyleService.js';

/**
 * Component that defines the shared layout between all screens. Implement
 * navigation menus here.
 */
export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Renders the layout.
     */
    render() {
        return (
            <NavigationComponent style={StyleService.style.container}/>
        )
    }
}