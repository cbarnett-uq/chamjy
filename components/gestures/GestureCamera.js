import React from 'react';
import { View, Text } from 'react-native';
import { cameraWithTensors } from './camera/camera_stream';
import { Camera } from 'expo-camera';
import StyleService from '../../services/StyleService';
import * as tf from '@tensorflow/tfjs';

// Decorator for cameraWithTensors class
const TensorCamera = cameraWithTensors(Camera);

/**
 * Component for detecting gestures using the front mounted camera.
 */
export default class GestureCamera extends React.Component {
    /**
     * Constructor for GestureCamera that passes props and injects
     * necessary services.
     * @param {Object} props Properties for this omponent.
     */
    constructor(props) {
        super(props);
        this.props = props;

        // Services
        this.style = (new StyleService()).getMainStyle();
        // TODO: Inject service for gesture recognition here

        // Initial state
        this.state = {
            tfIsReady: false,
            hasPermissions: false
        };
    }

    /**
     * Handles the tensor output from the camera render cycle.
     * @param {any} images Collection of image tensors
     */
    handleCameraStream(images, _1, _2) {
        // TODO: Handle onChange to change state so that
        // this method can break the loop when necessary.
        const loop = async () => {
            const nextImageTensor = images.next().value

            // Call gesture recognition service here
            
            requestAnimationFrame(loop);
        }

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

        // Wait for tensorflow to be ready
        await tf.ready();

        this.setState({
            tfIsReady: true
        });
    }

    /**
     * Determines how to render the component depending on the current state
     * and returns the relevant components.
     * @returns Child components to render.
     */
    render() {
        // Get texture dimensions
        let textureDims;
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

        if (this.state.tfIsReady) {
            return (
                <View style={this.style.cameraContainer}>
                    <TensorCamera
                        type={Camera.Constants.Type.front}
                        style={this.style.camera}
                        cameraTextureHeight={textureDims.height}
                        cameraTextureWidth={textureDims.width}
                        resizeHeight={200}
                        resizeWidth={152}
                        resizeDepth={3}
                        onReady={this.handleCameraStream}
                        autorender={true}/>
                </View>
            );
        } else if (this.state.hasPermissions) {
            return (
                <View>
                    <Text style={this.style.contrastText}>
                        Preparing...
                    </Text>
                </View>
            );
        } else {
            return (
                <View>
                    <Text style={this.style.contrastText}>
                        Needs camera permissions.
                    </Text>
                </View>
            );
        }
    }
}