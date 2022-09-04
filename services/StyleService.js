import { StyleSheet } from 'react-native';

/**
 * Defines the colour palette used by the app.
 */
export class Colors {
    /**
     * Primary colour tones
     */
    static primary = {
        'light': '#BDE0FE',
        'mid': '#BDE0FE',
        'dark': '#BDE0FE',
        'contrast': '#454545'
    };

    /**
     * Secondary colour tones
     */
    static secondary = {
        'light': '#C3CDBC',
        'mid': '#C3CDBC',
        'dark': '#C3CDBC',
        'contrast': '#454545'
    };

    /**
     * Tertiary colour tones
     */
    static tertiary = {
        'light': '#84A07C',
        'mid': '#84A07C',
        'dark': '#84A07C',
        'contrast': '#454545'
    };

    /**
     * Light shades
     */
    static light = {
        'light': '#FFFFFF',
        'mid': '#DEDEDE',
        'dark': '#CCCCCC',
        'contrast': '#454545'
    };

    /**
     * Dark shades
     */
    static dark = {
        'light': '#707070',
        'mid': '#454545',
        'dark': '#202020',
        'contrast': '#FFFFFF'
    };
}

/**
 * Service for accessing the stylesheet.
 */
 export class StyleService {
    // Static style to reduce rebuilding in memory everytime
    // this is referenced.
    static style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.light.mid,
            alignContent: 'center',
            justifyContent: 'center',
        },

        contrastText: {
            color: '#fff'
        }
    });

    /**
     * Style sheet for the camera stylesheet.
     */
    static camera = StyleSheet.create({
        container: {
            zIndex: 10,
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            alignContent: 'center',
            justifyContent: 'center'
        },

        camera: {
            flex: 1,
            zIndex: 10
        }
    })

    /**
     * Style sheet for playback components.
     */
    static playback = StyleSheet.create({
        fillContainer: {
            width: '100%',
            height: '100%'
        },

        albumCover: {
            backgroundColor: Colors.dark.mid,
            aspectRatio: 1,
            flex: 1,
            flexDirection: 'column',
            borderRadius: 22,
            alignContent: 'center',
            justifyContent: 'center'
        },

        selectTrackContainer: {
            aspectRatio: 1,
            flex: 1,
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center'
        },

        centerInFlexContainer: {
            alignSelf: 'center'
        }
    });

    /**
     * Style sheet for the session UI.
     */
    static session = StyleSheet.create({
        container: {
            position: 'absolute',
            zIndex: 0,
            backgroundColor: Colors.light.dark,
            left: '0%',
            top: '0%',
            width: '100%',
            height: '100%'
        },

        camera: {
            position: 'absolute',
            zIndex: 10,
            left: '2.5%',
            top: '7.5%',
            width: "20%",
            height: "20%",
            borderColor: Colors.dark.mid,
            borderWidth: 8,
            borderRadius: 22
        },

        cameraBackground: {
            position: 'absolute',
            zIndex: 5,
            left: '2.5%',
            top: '7.5%',
            width: "20%",
            height: "20%",
            backgroundColor: Colors.dark.dark,
            borderColor: Colors.dark.mid,
            borderWidth: 8,
            borderRadius: 22
        },

        cameraBorder: {
            position: 'absolute',
            zIndex: 20,
            left: '2.5%',
            top: '7.5%',
            width: "20%",
            height: "20%",
            borderColor: Colors.dark.mid,
            borderWidth: 8,
            borderRadius: 22
        },

        verticalContainer: {
            zIndex: 0,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center'
        },

        controlsContainer: {
            zIndex: 0,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'space-between'
        },

        'primaryControl': {
            flex: 1,
            width: '33.33%',
            aspectRatio: 1.33
        }
    });
    
    /**
     * Returns the main layout style sheet for the app.
     */
    getMainStyle() {
        return StyleService.style;
    }
}