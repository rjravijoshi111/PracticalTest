export const SET_LOADING_INDICATOR = 'SET_LOADING_INDICATOR';
export const SET_IS_APP_FIRST_TIME_OPEN = 'SET_IS_APP_FIRST_TIME_OPEN';
export const SET_PROGRESS_LOADER = 'SET_PROGRESS_LOADER';
export const SET_INDICATOR_PROGRESS = 'SET_INDICATOR_PROGRESS';
export const SET_NAVIGATION_REF = 'SET_NAVIGATION_REF';

/** ************************************ Action Creator *********************************************** */

export const setLoadingIndicator = isLoading => {
    return {
        type: SET_LOADING_INDICATOR,
        payload: isLoading
    };
}

export const setAppFirstTimeOpen = isAppFirstTimeOpen => {
    return {
        type: SET_IS_APP_FIRST_TIME_OPEN,
        payload: isAppFirstTimeOpen
    };
}

export const setShowProgressLoader = showProgressLoader => {
    return {
        type: SET_PROGRESS_LOADER,
        payload: showProgressLoader
    };
}

export const setIndicatorProgress = (progress, percentage) => {
    return {
        type: SET_INDICATOR_PROGRESS,
        payload: progress,
    };
}

export const setNavigationReference = (navigationRef) => {
    return {
        type: SET_NAVIGATION_REF,
        payload: navigationRef.current,
    };
}
