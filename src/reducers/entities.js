import {MESSAGE_RECEIVED} from '../actions'
import {reverse} from 'lodash/array'

const entities = (state = {activeExpectations: [], recordedExpectations: [], recordedRequests: [], logMessages: []}, action) => {
    if (action.type === MESSAGE_RECEIVED && action.entities) {
        return {
            activeExpectations: action.entities.activeExpectations ? action.entities.activeExpectations : [],
            recordedExpectations: action.entities.recordedExpectations ? reverse(action.entities.recordedExpectations) : [],
            recordedRequests: action.entities.recordedRequests ? reverse(action.entities.recordedRequests) : [],
            logMessages: action.entities.logMessages ? reverse(action.entities.logMessages) : [],
        }
    }

    return state
};

export default entities