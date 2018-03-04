import {CHANGE} from "redux-form/lib/actionTypes";

const requestFilter = (state = {
}, action) => {
    if (action.type === CHANGE) {
        // let requestMatcher = Object.assign(state, {});
        // requestMatcher[action.meta.field] = action.payload;
        return state;
    }
    return state;
};

export default requestFilter