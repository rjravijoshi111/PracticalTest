/* eslint-disable eqeqeq */
// /* eslint-disable prefer-destructuring */
import { Dimensions, PermissionsAndroid, ToastAndroid } from 'react-native';
import globalsVariables from '@constant/globalsVariables';
import Language from '@src/config/localization';
import ImagePicker from 'react-native-image-crop-picker';

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

export const openImagePicker = async () => {
    return new Promise((resolve, reject) =>{
        ImagePicker.openPicker({
            cropping: true,
            width: globalsVariables.width,
            height: globalsVariables.width
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            console.log('ImagePicker openPicker Error: ', error)
            reject(error)
        });
    })
}

export const openCamera = async () => {
    return new Promise((resolve, reject) =>{
        requestCameraPermission({
            success: (response) => {
                if (response === PermissionsAndroid.RESULTS.GRANTED) {
                    
                    ImagePicker.openCamera({
                        cropping: true,
                        width: globalsVariables.width,
                        height: globalsVariables.width
                    }).then((response) => {
                        resolve(response)
                    }).catch((error) => {
                        console.log('ImagePicker openCamera Error: ', error)
                        reject(error)
                    });
    
                } else if (response === PermissionsAndroid.NEVER_ASK_AGAIN) {
                    ToastAndroid.show('Need camera permission!', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Camera Permission required to upload image', ToastAndroid.SHORT);
                }
            }
        })
    })
}
