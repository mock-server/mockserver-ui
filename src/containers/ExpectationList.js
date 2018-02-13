/* eslint-disable no-undef */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import LogList from "../containers/LogList"
import JsonList from "../containers/JsonList"
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
                        <JsonList jsonItems={recordedRequests}/>
                    </div>
                    <div style={
                        {
                            width: "46%",
                            float: "right",
                            padding: "2px 1%"
                        }
                    }>
                        <div className="header">Active Expectations</div>
                        <JsonList jsonItems={activeExpectations}/>
                    </div>
                </div>
                <div className="row" style={
                    {
                        "borderStyle": "none",
                        "borderWidth": "3px"
                    }
                }>
                    <LogList logMessages={logMessages}/>
                </div>
                {recordedExpectationsTitle}
                <JsonList jsonItems={recordedExpectations}/>
            </div>
        )
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
