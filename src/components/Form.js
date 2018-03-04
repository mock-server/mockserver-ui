import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, FieldArray, getFormValues, isDirty, isInvalid, isPristine, isValid, reduxForm} from 'redux-form';
import {AutoComplete as MUIAutoComplete, FloatingActionButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import PropTypes from "prop-types";
import {AutoComplete, TextField, Toggle,} from 'redux-form-material-ui';
import {connectSocket, disconnectSocket, sendMessage} from "../actions";

const loadData = ({host = "127.0.0.1", port = "1080", formValues = {}, sendMessage}) => {
    let requestFilter = {};
    if (formValues.filter) {
        requestFilter = {
            method: formValues.method,
            path: formValues.path,
            keepAlive: formValues.keepAlive ? true : undefined,
            secure: formValues.secure ? true : undefined,
            headers: [],
            queryStringParameters: [],
            cookies: [],
        };
        for (let cookie of formValues.cookies) {
            if (cookie.name && cookie.value) {
                requestFilter.cookies.push(cookie);
            }
        }
        console.log(requestFilter);
    }
    sendMessage(requestFilter, host, port)
};

class Form extends Component {
    static propTypes = {
        host: PropTypes.string.isRequired,
        port: PropTypes.string.isRequired,
        // requestFilter: PropTypes.object.isRequired,
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
        // if (nextProps.requestFilter !== this.props.requestFilter) {
        loadData(nextProps)
        // }
    }

    focus() {
        this.refs.path // the Field
            .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
            .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
            .focus(); // on TextField
    }

    renderHeaders = (disabled) => ({fields}) => {
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
            }}>Headers:
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
                        width: "40%",
                        padding: "5px",
                        display: "inline-block",
                        verticalAlign: "bottom",
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
                        width: "40%",
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
    renderCookies = (disabled) => ({fields}) => {
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
            }}>Cookies:
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
                        width: "40%",
                        padding: "5px",
                        display: "inline-block",
                        verticalAlign: "bottom",
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
                        width: "40%",
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
    renderQueryParameters = (disabled) => ({fields}) => {
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
            }}>Query Parameters:
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
                        width: "40%",
                        padding: "5px",
                        display: "inline-block",
                        verticalAlign: "bottom",
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
                        width: "40%",
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
        const disabled = !(this.props.formValues && this.props.formValues.filter);
        return (
            <form style={{
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
                                name="filter"
                                component={Toggle}
                                label="Filter"
                                labelPosition="left"
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
                                        ref="path"
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
                                <FieldArray name={`headers`} component={this.renderHeaders(disabled)}/>
                                <FieldArray name={`cookies`} component={this.renderCookies(disabled)}/>
                                <FieldArray name={`queryStringParameters`} component={this.renderQueryParameters(disabled)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

const formName = 'requestFilter';
Form = reduxForm({
    form: formName,
    initialValues: {
        filter: false,
        headers: [{}],
        queryStringParameters: [{}],
        cookies: [{}],
    },
})(Form);

const mapDispatchToProps = {
    connectSocket,
    sendMessage,
    disconnectSocket
};

Form = connect(state => ({
    formValues: getFormValues(formName)(state),
    dirty: isDirty(formName)(state),
    pristine: isPristine(formName)(state),
    valid: isValid(formName)(state),
    invalid: isInvalid(formName)(state)
}), mapDispatchToProps)(Form);

export default Form;