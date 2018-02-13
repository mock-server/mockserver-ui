import {MESSAGE_RECEIVED} from '../actions/socket'

const entities = (state = {activeExpectations: [], recordedExpectations: [], recordedRequests: [], logMessages: []}, action) => {
    if (action.type === MESSAGE_RECEIVED && action.entities) {
        return Object.assign({
            activeExpectations: [],
            recordedExpectations: [],
            recordedRequests: [],
            logMessages: []
        }, action.entities)
    }

    return state
};

export default entities