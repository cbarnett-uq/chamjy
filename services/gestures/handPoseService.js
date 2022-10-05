import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import * as tfjs from '@tensorflow/tfjs';

/**
 * Singleton service class to turn image data into hand positions
 * in 3d space using mediapipe.
 */
export default class HandPoseService {
    static _ready = false;
    static _detector;
    static _frames = [];
    static _lastFrame = {};
    /**
     * Handles the onResults call from Hands.
     * @param { any } results Result structure returned by Hands.
     */
    static _onResults(results) {
        HandPoseService._result = results;
        HandPoseService._resultReady = true;
    }

    /**
     * Initialises the service. This may be called publicly but will
     * also trigger when ready() is called.
     */
    static async init() {
        if (HandPoseService._ready) return;

        try {
            const _model = handPoseDetection.SupportedModels.MediaPipeHands;
            const _config = {
                runtime: 'tfjs',
                modelType: 'full',
                solutionPath: 'node_modules/@mediapipe/hands'
            };

            HandPoseService._detector = await handPoseDetection.createDetector(_model, _config);

            let frame = HandPoseService._buildEmptyFrame();
            for (let i = 0; i < 30; i++) {
                HandPoseService._frames.push(frame);
            }
            HandPoseService._time = new Date();
            HandPoseService._ready = true;
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
     * Waits for the service to be ready. This method will hang if
     * init() errors.
     */
    static async ready() {
        await HandPoseService.init();

        while (!HandPoseService._ready) {
            await HandPoseService._timeout(1);
        }
    }

    /**
     * Predicts the current handpose from an image tensor.
     * @param { any } tensor Image tensor from the camera.
     */
    static async update(tensor) {
        if (!HandPoseService._ready) throw "Hand pose service is not ready.";

        try {
            const result = await HandPoseService._detector
                .estimateHands(tensor);
            HandPoseService._frames.push(HandPoseService._buildFrameFromResult(result));
            HandPoseService._frames.shift();
            HandPoseService._lastFrame = result;
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    /**
     * Returns the last thirty predictions as a tensor.
     */
    static getTensor() {
        return tfjs.tensor([HandPoseService._frames]);
    }

    /**
     * Returns the last prediction frame with raw data
     * exported by Hands.
     */
    static getLastFrame() {
        return HandPoseService._lastFrame;
    }

    /**
     * Builds a tensor from the data returned by hands.
     */
    static _buildFrameFromResult(data) {
        let result = [];
        
        if (0 < data.length) {
            let hand = HandPoseService._buildHand(data[0]).flat();
            for (let j = 0; j < hand.length; j++) {
                result.push(hand[j]);
            }
        }
        for (let i = data.length; i < 1; i++) {
            let hand = HandPoseService._buildEmptyHand().flat();
            for (let j = 0; j < hand.length; j++) {
                result.push(hand[j]);
            }
        }

        return result;
    }

    /**
     * Builds an empty frame.
     */
    static _buildEmptyFrame() {
        let result = [];


        let hand = HandPoseService._buildEmptyHand().flat();
        for (let j = 0; j < hand.length; j++) {
            result.push(hand[j]);
        }
        

        return result;
    }

    /**
     * Builds an array of 21 vertices from a hand object.
     */
    static _buildHand(hand) {
        let arr = [];
        for (let i = 0; i < 21; i++) {
            let keypoint = hand.keypoints3D[i];
            arr.push([keypoint.x, keypoint.y, keypoint.z]);
        }
        
        return arr;
    }

    /**
     * Builds an array of 21 vertices of (0, 0, 0).
     */
    static _buildEmptyHand() {
        let arr = [];
        for (let i = 0; i < 21; i++)
        {
            arr.push([0, 0, 0]);
        }
        return arr;
    }
}