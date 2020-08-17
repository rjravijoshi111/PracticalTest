/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import {
    SET_USER_PROFILE_IMAGE,
    SET_VIDEO_LIST_ITEM,
    UPDATE_VIDEO_LIST_FLAG,
    UPDATE_IS_LIST_REFRESHING_FLAG,
    UPDATE_IS_PAGINATION_FLAG
} from './myHome.action';

const INITIAL_STATE = {
    userProfileImage: undefined,
    videoList: [],
    updateListFlag: false,
    isRefreshing: false,
    isPaginationCall: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_USER_PROFILE_IMAGE:
            return {
                ...state,
                userProfileImage: action.payload,
            };

        case SET_VIDEO_LIST_ITEM:
            return {
                ...state,
                videoList: action.payload,
            };

        case UPDATE_VIDEO_LIST_FLAG:
            return {
                ...state,
                updateListFlag: action.payload,
            };

        case UPDATE_IS_LIST_REFRESHING_FLAG:
            return {
                ...state,
                isRefreshing: action.payload,
            };

        case UPDATE_IS_PAGINATION_FLAG:
            return {
                ...state,
                isPaginationCall: action.payload,
            };

        default:
            return state;
    }
};