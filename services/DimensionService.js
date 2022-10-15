import { Dimensions } from 'react-native';

export default class DimensionService {
    static getMinDimension = () => {
        const { height, width } = Dimensions.get('screen');
        const min = Math.min(height, width);
        return min;
    }

    static getMaxDimension = () => {
        const { height, width } = Dimensions.get('screen');
        const max = Math.max(height, width);
        return max;
    }

    static getOrientaetion = () => {
        const { height, width } = Dimensions.get('screen');
        if (height > width) {
            return "verticle"
        } else {
            return "horizontal"
        }
    }
}