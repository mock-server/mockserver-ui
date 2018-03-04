import React, {Component} from 'react';
import {Control, Form} from 'react-redux-form';
import PropTypes from "prop-types";
import {connectSocket, disconnectSocket, sendMessage} from "../actions";
import {connect} from "react-redux";
import './form.css';

const extractKeyToMultiValue = function (keyToMultiValue) {
    let result = [];
    for (let index in keyToMultiValue) {
        if (!keyToMultiValue.hasOwnProperty(index)) {
            continue;
        }
        let header = {
            name: keyToMultiValue[index].name,
            values: []
        };
        let values = keyToMultiValue[index].values;
        for (let index in values) {
            if (!values.hasOwnProperty(index)) {
                continue;
            }
            header.values.push(values[index]);
        }
        result.push(header);
    }
    return result;
};

const extractKeyToValue = function (keyToMultiValue) {
    let result = [];
    for (let index in keyToMultiValue) {
        if (!keyToMultiValue.hasOwnProperty(index)) {
            continue;
        }
        let header = {
            name: keyToMultiValue[index].name,
            value: keyToMultiValue[index].value
        };
        result.push(header);
    }
    return result;
};

const loadData = ({host = "127.0.0.1", port = "1080", requestMatcher = {}, sendMessage}) => {
    let requestFilter = {};
    if (requestMatcher.filter) {
        requestFilter = {
            method: requestMatcher.method,
            path: requestMatcher.path,
            keepAlive: requestMatcher.keepAlive,
            secure: requestMatcher.secure,
            headers: extractKeyToMultiValue(requestMatcher.headers),
            queryStringParameters: extractKeyToMultiValue(requestMatcher.queryStringParameters),
            cookies: extractKeyToValue(requestMatcher.cookies),
        };
    }
    sendMessage(requestFilter, host, port)
};

class RequestMatcher extends Component {
    static propTypes = {
        host: PropTypes.string.isRequired,
        port: PropTypes.string.isRequired,
        requestMatcher: PropTypes.object.isRequired,
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
        const {
            requestMatcher = {}
        } = this.props;
        const labelAndField = {
            display: "inline",
            paddingRight: "10px",
        };
        const fieldMargin = "5px";
        const keysAndValuesInnerField = {
            width: "20%",
            margin: fieldMargin
        };
        const basicPropertiesInnerField = {
            width: "25%",
            margin: fieldMargin
        };
        return (
            <Form model="requestMatcher" style={{
                borderBottomStyle: "dashed",
                borderBottomWidth: "1px",
                paddingBottom: "10px",
                marginBottom: "10px",
                display: "table",
                width: "100%",
            }}>
                <div style={{
                    display: "inline"
                }}>
                    <div style={{
                        display: "inline-block",
                        verticalAlign: "bottom",
                        width: "10%",
                    }}>
                        <div style={labelAndField}>
                            <label htmlFor=".filter">Filter:</label>
                            <Control.checkbox style={{
                                margin: fieldMargin
                            }} model=".filter" id=".filter"/>
                        </div>
                    </div>
                    <div style={{
                        display: "inline-block",
                        verticalAlign: "top",
                        width: "90%",
                    }}>
                        <div style={{
                            display: "inline-block",
                            verticalAlign: "top",
                            width: "35%",
                        }}>
                            <div>
                                <div style={labelAndField}>
                                    <label className={!requestMatcher.filter ? "disabled" : "enabled"}
                                    htmlFor=".method">Method:</label>
                                    <Control.select style={basicPropertiesInnerField} disabled={!requestMatcher.filter}
                                    model=".method" id=".method">
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

                                <div style={labelAndField}>
                                    <label className={!requestMatcher.filter ? "disabled" : "enabled"}
                                           htmlFor=".path">Path:</label>
                                    <Control.text style={basicPropertiesInnerField} disabled={!requestMatcher.filter}
                                                  model=".path" id=".path"/>
                                </div>
                            </div>
                            <div>
                                <div style={labelAndField}>
                                    <label className={!requestMatcher.filter ? "disabled" : "enabled"}
                                           htmlFor=".secure">Secure:</label>
                                    <Control.checkbox style={basicPropertiesInnerField}
                                                      className={!requestMatcher.filter ? "disabled" : "enabled"}
                                                      disabled={!requestMatcher.filter} model=".secure" id=".secure"/>
                                </div>

                                <div style={labelAndField}>
                                    <label className={!requestMatcher.filter ? "disabled" : "enabled"}
                                           htmlFor=".keepAlive">Keep Alive:</label>
                                    <Control.checkbox style={basicPropertiesInnerField}
                                                      className={!requestMatcher.filter ? "disabled" : "enabled"}
                                                      disabled={!requestMatcher.filter} model=".keepAlive"
                                                      id=".keepAlive"/>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: "inline-block",
                            width: "65%",
                        }}>
                            <div>
                                <div style={labelAndField}>
                                    <span style={{
                                        display: "inline-block",
                                        width: "20%",
                                    }}
                                          className={!requestMatcher.filter ? "label disabled" : "label enabled"}>Headers:</span>
                                    <label className={!requestMatcher.filter ? "disabled" : "enabled"}
                                           htmlFor=".headers.[0].name">Name:</label>
                                    <Control.text style={keysAndValuesInnerField}
                                                  className={!requestMatcher.filter ? "disabled" : "enabled"}
                                                  disabled={!requestMatcher.filter} model=".headers.[0].name"
                                                  id=".headers.name"/>
                                    <label className={!requestMatcher.filter ? "disabled" : "enabled"}
                                           htmlFor=".headers.[0].values[0]">Value:</label>
                                    <Control.text style={keysAndValuesInnerField}
                                                  className={!requestMatcher.filter ? "disabled" : "enabled"}
                                                  disabled={!requestMatcher.filter} model=".headers.[0].values[0]"
                                                  id=".headers.[0].values[0]"/>
                                </div>
                            </div>
                            <div>
                                <div style={labelAndField}>
                                    <span style={{
                                        display: "inline-block",
                                        width: "20%",
                                    }}
                                          className={!requestMatcher.filter ? "label disabled" : "label enabled"}>QueryParameters:</span>
                                    <label className={!requestMatcher.filter ? "disabled" : "enabled"}
                                           htmlFor=".queryStringParameters.[0].name">Name:</label>
                                    <Control.text style={keysAndValuesInnerField}
                                                  className={!requestMatcher.filter ? "disabled" : "enabled"}
                                                  disabled={!requestMatcher.filter}
                                                  model=".queryStringParameters.[0].name"
                                                  id=".queryStringParameters.name"/>
                                    <label className={!requestMatcher.filter ? "disabled" : "enabled"}
                                           htmlFor=".queryStringParameters.[0].values[0]">Value:</label>
                                    <Control.text style={keysAndValuesInnerField}
                                                  className={!requestMatcher.filter ? "disabled" : "enabled"}
                                                  disabled={!requestMatcher.filter}
                                                  model=".queryStringParameters.[0].values[0]"
                                                  id=".queryStringParameters.[0].values[0]"/>
                                </div>
                            </div>
                            <div>
                                <div style={labelAndField}>
                                    <span style={{
                                        display: "inline-block",
                                        width: "20%",
                                    }}
                                          className={!requestMatcher.filter ? "label disabled" : "label enabled"}>Cookies:</span>
                                    <label className={!requestMatcher.filter ? "disabled" : "enabled"}
                                           htmlFor=".cookies.[0].name">Name:</label>
                                    <Control.text style={keysAndValuesInnerField}
                                                  className={!requestMatcher.filter ? "disabled" : "enabled"}
                                                  disabled={!requestMatcher.filter} model=".cookies.[0].name"
                                                  id=".cookies.name"/>
                                    <label className={!requestMatcher.filter ? "disabled" : "enabled"}
                                           htmlFor=".cookies.[0].values[0]">Value:</label>
                                    <Control.text style={keysAndValuesInnerField}
                                                  className={!requestMatcher.filter ? "disabled" : "enabled"}
                                                  disabled={!requestMatcher.filter} model=".cookies.[0].values[0]"
                                                  id=".cookies.[0].values[0]"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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

const mapDispatchToProps = {
    connectSocket,
    sendMessage,
    disconnectSocket
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestMatcher);