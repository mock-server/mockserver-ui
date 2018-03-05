import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, FieldArray, formValueSelector, reduxForm} from 'redux-form';
import {AutoComplete as MUIAutoComplete, FloatingActionButton, IconButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import PropTypes from "prop-types";
import {AutoComplete, TextField, Toggle,} from 'redux-form-material-ui';
import {disconnectSocket, sendMessage} from "../actions";

let filterNullsMultiValue = function (rawItems) {
    let items = undefined;
    for (let rawItem of rawItems) {
        let valueSet = false;
        for (let value of rawItem.values) {
            if (value) {
                valueSet = true;
            }
        }
        if (rawItem.name && valueSet) {
            if (!items) {
                items = [];
            }
            items.push(rawItem);
        }
    }
    return items;
};
let filterNullsSingleValue = function (rawItems) {
    let items = undefined;
    for (let rawItem of rawItems) {
        if (rawItem.name && rawItem.value) {
            if (!items) {
                items = [];
            }
            items.push(rawItem);
        }
    }
    return items;
};
const loadData = ({host = "127.0.0.1", port = "1080", requestMatcher = {}, sendMessage}) => {
    let requestFilter = {
        method: undefined,
        path: undefined,
        keepAlive: undefined,
        secure: undefined,
        headers: undefined,
        queryStringParameters: undefined,
        cookies: undefined,
    };
    if (requestMatcher.enabled) {
        requestFilter = {
            method: requestMatcher.method,
            path: requestMatcher.path,
            keepAlive: requestMatcher.keepAlive ? true : undefined,
            secure: requestMatcher.secure ? true : undefined,
            headers: undefined,
            queryStringParameters: undefined,
            cookies: undefined,
        };
        requestFilter.cookies = filterNullsSingleValue(requestMatcher.cookies);
        requestFilter.headers = filterNullsMultiValue(requestMatcher.headers);
        requestFilter.queryStringParameters = filterNullsMultiValue(requestMatcher.queryStringParameters);
    }
    console.log(JSON.stringify(requestFilter, undefined, 2));
    sendMessage(requestFilter, host, port);
};

class Form extends Component {
    static propTypes = {
        host: PropTypes.string.isRequired,
        port: PropTypes.string.isRequired,
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

    renderValues = ({fields, disabled}) => {
        return (
            <div style={{
                width: "50%",
                padding: "5px",
                paddingRight: "10px",
                display: "inline-block",
                verticalAlign: "bottom",
            }}>
                {fields.map((field, index) => <div key={index} style={{
                    display: "inline-block",
                    width: "70%",
                }}>

                    <Field
                        disabled={disabled}
                        fullWidth={true}
                        style={{
                            width: "80%",
                        }}
                        name={field}
                        component={TextField}
                        hintText="Value"
                        onChange={(e) => {
                            console.log(e)
                        }}
                        floatingLabelText="Value"
                    />
                    {index > 0 ?
                        <IconButton style={{
                            display: "inline-block",
                            verticalAlign: "bottom",
                            minWidth: "28px",
                            width: "28px",
                        }} disabled={disabled} onClick={() => fields.remove(index)}>
                            <ContentRemove/>
                        </IconButton>
                        : ""}

                </div>)}
                <IconButton style={{
                    display: "inline-block",
                    verticalAlign: "bottom",
                    minWidth: "28px",
                    width: "28px",
                }} disabled={disabled} onClick={() => fields.push("")}>
                    <ContentAdd/>
                </IconButton>
            </div>)
    };
    renderKeysToMultiValues = ({fields, disabled, title}) => {
        return (<div style={{
            width: "100%",
            display: "inline-block",
            paddingRight: "10px",
        }}>
            <div style={{
                color: disabled ? "#9c9c9c" : "rgb(0, 188, 212)",
                width: "20%",
                paddingTop: "45px",
                paddingRight: "15px",
                display: "inline-block",
                verticalAlign: "top",
                textAlign: "right",
                fontFamily: "Roboto, sans-serif",
            }}>{title}
            </div>
            <div style={{
                display: "inline-block",
                width: "75%",
            }}>
                {fields.map((field, index) => <div key={index} style={{
                    display: "inline-block",
                    width: "90%",
                }}>
                    <div style={{
                        width: "35%",
                        padding: "5px",
                        display: "inline-block",
                        verticalAlign: "top",
                    }}>
                        <Field
                            disabled={disabled}
                            name={`${field}.name`}
                            component={AutoComplete}
                            hintText="Name"
                            floatingLabelText="Name"
                            fullWidth={true}
                            openOnFocus
                            filter={MUIAutoComplete.fuzzyFilter}
                            dataSource={[]}
                        />
                    </div>
                    <FieldArray name={`${field}.values`} component={this.renderValues} disabled={disabled}/>
                    {index > 0 ? <FloatingActionButton mini={true} style={{
                        display: "inline-block",
                        verticalAlign: "bottom"
                    }} disabled={disabled} onClick={() => fields.remove(index)}>
                        <ContentRemove/>
                    </FloatingActionButton> : ""}
                </div>)}
                <FloatingActionButton mini={true} style={{
                    display: "inline-block",
                    verticalAlign: "bottom",
                }} disabled={disabled} onClick={() => fields.push({
                    values: [""]
                })}>
                    <ContentAdd/>
                </FloatingActionButton>
            </div>
        </div>)
    };
    renderKeysToValues = ({fields, disabled, title}) => {
        return (<div style={{
            width: "100%",
            display: "inline-block",
            paddingRight: "10px",
        }}>
            <div style={{
                color: disabled ? "#9c9c9c" : "rgb(0, 188, 212)",
                width: "20%",
                paddingTop: "45px",
                paddingRight: "15px",
                display: "inline-block",
                verticalAlign: "top",
                textAlign: "right",
                fontFamily: "Roboto, sans-serif",
            }}>{title}
            </div>
            <div style={{
                display: "inline-block",
                width: "75%",
            }}>
                {fields.map((field, index) => <div key={index} style={{
                    display: "inline-block",
                    width: "90%",
                }}>
                    <div style={{
                        width: "35%",
                        padding: "5px",
                        display: "inline-block",
                        verticalAlign: "top",
                    }}>
                        <Field
                            disabled={disabled}
                            name={`${field}.name`}
                            component={AutoComplete}
                            hintText="Name"
                            floatingLabelText="Name"
                            fullWidth={true}
                            openOnFocus
                            filter={MUIAutoComplete.fuzzyFilter}
                            dataSource={[]}
                        />
                    </div>
                    <div style={{
                        width: "45%",
                        padding: "5px",
                        paddingRight: "10px",
                        display: "inline-block",
                        verticalAlign: "bottom",
                    }}>
                        <Field
                            disabled={disabled}
                            fullWidth={true}
                            name={`${field}.value`}
                            component={TextField}
                            hintText="Value"
                            floatingLabelText="Value"
                        />
                    </div>
                    {index > 0 ? <FloatingActionButton mini={true} style={{
                        display: "inline-block",
                        verticalAlign: "bottom"
                    }} disabled={disabled} onClick={() => fields.remove(index)}>
                        <ContentRemove/>
                    </FloatingActionButton> : ""}
                </div>)}
                <FloatingActionButton mini={true} style={{
                    display: "inline-block",
                    verticalAlign: "bottom",
                }} disabled={disabled} onClick={() => fields.push({})}>
                    <ContentAdd/>
                </FloatingActionButton>
            </div>
        </div>)
    };

    render() {
        const disabled = !this.props.requestMatcher.enabled;
        return (
            <div style={{
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
                        width: "10%",
                        display: "inline-block",
                        verticalAlign: "top",
                    }}>
                        <div style={{
                            paddingRight: "10px",
                            padding: "5px",
                            display: "inline-block",
                        }}>
                            <Field
                                name="enabled"
                                component={Toggle}
                                label="Filter"
                                labelPosition="left"
                                ref="enabled"
                            />
                        </div>
                    </div>
                    <div style={{
                        width: "90%",
                        display: "inline-block",
                        verticalAlign: "bottom",
                    }}>
                        <div style={{
                            width: "35%",
                            display: "inline-block",
                            verticalAlign: "top",
                        }}>
                            <div>
                                <div style={{
                                    width: "45%",
                                    padding: "5px",
                                    display: "inline-block",
                                    verticalAlign: "top",
                                }}>
                                    <Field
                                        disabled={disabled}
                                        name="method"
                                        component={AutoComplete}
                                        fullWidth={true}
                                        floatingLabelText="Method"
                                        openOnFocus
                                        filter={MUIAutoComplete.fuzzyFilter}
                                        dataSource={['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE']}
                                    />
                                </div>

                                <div style={{
                                    width: "45%",
                                    padding: "5px",
                                    display: "inline-block",
                                    verticalAlign: "top",
                                }}>
                                    <Field
                                        disabled={disabled}
                                        name="path"
                                        component={TextField}
                                        fullWidth={true}
                                        hintText="Path"
                                        floatingLabelText="Path"
                                    />
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    width: "45%",
                                    padding: "5px",
                                    display: "inline-block",
                                    verticalAlign: "bottom",
                                }}>
                                    <Field
                                        disabled={disabled}
                                        name="secure"
                                        component={Toggle}
                                        label="Secure"
                                        labelPosition="right"
                                    />
                                </div>

                                <div style={{
                                    width: "45%",
                                    padding: "5px",
                                    display: "inline-block",
                                    verticalAlign: "bottom",
                                }}>
                                    <Field
                                        disabled={disabled}
                                        name="keepAlive"
                                        component={Toggle}
                                        label="Keep-Alive"
                                        labelPosition="right"
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{
                            width: "65%",
                            display: "inline-block",
                            verticalAlign: "bottom",
                        }}>
                            <div>
                                <FieldArray name={`headers`} component={this.renderKeysToMultiValues}
                                            disabled={disabled} title={"Headers:"}/>
                                <FieldArray name={`cookies`} component={this.renderKeysToValues} disabled={disabled}
                                            title={"Cookies:"}/>
                                <FieldArray name={`queryStringParameters`} component={this.renderKeysToMultiValues}
                                            disabled={disabled} title={"Query Parameters:"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const formName = 'requestFilter';
const selector = formValueSelector(formName);
const validate = values => {
    const errors = {};

    return errors
};

Form = reduxForm({
    form: formName,
    validate,
    initialValues: {
        headers: [{
            values: [""]
        }],
        queryStringParameters: [{
            values: [""]
        }],
        cookies: [{}],
    },
    destroyOnUnmount: false
})(Form);

const mapStateToProps = (state, props) => {
    return {
        requestMatcher: selector(state, 'enabled', 'method', 'path', 'keepAlive', 'secure', 'headers', 'queryStringParameters', 'cookies')
    }
};

const mapDispatchToProps = {
    sendMessage,
    disconnectSocket
};

Form = connect(mapStateToProps, mapDispatchToProps, undefined, {pure: true})(Form);

export default Form;