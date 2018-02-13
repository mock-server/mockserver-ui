import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import socket from '../middleware/socket'
import rootReducer from '../reducers'

const configureStore = preloadedState => {
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunk, socket, createLogger())
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            store.replaceReducer(rootReducer)
        })
    }

    return store
};

export default configureStore
