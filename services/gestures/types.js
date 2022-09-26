import {
    GestureDescription,
    Finger,
    FingerCurl,
    FingerDirection
} from 'fingerpose';

/**
 * Gesture predictions.
 */
export const Gestures = {
    "play": 0,
    "pause": 1,
    "nothing": 2,
};
/**
 * Finger Curls mapping.
 */
export const FingerCurls = {
    "No Curl":0,
    "Half Curl":1,
    "Full Curl":2,
};
/**
 * Finger Directions mapping.
 */
export const FingerDirections = {
    "Vertical Up": 0,
    "Vertical Down": 1,
    "Horizontal Left": 2,
    "Horizontal Right": 3,
    "Diagonal Up Right": 4,
    "Diagonal Up Left": 5,
    "Diagonal Down Right": 6,
    "Diagonal Down Left" : 7,
};

/**
 * Finger pose gesture definitions.
 */
export class GestureDefinition {
    /**
     * Pause gesture definition.
     */
    static pause;
};

/// DEFINE PLAY-PAUSE
GestureDefinition.pause = new GestureDescription("pause");
for (var finger in [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    GestureDefinition.pause.addCurl(finger, FingerCurl.FullCurl, 1.0);
    GestureDefinition.pause.addDirection(finger,FingerDirection.VerticalUp,1.0);     
    GestureDefinition.pause.addDirection(finger,FingerDirection.DiagonalUpRight,0.9);    
    GestureDefinition.pause.addDirection(finger,FingerDirection.DiagonalUpLeft,0.9);
}
GestureDefinition.pause.addCurl(Finger.Thumb,FingerCurl.NoCurl)
//