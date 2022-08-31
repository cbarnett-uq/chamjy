import { GestureEstimator } from 'fingerpose';
import { Gestures, GestureDefinition } from './types';
import * as tfjs from '@tensorflow/tfjs';
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

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
            GesturesService._model = new GestureEstimator([
                GestureDefinition.play,
                GestureDefinition.pause
            ]);
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
    static async getGesture(pose) {
        if (!GesturesService._ready) throw "GestureService is not ready.";

        // TODO: Handle inputing pose data into gestures model.
        if (pose.length == 0) return 2;

        var landmarks = pose[0].keypoints3D
            .map((x) => { return [x.x, x.y, x.z]; });
        
        var result = GesturesService._model
            .estimate(landmarks, 8.5);

        // TODO: Handle result to convert into Gestures object.
        return GesturesService._mapResultToGesture(result);
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