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
     * Quarternary colour tones
     */
    static quarternary = {
        'light': '#FFFFFF',
        'mid': '#C0C0C0',
        'dark': '#000000',
        'constrast': '#FF0000'
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
     /**
      * Layout style sheet.
      */
     static layout = StyleSheet.create({
        outerContainer: {
            flex: 1,
            alignContext: 'center',
            justifyContent: 'center'
        },

        flexContainer: {
            flex: 1,
            alignContext: 'center',
            justifyContent: 'center'
        }
    });

    /**
     * Style sheet for the file selection UI.
     */
    static fileSelect = StyleSheet.create({
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
            paddingLeft: 10,
            paddingTop: 15,
            paddingBottom: 20
        },
        fileSelctionLeftMenuImage: {
            tintColor: "grey",
            marginRight: 10,
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
        },
        fileSelctionLeftMenuTouchableShrunk: {
            borderRadius: 5,
            backgroundColor: "#ccc",
            underlayColor: "#eee",
            paddingTop: 15,
            paddingBottom: 20,
        },
        fileSelctionLeftMenuImageShrunk: {
            tintColor: "grey",
            width: 24,
            height: 24,
        },
    });

    /**
     * Style sheet for the camera.
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
            alignContent: 'cendter',
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
            backgroundColor: Colors.light.light,
            left: '0%',
            top: '0%',
            width: '100%',
            height: '100%'
        },

        topHalfContainer: {
            flex: 1,
            margin: "2%"
        },

        homeButton: {
            padding: "1%"
        },

        rowContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },

        cameraContainer: {
            position: 'absolute',
            zIndex: 10,
            width: this.getMaxDimension() * 0.2,
            top: 30,
            aspectRatio: 1.33,
            borderColor: Colors.dark.mid,
            borderWidth: 8,
            borderRadius: 22
        }
    });
}