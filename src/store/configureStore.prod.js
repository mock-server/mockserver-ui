import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import rootReducer from '../reducers'
import socket from "../middleware/socket";

const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, api, socket)
);

export default configureStore
