import * as tfjs from '@tensorflow/tfjs';
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import HandPoseService from './handPoseService';
import { FingerCurls,FingerDirections} from './types';

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
    static _frames = [];

    /**
     * Initialises the gesture service by loading the model.
     */
    static async init() {
        if (GesturesService._ready) return;

        try {
            GesturesService._model = await tfjs.loadLayersModel(
                bundleResourceIO(gesturesModel, gesturesWeights));
            GesturesService._ready = true;
            let frame = [0,0,0,0,0,0,0,0,0,0];
            for (let i = 0; i < 30; i++) {
                GesturesService._frames.push(frame);
            }
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
     * Gets the current gesture input based on a given fingerpose
     * @param { any } pose Finger Pose data returned from fingerpose. 
     * @returns Gesture { Nothing, Play, Pause }
     */
    static async predictDynamic() {
        if (!GesturesService._ready) throw "GestureService is not ready.";
        let pose = GesturesService.getTensor();

        var result = await GesturesService._model
            .predict(pose)
            .data();

        return GesturesService._mapResultToGesture(result);
    }

    /**
     * Maps the output prediction to the relevant gesture.
     */
    static _mapResultToGesture(data) {
        let gesture = 2;
        let max = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i] > max) {
                gesture = i;
                max = data[i];
            }
        }
        return gesture;
    }
    /**
     * Updates frames with latest pose data from fingerpose model.
     * @param { any } poseData from fingerpose estimator 
     */
    static async _update(poseData) {        
        let frame = []
        for (let i = 0; i < 5; i++){
            frame.push(FingerCurls[poseData[i][1]]);
            frame.push(FingerDirections[poseData[i][2]]);
        }

        GesturesService._frames.push(frame);
        GesturesService._frames.shift();
        GesturesService._framecount++;

    }
    /**
     * Returns the last thirty predictions as a tensor.
     */
    static getTensor() {
        return tfjs.tensor([GesturesService._frames]);
    }

}