import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class LogMessage extends Component {
    static propTypes = {
        logMessage: PropTypes.string.isRequired
    };

    render() {
        const {
            logMessage = {}
        } = this.props;
        return (
            <pre className="log"
                 style={
                     {
                         padding: "5px",
                         // transform: "scaleX(-1)",
                         marginTop: "2px",
                         marginRight: "0",
                         marginBottom: "3px",
                         marginLeft: 0,
                         borderRadius: "2px",
                         backgroundColor: "rgb(29, 31, 33)",
                         color: "rgb(250, 250, 250)"
                     }
                 }>{logMessage}</pre>
        )
    }
};
