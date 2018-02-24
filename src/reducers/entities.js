import {MESSAGE_RECEIVED} from '../actions'
import {reverse} from 'lodash/array'

const entities = (state = {
    activeExpectations: [],
    recordedExpectations: [],
    recordedRequests: [],
    logMessages: []
}, action) => {
    let httpRequest;
    if (action.type === MESSAGE_RECEIVED && action.entities) {
        const logMessages = (action.entities.logMessages ? reverse(action.entities.logMessages) : []).map((logMessage) => {
            const value = JSON.parse(logMessage.value);
            if (value.messageFormat.indexOf("request:{}didn't match expectation:{}because:{}") !== -1) {
                if (httpRequest && JSON.stringify(httpRequest) === JSON.stringify(value.httpRequest)) {
                    value.messageFormat = " {}didn't match expectation:{}because:{}";
                    value.arguments[0] = "";
                    value.timeStamp = "";
                }
                httpRequest = value.httpRequest;
            } else {
                httpRequest = undefined;
            }
            return {
                key: logMessage.key,
                value: value
            };
        });
        return {
            activeExpectations: action.entities.activeExpectations ? action.entities.activeExpectations : [],
            recordedExpectations: action.entities.recordedExpectations ? reverse(action.entities.recordedExpectations) : [],
            recordedRequests: action.entities.recordedRequests ? reverse(action.entities.recordedRequests) : [],
            logMessages: logMessages,
        }
    }

    return state
};

export default entities