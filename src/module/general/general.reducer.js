import {
    SET_LOADING_INDICATOR,
    SET_IS_APP_FIRST_TIME_OPEN,
    SET_PROGRESS_LOADER,
    SET_INDICATOR_PROGRESS,
    SET_NAVIGATION_REF
} from './general.action';

const INITIAL_STATE = {
    isLoading: false,
    isAppFirstTimeOpen: true,
    showProgressLoader: false,
    progress: 0,
    isDrawerOpen: false,
    navigationRef: null
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LOADING_INDICATOR:
            return {
                ...state,
                isLoading: action.payload
            };

        case SET_IS_APP_FIRST_TIME_OPEN:
            return {
                ...state,
                isAppFirstTimeOpen: action.payload
            };

        case SET_PROGRESS_LOADER:
            return {
                ...state,
                showProgressLoader: action.payload
            };

        case SET_INDICATOR_PROGRESS:
            return {
                ...state,
                progress: action.payload,
            };

      
        case SET_NAVIGATION_REF:
            return {
                ...state,
                navigationRef: action.payload,
            };

        default:
            return state;
    }
};



