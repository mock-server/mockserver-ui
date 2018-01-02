import {camelize} from 'humps'
import {isString, mapValues, values} from 'lodash'

const API_ROOT = 'https://127.0.0.1:1080/retrieve?format=UI&type='

const callApi = (actionType, requestMatcher) => {
    const fullUrl = API_ROOT + actionType

    return fetch(fullUrl, {
        method: 'PUT',
        body: JSON.stringify(requestMatcher, undefined, 2)
    })
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject({message: 'Response ' + response.status + ' from server for ' + fullUrl})
                }

                const toArrayWithKey = (obj, keyAs) => {
                    return values(
                        mapValues(obj, (value, key) => {
                            if (isString(value)) {
                                value = {
                                    value
                                }
                            }
                            value[keyAs] = key
                            return value
                        })
                    );
                }

                const entities = {}
                entities[camelize(actionType.toLowerCase())] = toArrayWithKey(json, 'key')
                return {entities}
            })
        )
}

// Action key that carries API call info interpreted by this Redux middleware.
export const RETRIEVE = 'Retrieve'

// A Redux middleware that interprets actions with RETRIEVE info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    const retrieveAction = action[RETRIEVE]
    if (typeof retrieveAction === 'undefined') {
        return next(action)
    }

    const {types, actionType, requestMatcher} = retrieveAction

    if (typeof actionType !== 'string') {
        throw new Error('Specify a string actionType.')
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }
    if (typeof requestMatcher !== 'object') {
        throw new Error('Specify an object requestMatcher.')
    }

    const actionWith = data => {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[RETRIEVE]
        return finalAction
    }

    const [requestType, successType, failureType] = types
    next(actionWith({type: requestType}))

    return callApi(actionType, requestMatcher).then(
        response => next(actionWith({
            response: response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || 'Something bad happened'
        }))
    )
}
