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

        return (
            <div>
                <div className="row" style={
                    {
                        "borderStyle": "none",
                        "borderWidth": "3px"
                    }
                }>
                    <div style={
                        {
                            width: "46%",
                            float: "left",
                            padding: "2px 1%"
                        }
                    }>
                        <JsonList jsonItems={recordedRequests} header={"Received Requests"}/>
                    </div>
                    <div style={
                        {
                            width: "46%",
                            float: "right",
                            padding: "2px 1%"
                        }
                    }>
                        <JsonList jsonItems={recordedExpectations} header={"Proxied Requests"}/>
                    </div>
                </div>
                <div className="row" style={
                    {
                        "borderStyle": "none",
                        "borderWidth": "3px"
                    }
                }>
                    <JsonList jsonItems={activeExpectations} header={"Active Expectations"}/>
                </div>
                <div className="row" style={
                    {
                        "borderStyle": "none",
                        "borderWidth": "3px"
                    }
                }>
                    <LogList logMessages={logMessages}/>
                </div>
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
