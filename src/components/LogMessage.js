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
                        (reason, index) => {
                            let color = "orange";
                            if (reason.indexOf("matched") !== -1) {
                                color = "rgb(85, 205, 189)";
                            } else if (reason.indexOf("didn't match") !== -1) {
                                color = "rgb(234, 67, 106)";
                            }
                            return <span key={index}
                                         style={{
                                             display: "block",
                                             font: "1em 'Averia Sans Libre', 'Gloria Hallelujah', 'Indie Flower', Helvetica, Arial, sans-serif",
                                             color: color
                                         }}>{reason}</span>
                        }
                    );
                    formattedMessage.push(<div style={this.cellStyle} key={"arg" + messagePartIndex}>{reason}</div>);
                } else {
                    let jsonItem = messageArguments[messagePartIndex];
                    if (typeof jsonItem === "string" && messageParts[messagePartIndex].indexOf("Generated output:") !== -1) {
                        try {
                            jsonItem = JSON.parse(jsonItem);
                        } catch (e) {
                            // ignore error in parsing, instead just output string
                        }
                    }
                    formattedMessage.push(<JsonItem key={"arg" + messagePartIndex}
                                                    index={null}
                                                    collapsed="0"
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
                                                        whiteSpace: "nowrap",
                                                        font: "1em 'Averia Sans Libre', 'Gloria Hallelujah', 'Indie Flower', Helvetica, Arial, sans-serif"
                                                    }}
                                                    jsonItem={jsonItem}/>);
                }
            }
        }
        return formattedMessage;
    };

    selectStyle(type) {
        let style = {};
        switch (type) {
            case "TRACE":
                style.color = "rgb(255, 255, 255)";
                break;
            case "CLEARED":
                style.color = "rgb(222, 147, 95)";
                break;
            case "RETRIEVED":
                style.color = "rgb(222, 147, 95)";
                break;
            case "CREATED_EXPECTATION":
                style.color = "rgb(178, 148, 187)";
                break;
            case "EXPECTATION_RESPONSE":
                style.color = "rgb(152, 208, 255)";
                break;
            case "EXPECTATION_MATCHED":
                style.color = "rgb(85, 205, 189)";
                break;
            case "EXPECTATION_NOT_MATCHED":
                style.color = "rgb(234, 67, 106)";
                break;
            case "VERIFICATION":
                style.color = "rgb(178, 148, 187)";
                break;
            case "VERIFICATION_FAILED":
                style.color = "rgb(234, 67, 106)";
                break;
            case "FORWARDED_REQUEST":
                style.color = "rgb(152, 208, 255)";
                break;
            case "TEMPLATE_GENERATED":
                style.color = "rgb(255, 255, 255)";
                break;
            case "SERVER_CONFIGURATION":
                style.color = "rgb(255, 255, 255)";
                break;
            case "WARN":
                style.color = "rgb(255, 105, 0)";
                break;
            case "EXCEPTION":
                style.color = "rgb(255, 0, 0)";
                break;
            default:
                style.color = "rgb(201, 125, 240)"; // spare
        }
        return style;
    }

    render() {
        const {
            logMessage = {}
        } = this.props;
        let formattedMessage = this.messageFormatter(logMessage.messageFormat, logMessage.arguments);
        return (<div style={this.selectStyle(logMessage.type)}>
            <div style={this.cellStyle}>{logMessage.timeStamp}</div>
            {formattedMessage.map(div => div)}
        </div>)
    }
};
