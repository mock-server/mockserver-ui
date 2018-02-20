import React from 'react';
import RequestMatcher from "../components/RequestMatcher";
import Grid from './Grid';
import {parse} from 'query-string'

const App = () => (
    <div>
        <RequestMatcher queryString={parse(window.location.href.split('?').pop())}/>
        <Grid/>
    </div>
);

export default App
