import { Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');

const globalsVariables = {
    isInternetConnected: false,
    height,
    width,
    OS: Platform.OS,
    isIphoneX: !!(Platform.OS === 'ios' && (height > 800 || width > 800))
};

export default globalsVariables;
