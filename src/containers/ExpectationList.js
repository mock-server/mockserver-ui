/* eslint-disable no-undef */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReactJson from 'react-json-view'
import './scroll.css'

class ExpectationList extends Component {
    static propTypes = {
        requestMatcher: PropTypes.object.isRequired,
        entities: PropTypes.shape({
            activeExpectations: PropTypes.array.isRequired,
            recordedExpectations: PropTypes.array.isRequired,
            recordedRequests: PropTypes.array.isRequired,
            logMessages: PropTypes.array.isRequired
        }).isRequired
    };

    render() {
        const {
            entities: {
                activeExpectations = [],
                recordedExpectations = [],
                recordedRequests = [],
                logMessages = []
            },
        } = this.props;

        let recordedExpectationsTitle = null;
        if (recordedExpectations.length > 0) {
            recordedExpectationsTitle = <div className="header">Recorded Expectations</div>
        }

        return (
            <div>
                <div className="row" style={
                    {
                        borderLeftStyle: "none",
                        borderLeftWidth: "3px",
                        borderTopStyle: "none",
                        borderTopWidth: "3px",
                        borderRightStyle: "none",
                        borderRightWidth: "3px",
                        backgroundColor: "rgb(250, 250, 250)",
                        borderRadius: "5px"
                    }
                }>
                    <div style={
                        {
                            width: "48%",
                            float: "left",
                            borderRightStyle: "none",
                            borderRightWidth: "3px",
                            padding: "2px 1%"
                        }
                    }>
                        <div className="header">Recorded Requests</div>
                        {this.renderJsonList(recordedRequests, 2)}
                    </div>
                    <div style={
                        {
                            width: "46%",
                            float: "right",
                            padding: "2px 1%"
                        }
                    }>
                        <div className="header">Active Expectations</div>
                        {this.renderJsonList(activeExpectations, 2)}
                    </div>
                </div>
                <div className="row" style={
                    {
                        "borderStyle": "none",
                        "borderWidth": "3px"
                    }
                }>
                    <div style={{
                        padding: "2px 1%"
                    }}>
                        <div className="header">Log Messages</div>
                        {this.renderLogList(logMessages)}
                    </div>
                </div>
                {recordedExpectationsTitle}
                {this.renderJsonList(recordedExpectations, 2)}
            </div>
        )
    }

    renderJson(key, value, collapsed = 1) {
        return (
            <ReactJson
                key={key}
                src={value}
                style={
                    {
                        padding: "10px",
                        transform: "scaleX(-1)",
                        marginRight: "3px"
                    }
                }
                name={null}
                theme={"tomorrow"}
                iconStyle={"triangle"}
                indentWidth={4}
                collapsed={collapsed}
                collapseStringsAfterLength={250}
                shouldCollapse={(field) => {
                    return false
                }}
                enableClipboard={false}
                displayObjectSize={false}
                displayDataTypes={false}
                onEdit={false}
                onAdd={false}
                onDelete={false}
            />
        )
    }

    renderJsonList(jsonItems, collapsed) {
        return <div id="style-5" style={{
            overflowY: "scroll",
            maxHeight: "400px",
            transform: "scaleX(-1)",
            backgroundColor: "rgb(251, 251, 251)",
            borderRadius: "5px"
        }}>
            {jsonItems.map((jsonItem) => this.renderJson(jsonItem.key, jsonItem.value, collapsed))}
        </div>;
    }

    renderLog(key, value) {
        return (
            <pre className="log"
                 key={key}
                 style={
                     {
                         padding: "5px",
                         transform: "scaleX(-1)",
                         marginTop: "0",
                         marginRight: "5px",
                         marginBottom: "5px",
                         marginLeft: 0,
                         borderRadius: "2px",
                         backgroundColor: "rgb(29, 31, 33)",
                         color: "rgb(250, 250, 250)"
                     }
                 }>{value}</pre>
        )
    }

    renderLogList(logMessages) {
        return <div id="style-5" style={{
            overflowY: "scroll",
            maxHeight: "400px",
            transform: "scaleX(-1)"
        }}>
            {logMessages.map((logMessage) => this.renderLog(logMessage.key, logMessage.value, false))}
        </div>;
    }
}

const mapStateToProps = (state) => {
    const {
        requestMatcher = {},
        entities: {
            activeExpectations = [],
            recordedExpectations = [],
            recordedRequests = [],
            logMessages = []
        }
    } = state;

    return {
        requestMatcher,
        entities: {
            activeExpectations,
            recordedExpectations,
            recordedRequests,
            logMessages
        }
    }
};

export default connect(mapStateToProps, {})(ExpectationList)
