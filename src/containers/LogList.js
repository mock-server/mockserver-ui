import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LogMessage from "../components/LogMessage";
import ListHeader from "../components/ListHeader";

export default class LogList extends Component {
    static propTypes = {
        logMessages: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
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
                <ListHeader text={header} />
                <div style={{
                    overflowY: "scroll",
                    maxHeight: "400px",
                    minHeight: "100px",
                    // transform: "scaleX(-1)",
                    backgroundColor: "rgb(251, 251, 251)",
                    borderRadius: "5px"
                }}>
                    {logMessages.map((logMessage, index) => <LogMessage index={logMessages.length - index} key={logMessage.key} logMessage={logMessage.value}/>)}
                </div>
            </div>
        );
    }
}
