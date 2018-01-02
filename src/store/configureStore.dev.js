import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import api from '../middleware/api'
import socket from '../middleware/socket'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

const configureStore = preloadedState => {
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(thunk, api, socket, createLogger()),
            DevTools.instrument()
        )
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            store.replaceReducer(rootReducer)
        })
    }

    return store
}

export default configureStore
