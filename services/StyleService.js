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
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
        },
        contrastText: {
            color: '#fff'
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
        }
    });
    
    /**
     * Returns the main layout style sheet for the app.
     */
    getMainStyle() {
        return StyleService.style;
    }
}