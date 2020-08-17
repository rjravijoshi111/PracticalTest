export const SET_USER_PROFILE_IMAGE = 'SET_USER_PROFILE_IMAGE';
export const SET_VIDEO_LIST_ITEM = 'SET_VIDEO_LIST_ITEM';
export const UPDATE_VIDEO_LIST_FLAG = 'UPDATE_VIDEO_LIST_FLAG';
export const UPDATE_IS_LIST_REFRESHING_FLAG = 'UPDATE_IS_LIST_REFRESHING_FLAG';
export const UPDATE_IS_PAGINATION_FLAG = 'UPDATE_IS_PAGINATION_FLAG';

// ************************************** Action Creator ************************************************/

export const setUserProfileImage = value => {
    return {
        type: SET_USER_PROFILE_IMAGE,
        payload: value
    };
};

export const setVideoListItems = value => {
    return {
        type: SET_VIDEO_LIST_ITEM,
        payload: value
    };
};

export const updateVideoListFlag = value => {
    return {
        type: UPDATE_VIDEO_LIST_FLAG,
        payload: value
    };
};

export const setIsRefreshingFlag = flag => {
    return {
        type: UPDATE_IS_LIST_REFRESHING_FLAG,
        payload: flag
    };
}

export const setIsPaginationCallFlag = flag => {
    return {
        type: UPDATE_IS_PAGINATION_FLAG,
        payload: flag
    };
}
