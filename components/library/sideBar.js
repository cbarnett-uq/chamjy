import React from "react";
import { Image, ScrollView, View, Text } from "react-native";
import { Colors, StyleService } from "../../services/StyleService";
import { HorizontalDivider } from "../shared/horizontalDivider";
import { Logo } from "../shared/logo";
import { SideBarMenuItem } from "./sideBarMenuItem";

/**
 * Side bar navigation menu for the library.
 */
export class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: true,
            selectionIndex: 0
        };
    }

    /**
     * When component is mounted set the state based off props.
     */
    componentDidMount() {
        this._setStateFromProps();
    }

    /**
     * Updates the component properties and forces rerender.
     * @param {object} prevProps Previous properties
     */
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this._setStateFromProps();
        }
    }

    /**
     * Sets the component state to match the props passed into the component.
     */
    _setStateFromProps() {
        let index = this.state.selectionIndex;
        let expand = this.state.isExpanded;

        if (typeof this.props.selectionIndex !== 'undefined') {
            index = this.props.selectionIndex;
        }

        if (typeof this.props.isExpanded !== 'undefined') {
            expand = this.props.isExpanded;
        }

        this.setState({
            isExpanded: expand,
            selectionIndex: index
        });
    }

    /**
     * Toggles the side bar collapsed / expanded state.
     */
    toggleSideBarCollapse() {
        let expand = this.state.isExpanded;
        if (expand) expand = false;
        else expand = true;

        this.setState( { isExpanded: expand } );

        if (typeof this.props.onCollapseExpand !== 'undefined') {
            this.props.onCollapseExpand(expand);
        }
    }

    /**
     * Changes the currently selected menu item.
     * @param {int} index Index of selected menu item.
     */
    setSelectionIndex(index) {
        this.setState( { selectionIndex: index } );

        if (typeof this.props.onSelectionChange !== 'undefined') {
            this.props.onSelectionChange(index);
        }
    }

    /**
     * Renders the side bar component.
     */
    render() {
        return (
            <View style={this.state.isExpanded ? 
                    StyleService.library.sideBarExpanded :
                    StyleService.library.sideBarCollapsed}>
                <ScrollView>
                    <View style={StyleService.library.sideBarMenu}>
                        <Logo/>

                        <Text style={StyleService.library.sideBarMenuCategoryLabel}>
                            MENU
                        </Text>

                        <SideBarMenuItem
                            onPress={
                                () => {
                                    this.setSelectionIndex(0);
                                }}
                            icon={require("../../assets/home.png")}
                            label={"Home"}
                            showLabel={this.state.isExpanded}/>

                        <SideBarMenuItem
                            onPress={
                                () => {
                                    this.setSelectionIndex(1);
                                }}
                            icon={require("../../assets/search.png")}
                            label={"Search"}
                            showLabel={this.state.isExpanded}/>

                        <View style={{marginTop: 15}}/>
                        <HorizontalDivider color={Colors.dark.contrast}/>

                        <Text style={StyleService.library.sideBarMenuCategoryLabel}>
                            LIBRARY
                        </Text>

                        <SideBarMenuItem
                            onPress={
                                () => {
                                    this.setSelectionIndex(2);
                                }}
                            icon={require("../../assets/heart.png")}
                            label={"Favourites"}
                            showLabel={this.state.isExpanded}/>

                        <View style={{marginTop: 15}}/>
                        <HorizontalDivider color={Colors.dark.contrast}/>

                        <Text style={StyleService.library.sideBarMenuCategoryLabel}>
                            GENERAL
                        </Text>

                        <SideBarMenuItem
                            onPress={
                                () => {
                                    this.props.onUpload();
                                }
                            }
                            icon={require("../../assets/upload.png")}
                            label={"Add to library"}
                            showLabel={this.state.isExpanded}/>

                        <SideBarMenuItem
                            onPress={
                                () => {
                                    this.toggleSideBarCollapse();
                                }}
                            icon={require("../../assets/expand-nav.png")}
                            showLabel={false}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}