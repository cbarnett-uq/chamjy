import * as Font from "expo-font";
import { StyleSheet } from 'react-native';
import DimensionService from './DimensionService.js';

/**
 * Defines the colour palette used by the app.
 */
export class Colors {
    /**
     * Primary colour tones
     */
    static primary = {
        'light': '#54FBDA',
        'mid': '#1ABC9C',
        'dark': '#0A4136',
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
        'light': '#6C6E73',
        'mid': '#41444D',
        'dark': '#24262E',
        'contrast': '#FFFFFF'
    };

    static session = {
        greyText: "#3E3E3E"
    }
}

/**
 * Defines the fonts used by the app.
 */
export class Fonts {
    static _isReady = false;

    static async init() {
        if (Fonts._isReady) return;

        await Font.loadAsync("futura", require("../assets/fonts/futura.ttf"));
        if (!Font.isLoaded("futura")) return;
        
        await Font.loadAsync("SegoeUI", require("../assets/fonts/segoeui.TTF"));
        if (!Font.isLoaded("SegoeUI")) return;

        Fonts._isReady = true;
        return;
    }

    static async ready() {
        if (Fonts._isReady) return true;

        await Fonts.init();
        return Fonts._isReady;
    }

    static logo = {
        family: "Noteworthy-Bold",
        size: 19
    };

    static h1 = {
        family: "futura",
        size: 20,
        weight: "bold"
    };

    static h2 = {
        family: "futura",
        size: 18,
        weight: "bold"
    };

    static h3 = {
        family: "futura",
        size: 16,
        weight: "bold"
    };

    static h4 = {
        family: "futura",
        size: 14,
        weight: "bold"
    };

    static h5 = {
        family: "futura",
        size: 12,
        weight: "bold"
    };

    static h6 = {
        family: "futura",
        size: 10,
        weight: "bold"
    };

    static body1 = {
        family: "futura",
        size: 12,
        weight: "normal"
    };

    static body2 = {
        family: "futura",
        size: 15,
        weight: "normal"
    };
}

/**
 * Service for accessing the stylesheet.
 */
export class StyleService {
    static _isReady = false;

    static async init() {
        if (StyleService._isReady) return;
        const success = await Fonts.ready();

        if (success) StyleService._isReady = true;
    }

    static async ready() {
        if (StyleService._isReady) return true;

        await StyleService.init();
        return StyleService._isReady;
    }
    
    /**
     * Layout style sheet.
     */
    static layout = StyleSheet.create({
        outerContainer: {
            flex: 1,
            alignContext: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent'
        },

        flexContainer: {
            flex: 1,
            alignContext: 'center',
            justifyContent: 'center'
        },

        rowFlexContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        }
    });

    /**
     * Stylesheet for the library UI.
     */
    static library = StyleSheet.create({
        background: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            zIndex: 0
        },
        sideBarCollapsed: {
            flexDirecton: 'row',
            backgroundColor: Colors.dark.mid,
            flexBasis: 84
        },
        sideBarExpanded: {
            flexDirecton: 'row',
            backgroundColor: Colors.dark.mid,
            flexBasis: 310
        },
        sideBarLogo: {
            tintColor: Colors.primary.mid,
            marginRight: 10
        },
        sideBarMenu: {
            marginTop: 30,
            marginLeft: 15,
            marginRight: 15,
            zIndex: 1
        },
        sideBarMenuCategoryLabel: {
            marginTop: 15,
            marginBottom: 15,
            fontFamily: Fonts.h6.family,
            fontWeight: Fonts.h6.weight,
            fontSize: Fonts.h6.size,
            color: Colors.dark.contrast
        },
        sideBarMenuItem: {
            borderRadius: 5,
            backgroundColor: Colors.dark.mid,
            underlayColor: Colors.dark.light,
            paddingLeft: 10,
            paddingTop: 15,
            paddingBottom: 20,
            zIndex: 2
        },
        sideBarMenuItemIcon: {
            tintColor: Colors.primary.mid,
            marginRight: 10,
            width: 24,
            height: 24,
            zIndex: 3
        },
        sideBarMenuItemLabel: {
            fontFamily: Fonts.body2.family,
            fontWeight: Fonts.body2.weight,
            fontSize: Fonts.body2.size,
            color: Colors.dark.contrast,
            zIndex: 3
        },
        contentContainer: {
            flex: 2,
            elevation: 1,
            zIndex: 1,
            backgroundColor: 'transparent'
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

        rowContainerCenter: {
            flexDirection: 'row',
            alignItems: 'center'
        },

        rowContainerMargin: {
            flexDirection: 'row',
            marginHorizontal: "2%"
        },

        endContainer: {
            flex: 1,
            alignItems: 'flex-end'
        },

        cameraContainer: {
            position: 'absolute',
            zIndex: 10,
            width: DimensionService.getMaxDimension() * 0.2,
            top: 30,
            aspectRatio: 1.33,
            borderColor: Colors.dark.mid,
            borderWidth: 8,
            borderRadius: 22
        },

        cameraOutline: {
            position: 'absolute',
            zIndex: 20,
            width: DimensionService.getMaxDimension() * 0.2,
            top: 30,
            aspectRatio: 1.33,
            borderColor: Colors.dark.mid,
            borderWidth: 8,
            borderRadius: 22
        },

        currentSongContainer: {
            flex: 1,
            justifyContent: 'center'
        },

        currentSongImage: {
            height: DimensionService.getMinDimension() * 0.40,
            resizeMode: "contain",
            aspectRatio: 1,
            alignSelf: 'center'
        },

        currentSongNameText: {
            alignSelf: 'center',
            marginTop: "1%",
            fontSize: 17
        },

        currentSongSliderContainer: {
            marginTop: "2%"
        },

        footerContainer: {
            flex: 0.25,
            alignItems: 'center',
            maxHeight: DimensionService.getMinDimension() * 0.25
        },

        footerPlayButtonContainer: {
            flex: 1,
            position: "absolute",
            zIndex: 10,
            height: "100%"
        },

        footerPlayButton: {
            backgroundColor: Colors.tertiary.light,
            justifyContent: "center",
            alignItems: "center",
            height: DimensionService.getMinDimension() * 0.18,
            borderRadius: 100,
            bottom: DimensionService.getMinDimension() * 0.09,
            alignSelf: 'center',
            alignContent: "center",
            aspectRatio: 1
        },

        footerPlayButtonImageContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        },

        footerPlayButtonImage: {
            width: "30%",
            aspectRatio: 1, alignSelf: 'center'
        },

        footerBar: {
            width: "100%",
            flex: 1,
            backgroundColor: Colors.secondary.light,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            flexDirection: 'row'
        },

        footerBarButtonContainer: {
            flex: 1,
            flexDirection: 'row',
            alignContent: 'space-around',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },

        footerBarButtonInsideContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },

        footerBarButton: {
            margin: 10,
            borderRadius: 10,
            height: "100%",
            justifyContent: 'center'
        },

        footerBarButtonImage: {
            width: 15,
            height: 15,
            marginRight: 3
        },

        footerBarButtonText: {
            fontWeight: "bold",
            color: Colors.session.greyText
        },
    });
}