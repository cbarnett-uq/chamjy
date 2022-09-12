import { GestureEstimator} from 'fingerpose';
import HandPoseService from './handPoseService';
import { Gestures, GestureDefinition } from './types';
import GesturesService from './gesturesService';

/**
 * Defines the minimum prediction confidence used by fingerpose
 * to detect a static gesture. Range [0, 10].
 */
const StaticPredictionConfidenceThreshold = 8.5;

/**
 * Singleton service for predicting current gesture based on
 * the hand pose input.
 */
export default class PredictionService{
    static _model;
    static _ready = false;


    /**
     * Initialises the gesture service by loading the model.
     */
    static async init() {
        
        if (PredictionService._ready) return;

        try {
            PredictionService._model = new GestureEstimator([
                GestureDefinition.pause
            ]);
            PredictionService._ready = true;

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

    static async predict() {
        if (!PredictionService._ready) throw "PredictionService is not ready.";
        var result = PredictionService._predictStatic();
        //if (result !== Gestures["nothing"]) return result;
        return GesturesService.predictDynamic();
    }
    
    /**
     * Returns the predicted gesture using fingerpose for static
     * gestures. Must meet minimum confidence threshold.
     */
    static async _predictStatic() {
        if (!PredictionService._ready) throw "PredictionService is not ready.";

        let pose = HandPoseService.getLastFrame();
        if (pose.length == 0) return Gestures["nothing"];

        var landmarks = pose[0].keypoints3D
            .map((x) => { return [x.x, x.y, x.z]; });
        
        var result = PredictionService._model
            .estimate(landmarks, StaticPredictionConfidenceThreshold);
        GesturesService._update(result.poseData);
        return PredictionService._mapResultToGesture(result);
    }

    /**
     * Maps the highest scoring prediction to the gestures map.
     * @param { any } result    Result from fingerpose prediction
     */
    static _mapResultToGesture(result) {
        var name = "nothing";
        var max = 0;

        for (var i = 0; i < result.gestures.length; i++) {
            if (result.gestures[i].score > max) {
                name = result.gestures[i].name;
                max = result.gestures[i].score;
            }
        }
        return Gestures[name];
    }
  
}