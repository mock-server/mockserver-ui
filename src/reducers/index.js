import {combineReducers} from 'redux'
import {createForms} from 'react-redux-form';
import {reducer as form} from 'redux-form'
import entities from './entities'
import requestFilter from "./requestFilter";

const rootReducer = combineReducers({
    entities,
    requestFilter,
    ...createForms({
        requestMatcher: {},
    }),
    form
});

export default rootReducer