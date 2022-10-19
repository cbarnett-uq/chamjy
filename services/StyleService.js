import { StyleSheet } from 'react-native';
import * as Font from "expo-font";
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
        greyText: "#BFBFBF",
        footerMain: "#292929",
        footerMainTrans: "#292929ee",
        footerMainLight: "#505050",
        footerPlay: "#404040",
        textColor: "#fff"
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
        searchTextInput: {
            backgroundColor: Colors.light.light,
            color: Colors.light.contrast,
            fontFamily: Fonts.body1.family,
            fontSize: Fonts.body1.size,
            fontWeight: Fonts.body1.weight,
            justifyContent: "flex-start",
            alignContent: "center",
            padding: 10,
            borderRadius: 8
        },
        sideBarCollapsed: {
            flexDirecton: 'row',
            backgroundColor: Colors.dark.mid,
            flexBasis: 84
        },
        sideBarExpanded: {
            flexDirecton: 'row',
            backgroundColor: Colors.dark.mid,
            flexBasis: 200
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
        libraryCategoryLabel: {
            fontFamily: Fonts.h1.family,
            fontSize: Fonts.h1.size,
            fontWeight: Fonts.h1.weight,
            color: Colors.dark.contrast,
            justifyContent: "flex-start",
            marginBottom: 20
        },
        songEntryContainer: {
            width: 150,
            height: 191,
            justifyContent: "flex-start",
            underlayColor: Colors.dark.dark,
            marginTop: 10,
            marginRight: 10
        },
        songEntryAlbumCover: {
            width: 150,
            height: 150,
            borderRadius: 21,
            marginBottom: 5
        },
        songEntryLabel: {
            fontFamily: Fonts.body1.family,
            fontSize: Fonts.body1.size,
            fontWeight: Fonts.body1.weight,
            color: Colors.dark.contrast,
            justifyContent: "flex-start"
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
            zIndex: 15,
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            alignContent: 'center',
            justifyContent: 'center',
            backgroundColor: "#000",
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
        overlay: {
            zIndex: 10,
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            backgroundColor: "transparent",
            flexDirection: "column",
            justifyContent: "flex-start"
        },

        overlayTextContainer: {
            flexDirection: "row",
            justifyContent: "center"
        },

        overlayText: {
            fontFamily: Fonts.h1.family,
            fontSize: 24,
            fontWeight: Fonts.h1.weight,
            color: Colors.dark.contrast
        },

        container: {
            zIndex: 0,
            backgroundColor: "#000",
            flex:1
        },

        topHalfContainer: {
            flex: 1,
            margin: "2%",
        },

        libraryButton: {
            zIndex: 11,
            borderRadius: 10,
            height: DimensionService.getMinDimension() * 0.05,
        },

        libraryButtonText: {
            color: "#fff"
        },

        rowContainerCenter: {
            flexDirection: 'row',
            alignItems: 'center'
        },

        rowContainerMargin: {
            flexDirection: 'row',
            marginHorizontal: "2%",
        },

        endContainer: {
            
            alignItems: 'flex-end'
        },

        cameraContainerVerticle: {
            position: 'absolute',
            zIndex: 10,
            height: DimensionService.getMaxDimension() * 0.2,
            top: DimensionService.getMinDimension() * 0.08,
            aspectRatio: 0.77,
            borderColor: Colors.dark.mid,
            borderWidth: 8,
            borderRadius: 22
        },

        cameraContainerHorizontal: {
            position: 'absolute',
            zIndex: 10,
            width: DimensionService.getMaxDimension() * 0.2,
            top: DimensionService.getMinDimension() * 0.08,
            aspectRatio: 1.33,
            borderColor: Colors.dark.mid,
            borderWidth: 8,
            borderRadius: 22
        },

        cameraOutlineVerticle: {
            position: 'absolute',
            zIndex: 20,
            height: DimensionService.getMaxDimension() * 0.2,
            top: DimensionService.getMinDimension() * 0.08,
            aspectRatio: 0.77,
            borderColor: Colors.dark.mid,
            borderWidth: 8,
            borderRadius: 22,

        },

        cameraOutlineHorizontal: {
            position: 'absolute',
            zIndex: 20,
            width: DimensionService.getMaxDimension() * 0.2,
            top: DimensionService.getMinDimension() * 0.08,
            aspectRatio: 1.33,
            borderColor: Colors.dark.mid,
            borderWidth: 8,
            borderRadius: 22,
            
        },

        currentSongContainer: {
            flex: 1,
            justifyContent: 'center',
        },

        currentSongImage: {
            height: DimensionService.getMinDimension() * 0.40,
            resizeMode: "contain",
            aspectRatio: 1,
            alignSelf: 'center',
            borderRadius:7
        },

        currentSongNameText: {
            alignSelf: 'center',
            marginTop: "1%",
            fontSize: DimensionService.getWidthHeight().width * 0.023 > 17 ? DimensionService.getWidthHeight().width * 0.023 : 17,
            color: Colors.session.textColor,
            fontWeight: "bold"
        },

        currentSongArtistText: {
            alignSelf: 'center',
            fontSize: DimensionService.getWidthHeight().width * 0.017 > 12 ? DimensionService.getWidthHeight().width * 0.017 : 12,
            color: Colors.session.textColor
        },

        currentSongSliderContainer: {
            marginTop: "0%"
        },

        footerContainer: {
            flex: 0.25,
            alignItems: 'center',
            maxHeight: DimensionService.getMinDimension() * 0.25 < 150 ? DimensionService.getMinDimension() * 0.25 : 150,
        },

        footerPlayButtonContainer: {
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'row'
        },

        footerPlayButton: {
            justifyContent: "center",
            alignItems: "center",
            width: DimensionService.getMinDimension() * 0.15,
            borderRadius: 100,
            alignSelf: 'center',
            alignContent: "center",
            aspectRatio: 1,
            
        },

        footerPlayButtonImageContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent:'center'
        },

        footerPlayButtonImage: {
            width: "60%",
            aspectRatio: 1,
            alignSelf: 'center',
            tintColor: "white"
        },

        footerPlayStepBackImage: {
            width: "45%",
            aspectRatio: 1,
            alignSelf: 'center',
            tintColor: "white"
        },

        footerPlayStepForwardImage: {
            width: "45%",
            aspectRatio: 1,
            alignSelf: 'center',
            tintColor: "white",
            transform: [
                { scaleX: -1 }
            ]
        },

        footerBar: {
            width: "100%",
            backgroundColor: Colors.session.footerMain,
            //borderTopLeftRadius: 20,
            //borderTopRightRadius: 20,
            flexDirection: 'row',
            height: "100%"
        },

        footerBarButtonInsideContainer: {
            alignItems: 'center',
            alignContent:'center',
            justifyContent:'center',
            height:"100%",
            width:"100%",
        },

        footerBarButton: {
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flex: 1,
            onTouchColor: "#ffffff22",
            width: "100%",
            height: "100%",
        },

        footerBarButtonImage: {
            height:"25%",
            resizeMode:'stretch',
            marginRight: 3,
            aspectRatio:1,
            tintColor: Colors.session.greyText
        },

        footerBarButtonText: {
            fontWeight: "bold",
            color: Colors.session.greyText,
            fontSize: DimensionService.getMaxDimension() * 0.017 > 13 ? DimensionService.getMaxDimension() * 0.017 : 13
        },

        mainText: {
            color: Colors.session.textColor,
            fontSize: DimensionService.getMaxDimension() * 0.015 > 13 ? DimensionService.getMaxDimension() * 0.015 : 13
        },

        popUpContainer: {
            position: "absolute",
            alignSelf: 'center',
            flex: 1, width: "100%",
            bottom: "100%",
            zIndex: 100,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
        },

        popUpText: {
            paddingLeft: "15%",
            margin: 5,
            color: Colors.session.textColor,
            fontSize: DimensionService.getWidthHeight().width * 0.02 > 13 ? DimensionService.getWidthHeight().width * 0.02 : 13,
        },

        popUpTouchableTop: {
            width: "100%",
            flex: 1,
            backgroundColor: Colors.session.footerMainTrans,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            paddingHorizontal: "1%",
            paddingVertical:"3%",
            borderBottomColor: "#333333",
            borderBottomWidth: 1
        },

        popUpTouchableMiddle: {
            width: "100%",
            flex: 1,
            backgroundColor: Colors.session.footerMainTrans,
            paddingHorizontal: "1%",
            paddingVertical: "3%",
            borderBottomColor: "#333333",
            borderBottomWidth:1
        },

        popUpTouchableBottom: {
            width: "100%",
            flex: 1,
            backgroundColor: Colors.session.footerMainTrans,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            paddingHorizontal: "1%",
            paddingVertical: "3%",
        },

        popUpTouchableInnerContainer: {
            flexDirection: "row",
            alignItems:"center"
        },

        triangle: {
            borderTopWidth: 11,
            borderRightWidth: 11,
            borderBottomWidth: 0,
            borderLeftWidth: 11,
            borderTopColor: "#292929ee",
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
        },

        markerContainer: {
            width: "100%",
            position: 'absolute',
            alignSelf: 'center',
            flexDirection: "row",
            paddingHorizontal: 16
        },

        markerText: {
            right: "50%",
            color: "#fff",
            fontWeight: "bold"
        },

        blurImageBackground: {
            position: 'absolute',
            width: "100%",
            height: "100%",
            opacity: 0.8
        }
    });
}