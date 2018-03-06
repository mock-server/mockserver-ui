import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import entities from './entities'
import requestFilterExpanded from "./requestFilterExpanded";

const rootReducer = combineReducers({
    entities,
    form,
    requestFilterExpanded,
});

export default rootReducer