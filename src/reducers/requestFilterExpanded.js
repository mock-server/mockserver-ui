import {FILTER_EXPANDED} from "../actions";

const requestFilterExpanded = (state = false, action) => {
    if (action.type === FILTER_EXPANDED) {
        return action.expanded;
    }
    return state;
};

export default requestFilterExpanded