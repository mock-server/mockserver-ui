/* eslint-disable no-undef */

import React, {Component} from 'react'
import {Control, Form} from 'react-redux-form';
import PropTypes from "prop-types";
import {connectSocket, disconnectSocket, requestMatcherUpdate, sendMessage} from "../actions/socket";
import {connect} from "react-redux";

const loadData = ({requestMatcher = {}, sendMessage}) => {
    let requestFilter = {};
    if (requestMatcher.filter) {
        Object.assign(requestFilter, requestMatcher);
        delete requestFilter.filter
    }
    sendMessage(requestFilter, "127.0.0.1", "1080")
};

class RequestMatcher extends Component {
    static propTypes = {
        requestMatcher: PropTypes.object.isRequired,
        requestMatcherUpdate: PropTypes.func.isRequired,
        connectSocket: PropTypes.func.isRequired,
        sendMessage: PropTypes.func.isRequired,
        disconnectSocket: PropTypes.func.isRequired
    };

    componentWillMount() {
        loadData(this.props)
    }

    componentWillUnmount() {
        this.props.disconnectSocket()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.requestMatcher !== this.props.requestMatcher) {
            loadData(nextProps)
        }
    }

    render() {
        return (
            <Form model="requestMatcher" style={{
                borderBottomStyle: "dashed",
                borderBottomWidth: "1px",
                paddingBottom: "10px",
                marginBottom: "10px"
            }}>
                <div style={{
                    display: "inline",
                    paddingRight: "10px",
                }}>
                    <label htmlFor=".filter">Filter:</label>
                    <Control.checkbox model=".filter" id=".filter"/>
                </div>

                <div style={{
                    display: "inline",
                    paddingRight: "10px",
                }}>
                    <label className={!this.props.requestMatcher.filter ? "disabled" : "enabled"} htmlFor=".method">Method:</label>
                    <Control.select disabled={!this.props.requestMatcher.filter} model=".method" id=".method">
                        <option value=""></option>
                        <option value="CONNECT">CONNECT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="GET">GET</option>
                        <option value="HEAD">HEAD</option>
                        <option value="OPTIONS">OPTIONS</option>
                        <option value="PATCH">PATCH</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="TRACE">TRACE</option>
                    </Control.select>
                </div>

                <div style={{
                    display: "inline"
                }}>
                    <label className={!this.props.requestMatcher.filter ? "disabled" : "enabled"} htmlFor=".path">Path:</label>
                    <Control.text disabled={!this.props.requestMatcher.filter} model=".path" id=".path"/>
                </div>

                {/* queryStringParameters */}
                {/* headers */}
                {/* cookies */}
                {/*<div>*/}
                    {/*<label htmlFor=".bodyType">Body Type:</label>*/}
                    {/*<Control.select model=".bodyType" id=".bodyType">*/}
                        {/*<option value="BINARY">BINARY</option>*/}
                        {/*<option value="JSON">JSON</option>*/}
                        {/*<option value="JSON_SCHEMA">JSON_SCHEMA</option>*/}
                        {/*<option value="PARAMETERS">PARAMETERS</option>*/}
                        {/*<option value="REGEX">REGEX</option>*/}
                        {/*<option value="STRING">STRING</option>*/}
                        {/*<option value="XML">XML</option>*/}
                        {/*<option value="XML_SCHEMA">XML_SCHEMA</option>*/}
                        {/*<option value="XPATH">XPATH</option>*/}
                    {/*</Control.select>*/}
                {/*</div>*/}
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        requestMatcher = {},
    } = state;

    return {
        requestMatcher
    }
};

export default connect(mapStateToProps, {
    requestMatcherUpdate,
    connectSocket,
    sendMessage,
    disconnectSocket
})(RequestMatcher)