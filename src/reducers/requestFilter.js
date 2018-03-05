import {CHANGE, BLUR, FOCUS} from "redux-form/lib/actionTypes";

const requestFilter = (state = {}, action) => {
    const formValues = action.getState && action.getState().form.requestFilter && action.getState().form.requestFilter.values;
    if (action.type === CHANGE || action.type === BLUR || action.type === FOCUS) {
        let requestFilter = {};
        if (formValues && formValues.enabled) {
            requestFilter = {
                method: formValues.method,
                path: formValues.path,
                keepAlive: formValues.keepAlive ? true : undefined,
                secure: formValues.secure ? true : undefined,
                headers: [],
                queryStringParameters: [],
                cookies: [],
            };
            for (let header of formValues.headers) {
                if (header.name && header.values) {
                    requestFilter.headers.push(header);
                }
            }
            for (let cookie of formValues.cookies) {
                if (cookie.name && cookie.value) {
                    requestFilter.cookies.push(cookie);
                }
            }
            for (let param of formValues.queryStringParameters) {
                if (param.name && param.values) {
                    requestFilter.queryStringParameters.push(param);
                }
            }
        }
        // ISSUE TRIGGER BEFORE CHANGE IS APPLIED
        // TODO(1) add onChange function to form that trigger an action that
        // TODO(2) triggers this reducers to delay when the reducer fires to after change is applied
        console.log(action.type + " - " + JSON.stringify(requestFilter, undefined, 2));
        return requestFilter;
    }
    return state;
};

export default requestFilter