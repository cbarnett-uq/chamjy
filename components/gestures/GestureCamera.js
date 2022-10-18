import React from 'react';
import { View, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { cameraWithTensors } from './camera/camera_stream';
import { Camera } from 'expo-camera';
import { Colors, StyleService } from '../../services/StyleService';
import * as tf from '@tensorflow/tfjs';
import HandPoseService from '../../services/gestures/handPoseService';
import GesturesService from '../../services/gestures/gesturesService';
import { Gestures } from '../../services/gestures/types';
import PredictionService from '../../services/gestures/predictionService';
import DimensionService from '../../services/DimensionService';
import { detectGLCapabilities } from '@tensorflow/tfjs-react-native';

// Decorator for cameraWithTensors class
const TensorCamera = cameraWithTensors(Camera);

/**
 * Component for detecting gestures using the front mounted camera.
 */
export default class GestureCamera extends React.Component {
    static _lastGesture = Gestures["Nothing"];

    /**
     * Constructor for GestureCamera that passes props and injects
     * necessary services.
     * @param {Object} props Properties for this omponent.
     */
    constructor(props) {
        super(props);
        this.props = props;

        // Initial state
        this.state = {
            ready: false,
            hasPermissions: false,
            rotation: 0
        };

        DimensionService.addListener(() => { this.onRotationEvent() })
    }

    onRotationEvent() {
        if (Platform.OS === 'ios' && Platform.isPad === true) {
            if (DimensionService.getOrientaetion() === "horizontal") {
                this.setState({ rotation: 90 })
            } else {
                this.setState({ rotation: 0 })
            }
        }
    }

    /**
     * Handles the current gesture input as predicted by the trained models.
     * @param { Gestures } gesture 
     */
    handleGesture(gesture) {        
        if (gesture === GestureCamera._lastGesture) return;
        GestureCamera._lastGesture = gesture;

        switch (gesture) {
            case Gestures["nothing"]:
                break;

            case Gestures["pausePlay"]:
                this.onTogglePlay();
                break;
            
            case Gestures["markerA"]:
                this.onMarkerA();
                break;

            case Gestures["markerB"]:
                this.onMarkerB();
                break;

            case Gestures["loop"]:
                this.onLoop();
                break;

            case Gestures["skipTB"]:
                this.onSkipToBeginning();
                break;
            case Gestures["tempoUp"]:
                this.onTempoUp();
                break;
            case Gestures["tempoDown"]:
                this.onTempoDown();
                break;
        }
    }

    /**
     * Handles the tensor output from the camera render cycle.
     * @param {any} images Collection of image tensors
     */
    handleCameraStream(images, updatePreview, gl) {
        const loop = async () => {
            const nextImageTensor = images.next().value

            // Call gesture recognition service here
            try {
                if (await HandPoseService.update(nextImageTensor)) {
                    var gesture = await PredictionService.predict();
                    if (gesture !== null) this.onGesture(gesture);
                }
            } catch (err) {
                console.error(err);
            }
            
            requestAnimationFrame(loop);
        }
        detectGLCapabilities(gl);
        loop();
    }

    /**
     * Called when the component is mounted. Needs to check for permissions
     * and request them if it does not already have them. Will early exit
     * if the user declines. It will then wait for tensorflow to be ready
     * before updating state to render camera.
     */
    async componentDidMount() {
        // Try get permissions to use camera
        let permissions = await Camera.getCameraPermissionsAsync();
        if (!permissions.granted) {
            permissions = await Camera.requestCameraPermissionsAsync();
        }
        if (!permissions.granted) return;

        this.setState({
            hasPermissions: true
        });

        // Wait for services to be ready
        await tf.ready();
        await HandPoseService.ready();
        await GesturesService.ready();
        await PredictionService.ready();

        this.setState({
            ready: true
        });
    }

    getCameraDimensions() {
        var textureDims;
        if (Platform.OS === 'ios') {
            textureDims = {
                height: 1920,
                width: 1080,
            };
        } else {
            textureDims = {
                height: 1200,
                width: 1600,
            };
        }
        return textureDims;
    }

    /**
     * Determines how to render the component depending on the current state
     * and returns the relevant components.
     * @returns Child components to render.
     */
    render() {
        // Get texture dimensions

        if (this.state.ready) {
            return (
                <View style={StyleService.camera.container}>
                    <TensorCamera
                        type={Camera.Constants.Type.front}
                        style={StyleService.camera.camera}
                        cameraTextureHeight={this.getCameraDimensions.height}
                        cameraTextureWidth={this.getCameraDimensions.width}
                        resizeHeight={1200}
                        resizeWidth={912}
                        resizeDepth={3}
                        onReady={this.handleCameraStream}
                        onGesture={this.handleGesture}
                        onTogglePlay={this.props.onTogglePlay}
                        onMarkerA={this.props.onMarkerA}
                        onMarkerB={this.props.onMarkerB}
                        onLoop={this.props.onLoop}
                        onSkipToBeginning={this.props.onSkipToBeginning}
                        autorender={true}
                        rotation={this.state.rotation}
                        onTempoUp={this.props.onTempoUp}
                        onTempoDown={this.props.onTempoDown}/>
                </View>
            );
        } else {
            return (
                <View style={StyleService.camera.container}>
                    <ActivityIndicator
                        size='large'
                        color={Colors.primary.mid}/> 
                </View>
            )
        }
    }
}