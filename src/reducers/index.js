import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import entities from './entities'
import requestFilter from "./requestFilter";

const rootReducer = combineReducers({
    requestFilter,
    entities,
    form,
});

export default rootReducer