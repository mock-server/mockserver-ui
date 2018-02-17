import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LogList from "../containers/LogList";
import JsonList from "../containers/JsonList";
import './grid.css';

class Grid extends Component {
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
            <div style={{

            }}>
                <div className="row" style={
                    {
                        "borderStyle": "dashed",
                        "borderWidth": "1px",
                        margin: "15px 0",
                        padding: "10px 15px"
                    }
                }>
                    <div style={
                        {
                            width: "49%",
                            float: "left",
                            padding: "5px 0"
                        }
                    }>
                        <JsonList jsonItems={recordedRequests} header={"Received Requests"}/>
                    </div>
                    <div style={
                        {
                            width: "49%",
                            float: "right",
                            padding: "5px 0"
                        }
                    }>
                        <JsonList jsonItems={recordedExpectations} header={"Proxied Requests"}/>
                    </div>
                </div>
                <div className="row" style={
                    {
                        "borderStyle": "dashed",
                        "borderWidth": "1px",
                        margin: "15px 0",
                        padding: "10px 15px"
                    }
                }>
                    <JsonList jsonItems={activeExpectations} header={"Active Expectations"}/>
                </div>
                <div className="row" style={
                    {
                        "borderStyle": "dashed",
                        "borderWidth": "1px",
                        margin: "15px 0",
                        padding: "10px 15px"
                    }
                }>
                    <LogList logMessages={logMessages} header={"Log Messages"}/>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, {})(Grid)
