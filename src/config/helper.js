/* eslint-disable eqeqeq */
// /* eslint-disable prefer-destructuring */
import { Dimensions, PermissionsAndroid } from 'react-native';
import globalsVariables from '@constant/globalsVariables';
import Language from '@src/config/localization';

export const widthPercentage = pixel => {
    const screenWidth = Dimensions.get('window').width;
    return screenWidth * (((pixel * 100) / screenWidth) / 100);
};

export const heightPercentage = pixel => {
    const screenHeight = Dimensions.get('window').height;
    return screenHeight * (((pixel * 100) / screenHeight) / 100);
};

/**
 * Requesting permission for camera
 * @param {function} callback 
 */
export const requestCameraPermission = async (callback) => {
    const { cameraPermissionTitle, cameraPermissionMessage, askMeLater, cancel, ok } = Language;
    if (globalsVariables.OS === 'ios') {
        callback.success(PermissionsAndroid.RESULTS.GRANTED)
    } else {
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: cameraPermissionTitle,
                message: cameraPermissionMessage,
                buttonNeutral: askMeLater,
                buttonNegative: cancel,
                buttonPositive: ok,
            },
        ).then((response) => {
            callback.success(response)
        }).catch((err) => {
            console.warn(err);
        })
    }
}
