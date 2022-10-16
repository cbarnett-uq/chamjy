import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";
import FileSystemService from "../../services/fileSystemService";
import { Colors, StyleService } from "../../services/StyleService";
import { Home } from "../library/home";
import { SideBar } from "../library/sideBar";

export default class Library extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false,
            selectionIndex: 0,
            libraryAssets: []
        }
    }

    /**
     * When component is mounted, check for permissions and request
     * them if necessary. Perform initiation.
     */
     async componentDidMount() {
        await this.getLibrary();
    }

    /**
     * Loads the library.
     */
    async getLibrary() {
        let media = await FileSystemService.getAssets();
        this.setState({ libraryAssets: media });
    }

    /**
     * Triggered when the sidebar is expanded or collapsed.
     * @param {bool} expand Expanded state.
     */
    handleSideBarCollapseExpand(expand) {
        this.setState({ isExpanded: expand });
    }

    /**
     * Triggered when the selected menu item on the sidebar is changed.
     * @param {int} index Index of the selected menu item.
     */
    handleSelectionChanged(index) {
        console.log(`TEST ${index}`);
        this.setState({ selectionIndex: index });
    }

    _getComponentForSelection() {
        switch (this.state.selectionIndex) {
            case 0:
                return (
                    <Home items={this.state.libraryAssets}/>
                );

            case 1:
                return (
                    <View style={{ flex: 2, elevation: 1, backgroundColor: "#f00" }}/>
                );

            case 2:
                return (
                    <View style={{ flex: 2, elevation: 1, backgroundColor: "#0f0" }}/>
                );

            default:
                return (
                    <View style={{ flex: 2, elevation: 1, backgroundColor: "#000" }}/>
                );
        }
    }

    render() {
        return (
            <View style={StyleService.layout.outerContainer}>
                <LinearGradient
                        colors={[
                            Colors.dark.light,
                            Colors.dark.dark
                        ]}
                        start={{
                            x: -0.5,
                            y: 2.0
                        }}
                        end={{
                            x: 0.5,
                            y: 0.1
                        }}
                        style={StyleService.library.background}/>

                <View style={StyleService.layout.rowFlexContainer}>
                    <SideBar
                        isExpanded={this.state.isExpanded}
                        onCollapseExpand={(e) => {
                            this.handleSideBarCollapseExpand(e);
                        }}
                        selectionIndex={this.state.selectionIndex}
                        onSelectionChange={(e) => {
                            this.handleSelectionChanged(e);
                        }}/>
                    <View style={StyleService.library.contentContainer}>
                        {this._getComponentForSelection()}
                    </View>
                </View>
            </View>
            
        );
    }
}