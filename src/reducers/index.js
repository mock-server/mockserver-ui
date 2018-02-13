import {combineReducers} from 'redux'
import entities from './entities'
import {createForms} from 'react-redux-form';

const rootReducer = combineReducers({
    entities,

    ...createForms({
        requestMatcher: {},
    }),
});

export default rootReducer