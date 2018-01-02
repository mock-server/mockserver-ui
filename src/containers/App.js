import React from 'react'
import RequestMatcher from "../components/RequestMatcher"
import ExpectationList from '../containers/ExpectationList'
// import DevTools from '../containers/DevTools'

const App = () => (
    <div>
        <RequestMatcher/>
        <ExpectationList/>
        {/*<DevTools/>*/}
    </div>
)

export default App
