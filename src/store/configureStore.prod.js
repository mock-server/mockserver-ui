import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import socket from '../middleware/socket'
import rootReducer from '../reducers'

const configureStore = preloadedState => {
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunk, socket)
    );

    return store
};

export default configureStore
