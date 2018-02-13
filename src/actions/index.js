import {RETRIEVE} from '../middleware/api'

export const ACTIVE_EXPECTATIONS_REQUEST = 'ACTIVE_EXPECTATIONS_REQUEST';
export const ACTIVE_EXPECTATIONS_SUCCESS = 'ACTIVE_EXPECTATIONS_SUCCESS';
export const ACTIVE_EXPECTATIONS_FAILURE = 'ACTIVE_EXPECTATIONS_FAILURE';

const fetchActiveExpectations = requestMatcher => ({
    [RETRIEVE]: {
        types: [ACTIVE_EXPECTATIONS_REQUEST, ACTIVE_EXPECTATIONS_SUCCESS, ACTIVE_EXPECTATIONS_FAILURE],
        actionType: 'ACTIVE_EXPECTATIONS',
        requestMatcher: requestMatcher
    }
});

export const loadActiveExpectations = () => (dispatch, getState) => {
    return dispatch(fetchActiveExpectations(getState().requestMatcher))
};

export const RECORDED_EXPECTATIONS_REQUEST = 'RECORDED_EXPECTATIONS_REQUEST';
export const RECORDED_EXPECTATIONS_SUCCESS = 'RECORDED_EXPECTATIONS_SUCCESS';
export const RECORDED_EXPECTATIONS_FAILURE = 'RECORDED_EXPECTATIONS_FAILURE';

const fetchRecordedExpectations = requestMatcher => ({
    [RETRIEVE]: {
        types: [RECORDED_EXPECTATIONS_REQUEST, RECORDED_EXPECTATIONS_SUCCESS, RECORDED_EXPECTATIONS_FAILURE],
        actionType: 'RECORDED_EXPECTATIONS',
        requestMatcher: requestMatcher
    }
});

export const loadRecordedExpectations = () => (dispatch, getState) => {
    return dispatch(fetchRecordedExpectations(getState().requestMatcher))
};

export const REQUESTS_REQUEST = 'REQUESTS_REQUEST';
export const REQUESTS_SUCCESS = 'REQUESTS_SUCCESS';
export const REQUESTS_FAILURE = 'REQUESTS_FAILURE';

const fetchRequests = requestMatcher => ({
    [RETRIEVE]: {
        types: [REQUESTS_REQUEST, REQUESTS_SUCCESS, REQUESTS_FAILURE],
        actionType: 'REQUESTS',
        requestMatcher: requestMatcher
    }
});

export const loadRequests = () => (dispatch, getState) => {
    return dispatch(fetchRequests(getState().requestMatcher))
};

export const LOGS_REQUEST = 'LOGS_REQUEST';
export const LOGS_SUCCESS = 'LOGS_SUCCESS';
export const LOGS_FAILURE = 'LOGS_FAILURE';

const fetchLogs = requestMatcher => ({
    [RETRIEVE]: {
        types: [LOGS_REQUEST, LOGS_SUCCESS, LOGS_FAILURE],
        actionType: 'LOGS',
        requestMatcher: requestMatcher
    }
});

export const loadLogs = () => (dispatch, getState) => {
    return dispatch(fetchLogs(getState().requestMatcher))
};

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    actionType: RESET_ERROR_MESSAGE
});
