// import React from 'react';
import { Alert } from 'react-native';
import APPCONSTANT from '@constant/appConstant';
import * as GeneralAction from '@general/general.action';
import globalsVariables from '@src/constant/globalsVariables';
import Lang from '@src/config/localization';
import { store } from '../reducers';


const TAG = "===API==="
export const API = {
    getVideoList: (isHeaderRequired, onResponse) => {
        request(onResponse, '', APPCONSTANT.METHOD.GET, 'JSON', isHeaderRequired, APPCONSTANT.BASE_URL_VIDEO + APPCONSTANT.API.VIDEO, buildHeader());
    },
    getStripesList: (isHeaderRequired, onResponse) => {
        request(onResponse, '', APPCONSTANT.METHOD.GET, 'JSON', isHeaderRequired, APPCONSTANT.BASE_URL_STRIPS + APPCONSTANT.API.STRIPS, buildHeader());
    },
};

export const buildHeader = (isMultipart = false, headerParams = {}) => {
    // console.log(TAG, "isAuthorization", isAuthorization);
    // console.log(TAG, "isMultipart", isMultipart);
    // console.log(TAG, "accessToken token", store.getState() && store.getState().auth && store.getState().auth.accessToken)
    let header = {
        'Accept': 'application/json',
        'Content-Type': (isMultipart) ? 'multipart/form-data' : 'application/json',
    }
    Object.assign(header, headerParams);
    return header;
}

/**----------------------------------------------------------------------------
 * @param {*} onResponse -> Response callback
 * @param {*} data -> body data for POST request
 * @param {*} type -> GET, POST etc.
 * @param {*} returnType -> JSON or TEXT
 * @param {*} isHeaderRequired -> Boolean 
 * @param {*} featureURL -> URL 
 * @param {*} secureRequest -> Boolean
 * ----------------------------------------------------------------------------
 */
async function request(onResponse, data, type, returnType, isHeaderRequired, featureURL, secureRequest) {
    let response;
    let responseJSON;
    console.log(TAG, "featureURL >>> " + featureURL);
    console.log(TAG, "secureRequest " + JSON.stringify(secureRequest));
    console.log(TAG, "data >>> " + JSON.stringify(data));
    console.log(TAG, "returnType " + returnType);
    console.log(TAG, "isHeaderRequired " + isHeaderRequired);
    console.log(TAG, "type " + type);
    if (globalsVariables.isInternetConnected) {
        try {
            if (type === 'GET') {
                if (isHeaderRequired) {
                    // Request Call get with Header
                    response = await fetch(featureURL, {
                        method: type,
                        headers: secureRequest,
                    });
                }
                else {
                    // Request Call get without header
                    response = await fetch(featureURL, {
                        method: type,
                    });
                }
            } else {
                // Request Call PUT with header
                response = await fetch(featureURL, {
                    method: type,
                    headers: secureRequest,
                    body: JSON.stringify(data)
                });
            }
            let tokenAvailable = store.getState() && store.getState().auth && store.getState().auth.accessToken || undefined
            if (response.status === 200 || response.status === 204) {
                if (returnType === 'TEXT') {
                    responseJSON = await response.text();
                }
                else {
                    responseJSON = await response.json();
                }
                // console.log(TAG, "ResponseJSON 200: " + JSON.stringify(responseJSON));
                onResponse.success(responseJSON)
            } else if (response.status === 422) {
                console.log(TAG, "ResponseJSON 422: " + JSON.stringify(responseJSON));
                if (returnType === 'TEXT') {
                    responseJSON = await response.text();
                }
                else {
                    responseJSON = await response.json();
                }
                onResponse.successError(responseJSON, response.status);
                // Alert.alert(Lang.appName, responseJSON.error.message)
                store.dispatch(GeneralAction.setLoadingIndicator(false));
            } else if ((tokenAvailable != undefined) && (response.status === 403)) {
                Alert.alert(Lang.appName, Lang.commonMessage.k_not_allowed_to_perform_operation)
                store.dispatch(GeneralAction.setLoadingIndicator(false));
            } else if ((tokenAvailable != undefined) && (response.status === 401)) {
                // Navigate to login from here
                store.dispatch(GeneralAction.setLoadingIndicator(false));
            } else if ((response.status === 500)) {
                onResponse.error({ message: 'Something went wrong.' }, response.status);
            } else if ((response.status === 504)) {
                onResponse.error({ message: 'Request timed out.' }, response.status);
            }
            else {
                // onResponse error
                onResponse.error(responseJSON, response.status);
            }
            if (onResponse.complete) {
                // onResponse complete
                onResponse.complete();
            }
        } catch (error) {
            // console.log(TAG, "onResponse catch error " + error);
            onResponse.error(error);
        }
    } else {
        store.dispatch(GeneralAction.setLoadingIndicator(false));
        Alert.alert(Lang.appName, Lang.commonMessage.k_no_internet_connection, [
            {
                text: Lang.ok, onPress: () => { }, style: 'cancel'
            }
        ]);
    }
}