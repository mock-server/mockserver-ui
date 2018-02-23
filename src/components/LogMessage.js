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
        margin: "2px 0px 3px",
        borderRadius: "2px",
        display: "table-cell",
        verticalAlign: "top",
        // whiteSpace: "nowrap",
        fontFamily: "Roboto,sans-serif"
    };

    messageFormatter(message, messageArguments) {
        let formattedMessage = [];
        const messageParts = (message || "").split("{}");
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
                    formattedMessage.push(
                        <div style={this.cellStyle} key={"arg" + messagePartIndex}>
                            <details>
                                <summary style={{
                                    color: "rgb(222, 147, 95)",
                                    fontSize: "30px",
                                    lineHeight: "15px"
                                }}>...</summary>
                                {reason}
                            </details>
                        </div>);
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
                                                        fontFamily: "Roboto, sans-serif",
                                                        backgroundColor: "rgb(29, 31, 33)",
                                                        paddingTop: "6px",
                                                        display: "table-cell",
                                                        verticalAlign: "top"
                                                    }}
                                                    jsonItem={jsonItem}/>);
                }
            }
        }
        return formattedMessage;
    };

    selectStyle(type) {
        let style = {
            borderTopColor: "rgb(189, 189, 189)",
            borderTopStyle: "dotted",
            borderTopWidth: "2px",
            whiteSpace: "nowrap",
            overflow: "auto",
            display: "table-row"
        };
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
                // style.color = "rgb(178, 148, 187)";
                style.color = "rgb(216,199,166)";
                break;
            case "EXPECTATION_RESPONSE":
                // style.color = "rgb(152, 208, 255)";
                // style.color = "rgb(197, 229, 255)";
                style.color = "rgb(161,208,231)";
                break;
            case "EXPECTATION_MATCHED":
                // style.color = "rgb(85, 205, 189)";
                // style.color = "rgb(160, 199, 194)";
                style.color = "rgb(117,185,186)";
                break;
            case "EXPECTATION_NOT_MATCHED":
                // style.color = "rgb(234, 67, 106)";
                // style.color = "rgb(244, 200, 210)";
                style.color = "rgb(204,165,163)";
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
                style.color = "rgb(201, 125, 240)";
                break;
            case "WARN":
                style.color = "rgb(255, 255, 255)";
                style.whiteSpace = "pre-wrap";
                break;
            case "EXCEPTION":
                // style.color = "rgb(255, 255, 255)";
                style.color = "rgb(255,133,133)";
                style.whiteSpace = "pre-wrap";
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
        const today = (new Date()).toISOString().split('T')[0];
        return (<div style={
            this.selectStyle(logMessage.type)
        }>
            <div style={Object.assign({whiteSpace: "nowrap"}, this.cellStyle)}>{logMessage.timeStamp.replace(today, "").trim()}</div>
            {formattedMessage.map(div => div)}
        </div>)
    }
};
