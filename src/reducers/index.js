import {combineReducers} from 'redux'
import entities from './entities'
import errorMessage from './errorMessage'
import {createForms} from 'react-redux-form';

const rootReducer = combineReducers({
    entities,
    errorMessage,

    ...createForms({
        requestMatcher: {},
    }),
});

export default rootReducer