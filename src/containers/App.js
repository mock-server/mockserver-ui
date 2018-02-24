import React, {Component} from 'react';
import RequestMatcher from "../components/RequestMatcher";
import Grid from './Grid';
import {parse} from 'query-string';

export default class App extends Component {
    host() {
        if (window.location.search && parse(window.location.search).host) {
            return parse(window.location.search).host;
        } else if (window.location.hostname) {
            return window.location.hostname;
        }
        return window.location.hostname;
    }

    port() {
        if (window.location.search && parse(window.location.search).port) {
            return parse(window.location.search).port;
        } else if (window.location.port) {
            return window.location.port;
        } else if (window.location.protocol === "https:") {
            return 443;
        } else {
            return 80;
        }
    }

    render() {
        return (<div>
            <RequestMatcher host={this.host()} port={this.port()}/>
            <Grid/>
        </div>)
    }
}
