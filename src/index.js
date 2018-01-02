import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
// import './css/prettify.css'
// import './css/main.css'

const store = configureStore()

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
)
