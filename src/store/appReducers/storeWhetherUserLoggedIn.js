import { actionTypes } from "../actionTypes";

const initialState = {
    flag: false,
};

export const storeWhetherUserLoggedIn = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.IS_LOGGED_IN:
            return {
                ...state,
                flag : action.payload.flag,
            }
        default:
            return state
    }
};
