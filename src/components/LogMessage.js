import React, {Component} from 'react';
import PropTypes from 'prop-types';
import JsonItem from "./JsonItem";
import './table.css';

export default class LogMessage extends Component {
    static propTypes = {
        logMessage: PropTypes.object.isRequired
    };
    cellStyle = {
        padding: "5px",
        marginTop: "2px",
        marginRight: "0",
        marginBottom: "3px",
        marginLeft: 0,
        borderRadius: "2px",
        display: "table-cell",
        verticalAlign: "top",
        whiteSpace: "nowrap",
        font: "1em 'Averia Sans Libre', 'Gloria Hallelujah', 'Indie Flower', Helvetica, Arial, sans-serif"
    };

    messageFormatter(message, messageArguments) {
        let formattedMessage = [];
        const messageParts = message.split("{}");
        for (let messagePartIndex = 0; messagePartIndex < messageParts.length; messagePartIndex++) {
            formattedMessage.push(<div style={this.cellStyle}
                                       key={"msg" + messagePartIndex}>{messageParts[messagePartIndex]}</div>);
            if (messageArguments && messageArguments.length > 0 && messageArguments.length > messagePartIndex) {
                if (messageParts[messagePartIndex].indexOf("because:") !== -1) {
                    let reason = messageArguments[messagePartIndex].split(",").map(
                        reason => {
                            let color = "orange";
                            if (reason.indexOf("matched") !== -1) {
                                color = "rgb(85, 205, 189)";
                            } else if (reason.indexOf("didn't match") !== -1) {
                                color = "rgb(234, 67, 106)";
                            }
                            return <span style={{
                                // padding: "5px",
                                // marginTop: "2px",
                                // marginRight: "0",
                                // marginBottom: "3px",
                                // marginLeft: 0,
                                display: "block",
                                // verticalAlign: "top",
                                font: "1em 'Averia Sans Libre', 'Gloria Hallelujah', 'Indie Flower', Helvetica, Arial, sans-serif",
                                color: color
                            }}>{reason}</span>
                        }
                    );
                    formattedMessage.push(<div style={this.cellStyle} key={"arg" + messagePartIndex}>{reason}</div>);
                } else {
                    formattedMessage.push(<JsonItem key={"arg" + messagePartIndex}
                                                    index={null}
                                                    collapsed="1"
                                                    display={"table-cell"}
                                                    textStyle={{
                                                        padding: "5px",
                                                        marginTop: "2px",
                                                        marginRight: "0",
                                                        marginBottom: "3px",
                                                        marginLeft: 0,
                                                        borderRadius: "2px",
                                                        display: "table-cell",
                                                        verticalAlign: "top",
                                                        font: "1em 'Averia Sans Libre', 'Gloria Hallelujah', 'Indie Flower', Helvetica, Arial, sans-serif"
                                                    }}
                                                    jsonItem={messageArguments[messagePartIndex]}/>);
                }
            }
        }
        return formattedMessage;
    };

    render() {
        const {
            logMessage = {}
        } = this.props;
        let formattedMessage = this.messageFormatter(logMessage.messageFormat, logMessage.arguments);
        return (<div>
            <div style={this.cellStyle}>{logMessage.timeStamp}</div>
            {formattedMessage.map(div => div)}
        </div>)
    }
};
