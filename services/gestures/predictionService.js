import { GestureEstimator} from 'fingerpose';
import HandPoseService from './handPoseService';
import { Gestures, GestureDefinition, GestureDefinitionLeft, Hands} from './types';
import GesturesService from './gesturesService';
import { model } from '@tensorflow/tfjs';

/**
 * Defines the minimum prediction confidence used by fingerpose
 * to detect a static gesture. Range [0, 10].
 */
const StaticPredictionConfidenceThreshold = 7;

/**
 * Singleton service for predicting current gesture based on
 * the hand pose input.
 */
export default class PredictionService{
    static _model;
    static _ready = false;
    static _lastGesture;
    static _sameCount;
    static _preferredHand;
    static _rightModel;
    static _leftModel; 
    /**
     * Initialises the gesture service by loading the model.
     */
    static async init() {
        
        if (PredictionService._ready) return;

        try {
            PredictionService._preferredHand = Hands["Right"];

            PredictionService._rightModel = new GestureEstimator([
                GestureDefinition.pausePlay,GestureDefinition.pausePlay1,GestureDefinition.pausePlay2,
                GestureDefinition.markerA,GestureDefinition.markerA1,GestureDefinition.markerA2,
                GestureDefinition.markerB,GestureDefinition.markerB1,GestureDefinition.markerB2,
                GestureDefinition.skipTB,GestureDefinition.skipTB1,GestureDefinition.skipTB2,
                GestureDefinition.loop,GestureDefinition.loop1,GestureDefinition.loop2,
                GestureDefinition.tempoUp,GestureDefinition.tempoUp1,GestureDefinition.tempoUp2,
                GestureDefinition.tempoDown,GestureDefinition.tempoDown1,
            ]);
            PredictionService._leftModel = new GestureEstimator([
                GestureDefinitionLeft.pausePlay,GestureDefinitionLeft.pausePlay1,GestureDefinitionLeft.pausePlay2,
                GestureDefinitionLeft.markerA,GestureDefinitionLeft.markerA1,GestureDefinitionLeft.markerA2,
                GestureDefinitionLeft.markerB,GestureDefinitionLeft.markerB1,GestureDefinitionLeft.markerB2,
                GestureDefinitionLeft.skipTB,GestureDefinitionLeft.skipTB1,GestureDefinitionLeft.skipTB2,
                GestureDefinitionLeft.loop,GestureDefinitionLeft.loop1,GestureDefinitionLeft.loop2,
                GestureDefinitionLeft.tempoUp,GestureDefinitionLeft.tempoUp1,GestureDefinitionLeft.tempoUp2,
                GestureDefinitionLeft.tempoDown,GestureDefinitionLeft.tempoDown1,GestureDefinitionLeft.tempoDown2,
            ])
            PredictionService._model = PredictionService._rightModel;
            PredictionService._ready = true;
            PredictionService._lastGesture = Gestures['nothing'];
            PredictionService._sameCount = 0;

        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Delays the promise for an amount in milliseconds.
     * @param { int } ms Time in milliseconds to wait.
     */
    static async _timeout(ms) {
        return new Promise((resolve) => { setTimeout(resolve, ms); });
    }

    /**
     * Waits for the gestures service to be ready. This method will hang
     * if init errors out.
     */
    static async ready() {
        await PredictionService.init();

        while (!PredictionService._ready) {
            await PredictionService._timeout(1);
        }
    }
    /**
     * set preferred hand
     * @param {String} hand 
     */
    static setPreferredHand(hand){
        PredictionService._preferredHand = Hands[hand];
        switch(Hands[hand]){
            case Hands["Right"]:
                PredictionService._model = PredictionService._rightModel;
                break;
            case Hands["Left"]:
                PredictionService._model = PredictionService._leftModel;
                break;
        }
    }

    static async predict() {
        if (!PredictionService._ready) throw "PredictionService is not ready.";
        var result = await PredictionService._predictStatic();
        
        //if (result !== Gestures["nothing"]) return result;
        /*if(result !== Gestures["nothing"] && result !== null){
            result = await GesturesService.predictDynamic();

            console.log(result);
            console.log(result == Gestures["pausePlay"]);
        }*/
        
        return result;
    }
    
    /**
     * Returns the predicted gesture using fingerpose for static
     * gestures. Must meet minimum confidence threshold.
     */
    static async _predictStatic() {
        if (!PredictionService._ready) throw "PredictionService is not ready.";

        let pose = HandPoseService.getLastFrame();
        if (pose.length == 0) return Gestures["nothing"];

        var hand = 0;

        for (let i = 0; i < pose.length; i++){
            if (Hands[pose[i].handedness] === PredictionService._preferredHand){
                hand = i;
            }
        }
        if (hand == -1) return Gestures["nothing"];
        
        var landmarks = pose[hand].keypoints3D
            .map((x) => { return [x.x, x.y, x.z]; });
        
        var result = PredictionService._model
            .estimate(landmarks, StaticPredictionConfidenceThreshold);
        GesturesService._update(result.poseData);
        return PredictionService._mapResultToGesture(result);
    }

    /**
     * Maps the highest scoring prediction tso the gestures map.
     * @param { any } result    Result from fingerpose prediction
     */
    static _mapResultToGesture(result) {
        var name = "nothing";
        var max = 0;
        //console.log(result.poseData);
        for (var i = 0; i < result.gestures.length; i++) {
            if (result.gestures[i].score > max) {
                name = result.gestures[i].name;
                max = result.gestures[i].score;
            }
        }
        if (Gestures[name] !== PredictionService._lastGesture){
            PredictionService._lastGesture = Gestures[name];
            PredictionService._sameCount = 0;
        }else{
            PredictionService._sameCount++;
        }
        
        if (PredictionService._sameCount >=3){
            console.log(name);
            return Gestures[name];
        }
        
        return Gestures['nothing'];
    }
  
}