import {MESSAGE_RECEIVED} from '../actions'

const entities = (state = {
    activeExpectations: [],
    recordedExpectations: [],
    recordedRequests: [],
    logMessages: []
}, action) => {
    if (action.type === MESSAGE_RECEIVED && action.entities) {
        return {
            activeExpectations: action.entities.activeExpectations ? action.entities.activeExpectations : [],
            recordedExpectations: action.entities.recordedExpectations ? action.entities.recordedExpectations : [],
            recordedRequests: action.entities.recordedRequests ? action.entities.recordedRequests : [],
            logMessages: action.entities.logMessages,
            logMessageMaxWidth: 150
        };
    }
    return state;
};

export default entities