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
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        margin: "15px 10px",
                        padding: "17px 17px"
                    }
                }>
                    <LogList logMessages={logMessages} header={"Log Messages (most recent at the top)"}/>
                </div>
                <div className="row" style={
                    {
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        margin: "15px 10px",
                        padding: "17px 17px"
                    }
                }>
                    <JsonList jsonItems={activeExpectations} reverseIndex={false} header={"Active Expectations (in the order they are applied)"}/>
                </div>
                <div className="row" style={
                    {
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        margin: "15px 10px",
                        padding: "17px 17px"
                    }
                }>
                    <div style={
                        {
                            width: "49%",
                            float: "left",
                            padding: "0",
                            paddingRight: "1%",
                            borderRightStyle: "dashed",
                            borderRightWidth: "1px",
                        }
                    }>
                        <JsonList jsonItems={recordedRequests} header={"Received Requests (most recent at the top)"}/>
                    </div>
                    <div style={
                        {
                            width: "49%",
                            float: "right"
                        }
                    }>
                        <JsonList jsonItems={recordedExpectations} header={"Proxied Requests (most recent at the top)"}/>
                    </div>
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
