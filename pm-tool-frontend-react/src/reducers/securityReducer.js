import {SET_CURRENT_USER} from "../actions/types";

const initialState = {
    user: {},
    isAuth: false
};

const booleanActionPayload = (payload) => {
    return !!payload;
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuth: booleanActionPayload(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}