import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';


/**
 * Singleton service class to turn image data into hand positions
 * in 3d space using mediapipe.
 */
export default class HandPoseService {
    static _ready = false;
    static _detector;

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
    static async predict(tensor) {
        if (!HandPoseService._ready) throw "Hand pose service is not ready.";

        try {
            const result = await HandPoseService._detector
                .estimateHands(tensor);
            return result;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}