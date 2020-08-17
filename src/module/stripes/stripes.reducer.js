/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import {
    SET_STRIPE_LIST_ITEM,
} from './stripes.action';

const INITIAL_STATE = {
    stripesList: [],
    updateListFlag: false,
    isRefreshing: false,
    isPaginationCall: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_STRIPE_LIST_ITEM:
            return {
                ...state,
                stripesList: action.payload,
            };

        default:
            return state;
    }
};