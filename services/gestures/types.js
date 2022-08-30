import {
    GestureDescription,
    Finger,
    FingerCurl,
    FingerDirection } from 'fingerpose';

// Gesture types
export const Gestures = {
    "play": 0,
    "pause": 1,
    "nothing": 2,
};

export class GestureDefinition {
    static play = new GestureDescription('play');
    static pause = new GestureDescription('pause');
}

// Define the play gesture
GestureDefinition.play
    .addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.8);
GestureDefinition.play
    .addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
GestureDefinition.play
    .addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
GestureDefinition.play
    .addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.8);

for (var finger in [Finger.Middle, Finger.Ring, Finger.Pinky]) {
    GestureDefinition.play
        .addCurl(finger, FingerCurl.NoCurl, 0.8);
    GestureDefinition.play
        .addDirection(finger, FingerDirection.DiagonalUpLeft, 0.8);
    GestureDefinition.play
        .addDirection(finger, FingerDirection.VerticalUp, 0.8);
}

// Define the pause gesture

for (var finger in [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    GestureDefinition.pause
        .addCurl(finger, FingerCurl.NoCurl, 1.0);
}

for (var finger in [Finger.Thumb, Finger.Index, Finger.Middle]) {
    GestureDefinition.pause
        .addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
}

for (var finger in [Finger.Index, Finger.Middle, Finger.Ring]) {
    GestureDefinition.pause
        .addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

GestureDefinition.pause
    .addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0);