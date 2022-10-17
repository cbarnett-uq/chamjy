import { PixelRatio, StyleSheet } from 'react-native';
import DimensionService from './DimensionService.js';

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
        container: {
            position: 'absolute',
            zIndex: 0,
            backgroundColor: Colors.light.light,
            left: '0%',
            top: '0%',
            width: '100%',
            height: '100%',
            backgroundColor: "#000"
        },

        topHalfContainer: {
            flex: 1,
            margin: "2%",
        },

        libraryButton: {
            borderRadius: 10,
            padding: 5
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
            top: 40,
            aspectRatio: 0.77,
            borderColor: Colors.dark.mid,
            borderWidth: 8,
            borderRadius: 22
        },

        cameraContainerHorizontal: {
            position: 'absolute',
            zIndex: 10,
            width: DimensionService.getMaxDimension() * 0.2,
            top: 40,
            aspectRatio: 1.33,
            borderColor: Colors.dark.mid,
            borderWidth: 8,
            borderRadius: 22
        },

        cameraOutlineVerticle: {
            position: 'absolute',
            zIndex: 20,
            height: DimensionService.getMaxDimension() * 0.2,
            top: 40,
            aspectRatio: 0.77,
            borderColor: Colors.dark.mid,
            borderWidth: 8,
            borderRadius: 22,

        },

        cameraOutlineHorizontal: {
            position: 'absolute',
            zIndex: 20,
            width: DimensionService.getMaxDimension() * 0.2,
            top: 40,
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
            height: DimensionService.getMinDimension() * 0.15,
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
            width: "30%",
            aspectRatio: 1,
            alignSelf: 'center'
        },

        footerBar: {
            width: "100%",
            backgroundColor: Colors.session.footerMain,
            //borderTopLeftRadius: 20,
            //borderTopRightRadius: 20,
            flexDirection: 'row'
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
            width:"100%"
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
            fontSize: DimensionService.getMaxDimension() * 0.02 > 13 ? DimensionService.getMaxDimension() * 0.02 : 13
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