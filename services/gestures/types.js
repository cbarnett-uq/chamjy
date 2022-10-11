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
    "pausePlay": 0,
    "markerA": 1,
    "nothing": 2,
    "markerB": 3,
    "skipTB":4,
    "loop":5
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
    static pausePlay;
    static markerA;
    static markerB;
    static skipTB;
    static loop;

};

/// DEFINE PLAY-PAUSE
GestureDefinition.pausePlay = new GestureDescription("pausePlay");
for (var finger in [Finger.Index,Finger.Middle, Finger.Ring, Finger.Pinky]) {
    GestureDefinition.pausePlay.addCurl(finger, FingerCurl.FullCurl, 1);
    GestureDefinition.pausePlay.addDirection(finger,FingerDirection.VerticalUp,1);        
    GestureDefinition.pausePlay.addDirection(finger,FingerDirection.DiagonalUpLeft,1);
}
GestureDefinition.pausePlay.addCurl(Finger.Thumb,FingerCurl.NoCurl,0.9);
GestureDefinition.pausePlay.addCurl(Finger.Thumb,FingerCurl.HalfCurl,1);
//DEFINE MARKER-A
GestureDefinition.markerA = new GestureDescription('markerA');
for (var finger in [Finger.Middle, Finger.Ring, Finger.Pinky]) {
    GestureDefinition.markerA.addCurl(finger, FingerCurl.FullCurl,1);
    GestureDefinition.markerA.addDirection(finger,FingerDirection.VerticalUp,1);
    GestureDefinition.markerA.addDirection(finger,FingerDirection.DiagonalUpLeft,0.7);
}
for (var finger in [Finger.Thumb, Finger.Index]){
    GestureDefinition.markerA.addCurl(finger, FingerCurl.NoCurl,1);
    GestureDefinition.markerA.addDirection(finger,FingerDirection.VerticalUp,1);
    GestureDefinition.markerA.addDirection(finger,FingerDirection.DiagonalUpLeft,0.7);
}
GestureDefinition.markerA.addCurl(Finger.Index,FingerCurl.HalfCurl,1);

// DEFINE MARKER-B
GestureDefinition.markerB = new GestureDescription("markerB");
for (var finger in [Finger.Middle, Finger.Ring, Finger.Pinky]) {
    GestureDefinition.markerB.addCurl(finger, FingerCurl.FullCurl,1);
    GestureDefinition.markerB.addDirection(finger,FingerDirection.HorizontalLeft,1);
    GestureDefinition.markerB.addDirection(finger,FingerDirection.DiagonalUpLeft,0.8);
}
for (var finger in [Finger.Thumb, Finger.Index]){
    GestureDefinition.markerB.addCurl(finger, FingerCurl.NoCurl,1);
    GestureDefinition.markerB.addDirection(finger,FingerDirection.HorizontalLeft,1);
    GestureDefinition.markerB.addDirection(finger,FingerDirection.DiagonalUpLeft,0.8);
}
GestureDefinition.markerB.addCurl(Finger.Index,FingerCurl.HalfCurl,1);

//Define Skip to beginning 
GestureDefinition.skipTB = new GestureDescription("skipTB");
for (var finger in [Finger.Index,Finger.Middle, Finger.Ring, Finger.Pinky]) {
    GestureDefinition.skipTB.addCurl(finger, FingerCurl.HalfCurl,1);
    GestureDefinition.skipTB.addDirection(finger,FingerDirection.HorizontalLeft,1);
    GestureDefinition.skipTB.addDirection(finger,FingerDirection.DiagonalUpLeft,0.8);
}
GestureDefinition.skipTB.addCurl(Finger.Index,FingerCurl.FullCurl,1);
GestureDefinition.skipTB.addCurl(Finger.Thumb,FingerCurl.NoCurl,1);
GestureDefinition.skipTB.addDirection(Finger.Thumb,FingerCurl.NoCurl,1);
GestureDefinition.skipTB.addDirection(Finger.pinky,FingerDirection.DiagonalDownLeft,0.8);
//Define loop 
GestureDefinition.loop = new GestureDescription("loop");
for (var finger in [Finger.Thumb,Finger.Middle,Finger.Ring,Finger.Pinky]) {
    GestureDefinition.loop.addCurl(finger,FingerCurl.NoCurl,1);
    GestureDefinition.loop.addCurl(finger,FingerCurl.HalfCurl,1);
    GestureDefinition.loop.addDirection(finger,FingerDirection.DiagonalUpLeft,1);
}
GestureDefinition.loop.addCurl(Finger.Index.NoCurl,0.9);
GestureDefinition.loop.addCurl(Finger.Index.HalfCurl,1);
GestureDefinition.loop.addDirection(Finger.Index,FingerDirection.DiagonalUpLeft,1);
GestureDefinition.loop.addDirection(Finger.Ring,FingerDirection.VerticalUp,1);
GestureDefinition.loop.addDirection(Finger.Pinky,FingerDirection.VerticalUp,1);