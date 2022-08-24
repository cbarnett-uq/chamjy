import { StyleSheet } from 'react-native';

/**
 * Service for accessing the stylesheet.
 */
export default class StyleService {
    /**
     * Returns the main layout style sheet for the app.
     */
    getMainStyle() {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }
        });
    }
}