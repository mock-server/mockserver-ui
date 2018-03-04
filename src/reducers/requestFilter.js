import {CHANGE} from "redux-form/lib/actionTypes";

const requestFilter = (state = {}, action) => {
    const formValues = action.getState && action.getState().form.requestFilter && action.getState().form.requestFilter.values;
    if (action.type === CHANGE) {
        let requestFilter = {};
        if (formValues.enabled) {
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
        return requestFilter;
    }
    return state;
};

export default requestFilter