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

    "pausePlay": 0,"pausePlay1": 0,"pausePlay2": 0,
    "markerA": 1,"markerA1": 1,"markerA2": 1,
    "markerB": 2,"markerB1": 2,"markerB2": 2,
    "skipTB": 3,"skipTB1": 3,"skipTB2": 3,
    "loop": 4,"loop1": 4,"loop2": 4,
    "tempoUp":5,"tempoUp1":5,"tempoUp2":5,
    "tempoDown":6,"tempoDown1":6,
    "nothing": 7,

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
    static pausePlay1;
    static pausePlay2;
    static markerA;
    static markerA1;
    static markerA2;
    static markerB;
    static markerB1;
    static markerB2;
    static skipTB;
    static skipTB1;
    static skipTB2;
    static loop;
    static loop1;
    static loop2;
    static tempoUp;
    static tempoUp1;
    static tempoUp2;
    static tempoDown;
    static tempoDown1;

    static gestureDefintonList = [
        GestureDefinition.pausePlay,GestureDefinition.pausePlay1,GestureDefinition.pausePlay2,
        GestureDefinition.markerA,GestureDefinition.markerA1,GestureDefinition.markerA2,
        GestureDefinition.markerB,GestureDefinition.markerB1,GestureDefinition.markerB2,
        GestureDefinition.skipTB,GestureDefinition.skipTB1,GestureDefinition.skipTB2,
        GestureDefinition.loop,GestureDefinition.loop1,GestureDefinition.loop2,
        GestureDefinition.tempoUp,GestureDefinition.tempoUp1,GestureDefinition.tempoUp2,
        GestureDefinition.tempoDown,GestureDefinition.tempoDown1,
    ];
    
};



/// DEFINE PLAY-PAUSE
GestureDefinition.pausePlay = new GestureDescription("pausePlay");
GestureDefinition.pausePlay1 = new GestureDescription("pausePlay1");
GestureDefinition.pausePlay2 = new GestureDescription("pausePlay2");
_addGestureDefinition(GestureDefinition.pausePlay,[1, 5, 2, 5, 2, 5, 2, 0, 2, 0]);
_addGestureDefinition(GestureDefinition.pausePlay1,[0, 5, 2, 5, 2, 5, 2, 0, 2, 0]);
_addGestureDefinition(GestureDefinition.pausePlay2,[1, 0, 2, 5, 2, 0, 2, 0, 2, 4]);

//DEFINE MARKER-A
GestureDefinition.markerA = new GestureDescription('markerA');
GestureDefinition.markerA1 = new GestureDescription('markerA1');
GestureDefinition.markerA2 = new GestureDescription('markerA2');
_addGestureDefinition(GestureDefinition.markerA,[0, 5, 1, 0, 1, 0, 2, 5, 2, 5]);
_addGestureDefinition(GestureDefinition.markerA1,[0, 0, 1, 0, 1, 0, 2, 0, 2, 0]);
_addGestureDefinition(GestureDefinition.markerA2,[0, 0, 1, 0, 1, 0, 2, 0, 2, 0]);
// DEFINE MARKER-B
GestureDefinition.markerB = new GestureDescription("markerB");
GestureDefinition.markerB1 = new GestureDescription("markerB1");
GestureDefinition.markerB2 = new GestureDescription("markerB2");
_addGestureDefinition(GestureDefinition.markerB,[0, 2, 1, 2, 0, 2, 2, 2, 2, 2]);
_addGestureDefinition(GestureDefinition.markerB1,[0, 5, 1, 2, 1, 2, 2, 5, 2, 2]);
_addGestureDefinition(GestureDefinition.markerB2,[0, 5, 1, 2, 1, 2, 2, 5, 2, 2]);
//Define Skip to beginning 
GestureDefinition.skipTB = new GestureDescription("skipTB");
GestureDefinition.skipTB1 = new GestureDescription("skipTB1");
GestureDefinition.skipTB2 = new GestureDescription("skipTB3");
_addGestureDefinition(GestureDefinition.skipTB,[0, 7, 2, 4, 1, 2, 1, 2, 1, 2]);
_addGestureDefinition(GestureDefinition.skipTB1,[0, 2, 2, 2, 1, 2, 1, 2, 0, 2]);
_addGestureDefinition(GestureDefinition.skipTB2,[0, 2, 2, 2, 1, 2, 1, 2, 0, 2]);
//Define loop 
GestureDefinition.loop = new GestureDescription("loop");
GestureDefinition.loop1 = new GestureDescription("loop1");
GestureDefinition.loop2 = new GestureDescription("loop2");
_addGestureDefinition(GestureDefinition.loop,[0, 5, 1, 5, 1, 5, 0, 5, 0, 0]);
_addGestureDefinition(GestureDefinition.loop1,[1, 5, 1, 5, 1, 2, 1, 5, 1, 2]);
_addGestureDefinition(GestureDefinition.loop2,[1, 5, 1, 5, 1, 2, 1, 5, 1, 2]);
//Define tempoUp
GestureDefinition.tempoUp = new GestureDescription("tempoUp");
GestureDefinition.tempoUp1 = new GestureDescription("tempoUp1");
GestureDefinition.tempoUp2 = new GestureDescription("tempoUp2");
_addGestureDefinition(GestureDefinition.tempoUp,[0, 4, 2, 3, 2, 3, 2, 3, 2, 6],);
_addGestureDefinition(GestureDefinition.tempoUp1,[0, 4, 2, 3, 2, 3, 2, 3, 2, 3],);
_addGestureDefinition(GestureDefinition.tempoUp2,[0, 4, 2, 3, 2, 3, 2, 3, 2, 3],);
//Define tempoDown
GestureDefinition.tempoDown = new GestureDescription("tempoDown");
GestureDefinition.tempoDown1 = new GestureDescription("tempoDown1");
_addGestureDefinition(GestureDefinition.tempoDown,[0, 3, 2, 3, 2, 3, 2, 3, 0, 3]);
_addGestureDefinition(GestureDefinition.tempoDown1,[0, 4, 2, 4, 2, 3, 2, 3, 0, 3]);

/**
 * adds gesture definition 
 * @param {GestureDescription} gesture 
 * @param {[]} poseData 
 */
function _addGestureDefinition(gesture,poseData){
    i = 0;
    for (var finger in [Finger.Thumb,Finger.Index,Finger.Middle, Finger.Ring, Finger.Pinky]){
        gesture.addCurl(finger,poseData[i++],1);
        gesture.addDirection(finger,poseData[i++],1);
    }
}
