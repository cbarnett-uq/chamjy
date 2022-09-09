import * as tfjs from '@tensorflow/tfjs';
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import HandPoseService from './handPoseService';

// Model data, must use require statement not import or will not
// load as assets.
const gesturesModel = require('../../model/model.json');
const gesturesWeights = require('../../model/weights.bin');

/**
 * Singleton service for predicting current gesture based on
 * the hand pose input.
 */
export default class GesturesService {
    static _model;
    static _ready = false;

    /**
     * Initialises the gesture service by loading the model.
     */
    static async init() {
        if (GesturesService._ready) return;

        try {
            GesturesService._model = await tfjs.loadLayersModel(
                bundleResourceIO(gesturesModel, gesturesWeights));
            GesturesService._ready = true;
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
        await GesturesService.init();

        while (!GesturesService._ready) {
            await GesturesService._timeout(1);
        }
    }

    /**
     * Gets the current gesture input based on a given handpose.
     * @param { any } pose Hand pose data returned from mediapipe. 
     * @returns Gesture { Nothing, Play, Pause }
     */
    static async predict() {
        if (!GesturesService._ready) throw "GestureService is not ready.";

        let pose = HandPoseService.getTensor();

        var result = await GesturesService._model
            .predict(pose)
            .data();

        return GesturesService._mapResultToGesture(result);
    }

    /**
     * Maps the output prediction to the relevant gesture.
     */
    static _mapResultToGesture(data) {
        let index = 0;
        let max = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i] > max) {
                index = i;
                max = data[i];
            }
        }
        
        return index;
    }
}