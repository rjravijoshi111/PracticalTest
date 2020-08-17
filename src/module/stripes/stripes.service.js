import { Alert } from 'react-native';
import { API } from "@config/api.js";
import * as GeneralAction from "@general/general.action";
import * as StripesAction from "@stripes/stripes.action";
import Lang from "@config/localization"

export const TAG = "== stripes.service.js :";

/*
 * Get Video List from API
 */
export const getStripesList = () => async (dispatch) => {
    dispatch(GeneralAction.setLoadingIndicator(true));
    return API.getStripesList(true, {
        success: (response) => {
            dispatch(GeneralAction.setLoadingIndicator(false));
            response.forEach(element => {
                element.selectedValue = ''
                element.colorValue = element.values[2].color
                element.values.map((item) => {
                    item.isSelected = false
                })
            });
            dispatch(StripesAction.setStripeListItems(response))
        },
        successError: (sErr) => {
            dispatch(GeneralAction.setLoadingIndicator(false));
            Alert.alert(Lang.appName, sErr.error.message);
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


