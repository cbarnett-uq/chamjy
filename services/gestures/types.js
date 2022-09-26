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
// DEFINE MARKER-A 
GestureDefinition.markerA = new GestureDescription("markerA")
for (var finger in [Finger.Middle, Finger.Ring, Finger.Pinky]) {
    GestureDefinition.markerA.addCurl(finger, FingerCurl.FullCurl,1.0);
    GestureDefinition.markerA.addDirection(finger,FingerDirection.HorizontalLeft,1.0);
    GestureDefinition.markerA.addDirection(finger,FingerDirection.DiagonalUpLeft,0.9);
    GestureDefinition.markerA.addDirection(finger,FingerDirection.DiagonalDownLeft,0.9);
}
for (var finger in [Finger.Thumb, Finger.Index]){
    GestureDefinition.markerA.addCurl(finger, FingerCurl.NoCurl,1.0);
    GestureDefinition.markerA.addCurl(finger, FingerCurl.HalfCurl,0.9);
    GestureDefinition.markerA.addDirection(finger,FingerDirection.HorizontalLeft,1.0);
    GestureDefinition.markerA.addDirection(finger,FingerDirection.DiagonalUpLeft,0.9);
    GestureDefinition.markerA.addDirection(finger,FingerDirection.DiagonalDownLeft,0.9);
}
//DEFINE MARKER-B
GestureDefinition.markerA = new GestureDescription("markerB")
for (var finger in [Finger.Middle, Finger.Ring, Finger.Pinky]) {
    GestureDefinition.markerB.addCurl(finger, FingerCurl.FullCurl,1.0);
    GestureDefinition.markerB.addDirection(finger,FingerDirection.VerticalUp,1.0);
    GestureDefinition.markerB.addDirection(finger,FingerDirection.DiagonalUpLeft,0.9);
    GestureDefinition.markerB.addDirection(finger,FingerDirection.DiagonalUpRight,0.9);
}
for (var finger in [Finger.Thumb, Finger.Index]){
    GestureDefinition.markerB.addCurl(finger, FingerCurl.NoCurl,1.0);
    GestureDefinition.markerB.addCurl(finger, FingerCurl.HalfCurl,0.9);
    GestureDefinition.markerB.addDirection(finger,FingerDirection.VerticalUp,1.0);
    GestureDefinition.markerB.addDirection(finger,FingerDirection.DiagonalUpLeft,0.9);
    GestureDefinition.markerB.addDirection(finger,FingerDirection.DiagonalUpRight,0.9);
}