import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LogMessage from "../components/LogMessage";
import ListHeader from "../components/ListHeader";

export default class LogList extends Component {
    static propTypes = {
        logMessages: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.object.isRequired
        })).isRequired,
        header: PropTypes.string.isRequired
    };

    render() {
        const {
            logMessages = [],
            header = ""
        } = this.props;
        return (
            <div style={{
                padding: "2px 0"
            }}>
                <ListHeader text={header}/>
                <div style={{
                    overflowY: "scroll",
                    maxHeight: "400px",
                    minHeight: "100px",
                    borderRadius: "2px",
                    backgroundColor: "rgb(29, 31, 33)",
                    color: "rgb(250, 250, 250)"
                }}>
                    <div style={
                        {
                            borderSpacing: "5px",
                            padding: "5px",
                            marginTop: "2px",
                            marginRight: "0",
                            marginBottom: "3px",
                            marginLeft: 0,
                            borderRadius: "2px",
                            backgroundColor: "rgb(29, 31, 33)",
                            color: "rgb(250, 250, 250)"
                        }
                    }>
                        {logMessages.map((logMessage, index) => <LogMessage index={logMessages.length - index}
                                                                            key={logMessage.key}
                                                                            logMessage={logMessage.value}/>)}
                    </div>
                </div>
            </div>
        );
    }
}
