import React from 'react';
import RequestMatcher from "../components/RequestMatcher";
import Grid from './Grid';
import {parse} from 'query-string'

let queryString = parse(window.location.href.split('?').pop());
if (!queryString.host || !queryString.port) {
    queryString = undefined;
}
const App = () => (
    <div>
        <RequestMatcher queryString={queryString}/>
        <Grid/>
    </div>
);

export default App
