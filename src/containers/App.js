import React from 'react';
import RequestMatcher from "../components/RequestMatcher";
import Grid from './Grid';

const App = () => (
    <div>
        <RequestMatcher host={window.location.hostname} port={window.location.port ? window.location.port : window.location.protocol === "https:" ? 443 : 80}/>
        <Grid/>
    </div>
);

export default App
