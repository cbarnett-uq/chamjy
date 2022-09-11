import { StyleSheet } from 'react-native';

/**
 * Service for accessing the stylesheet.
 */
export default class StyleService {
    // Static style to reduce rebuilding in memory everytime
    // this is referenced.
    static style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        contrastText: {
            color: '#000'
        },
        // Needs to be stretch with row, otherwise the camera will not
        // fill the parent container. 
        cameraContainer: {
            flex: 1,
            alignItems: 'stretch',
            flexDirection: 'row',
            width: "100%",
            height: "100%"
        },
        camera: {
            flex: 1,
            zIndex: 1,
        },
        musicButtonTouchable: {
            backgroundColor: "grey",
            marginRight: 10,
            marginTop: 10,
            padding: 8,
            borderRadius: 10,
            width: 115,
            height: 115,
            justifyContent: 'center',
            underlayColor: "#555",
        },
        musicButtonImage: {
            tintColor: "white",
            width: 40,
            height: 40,
        },
        musicButtonText: {
            width: "100%",
            color: "white",
            marginTop: 5,
            textAlign: 'center',
            numberOfLines: 2
        },
        fileSelctionLeftMenuText: {
            color: "#666",
        },
        fileSelctionLeftMenuItemView: {
            flexDirection: 'row',
            alignItems: 'center',

        },
        fileSelctionLeftMenuTouchable: {
            borderRadius: 5,
            backgroundColor: "#ccc",
            underlayColor: "#eee",
            paddingLeft: "3%",
            paddingTop: "7%",
            paddingBottom: "7%"
        },
        fileSelctionLeftMenuImage: {
            tintColor: "grey",
            marginRight: "5%",
            width: 24,
            height: 24,
        },
        searchBar: {
            borderBottomWidth: 1,
            borderBottomColor: "#777",
            padding: 1,
            flex: 1,
        },
        fileSelectionRightHeader: {
            fontSize: 20,
            color: "grey",
            fontWeight: "bold"
        },
        fileSelectionRightScrollView: {
            width: "100%",
            flexDirection: 'row',
        }
    });
    
    /**
     * Returns the main layout style sheet for the app.
     */
    getMainStyle() {
        return StyleService.style;
    }
}