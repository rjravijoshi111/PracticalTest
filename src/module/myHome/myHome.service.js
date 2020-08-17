import { Alert } from 'react-native';
import { API } from "@config/api.js";
import * as GeneralAction from "@general/general.action";
import * as MyHomeAction from "@myHome/myHome.action";
import Lang from "@config/localization"
import { store } from '../../reducers';

const faker = require('faker');

export const TAG = "== myHome.service.js :";

/*
 * Get Video List from API
 */
export const getVideoList = (isLoadRefresh = false, isPaginationCall = false) => async (dispatch) => {

    if (isLoadRefresh) {
        dispatch(MyHomeAction.setIsRefreshingFlag(true))
    } else if (isPaginationCall) {
        dispatch(MyHomeAction.setIsPaginationCallFlag(true))
    } else {
        dispatch(GeneralAction.setLoadingIndicator(true));
    }

    dispatch(MyHomeAction.updateVideoListFlag(true));
    return API.getVideoList(true, {
        success: (response) => {
            const videoListData = store.getState().myHome.videoList;
            let responseData = response.videos;

            responseData.forEach(element => {
                element.isVideoPlaying = false;
                element.artist = `${faker.name.firstName()} ${faker.name.lastName()}`;
                element.time = Math.floor((Math.random() * 9) + 1)
            });

            if (videoListData.length > 0 && !isLoadRefresh) {
                let tempVideoList = JSON.parse(JSON.stringify(videoListData));
                let concatedData = tempVideoList.concat(responseData)
                dispatch(MyHomeAction.setVideoListItems(concatedData))
                dispatch(MyHomeAction.setIsPaginationCallFlag(false))
            } else {
                dispatch(MyHomeAction.setVideoListItems(responseData))
                dispatch(MyHomeAction.setIsRefreshingFlag(false))
            }

            dispatch(GeneralAction.setLoadingIndicator(false));
            dispatch(MyHomeAction.updateVideoListFlag(false));
        },
        successError: (sErr) => {
            Alert.alert(Lang.appName, sErr.error.message);
            dispatch(GeneralAction.setLoadingIndicator(false));
        },
        error: (err) => {
            dispatch(GeneralAction.setLoadingIndicator(false));
            Alert.alert(Lang.appName, err.message, [
                {
                    text: Lang.ok, onPress: () => { }, style: 'cancel'
                }
            ]);
        }
    });
}
