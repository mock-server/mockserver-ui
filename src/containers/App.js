import React from 'react'
import RequestMatcher from "../components/RequestMatcher"
import ExpectationList from '../containers/ExpectationList'

const App = () => (
    <div>
        <RequestMatcher/>
        <ExpectationList/>
    </div>
);

export default App
