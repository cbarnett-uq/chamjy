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
 * Finger pose gesture definitions.
 */
export class GestureDefinition {
    /**
     * Pause gesture definition.
     */
    static pause;
}

/// DEFINE PAUSE
GestureDefinition.pause = new GestureDescription("pause");
for (var finger in [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    GestureDefinition.pause.addCurl(finger, FingerCurl.NoCurl, 1.0);    
}