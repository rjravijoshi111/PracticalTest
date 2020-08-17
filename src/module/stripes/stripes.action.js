export const SET_STRIPE_LIST_ITEM = 'SET_STRIPE_LIST_ITEM';

// ************************************** Action Creator ************************************************/

export const setStripeListItems = value => {
    return {
        type: SET_STRIPE_LIST_ITEM,
        payload: value
    };
};

