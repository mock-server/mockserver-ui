import React, {Component} from 'react';
import PropTypes from 'prop-types';
import JsonItem from "./JsonItem";
import './log.css';

export default class LogMessage extends Component {
    static propTypes = {
        logMessage: PropTypes.object.isRequired
    };
    cellStyle = {
        paddingTop: "5px",
        paddingLeft: "4px",
        paddingRight: "4px",
        paddingBottom: "3px",
        margin: "2px 0px 3px",
        borderRadius: "2px",
        display: "table-cell",
        verticalAlign: "top",
        fontFamily: "Roboto,sans-serif"
    };

    static messageFormatter(message, messageArguments, cellStyle, paddingWidth) {
        let formattedMessage = [];
        const messageParts = (message || "").split("{}");
        let messageDiv = 0;
        for (let messagePartIndex = 0; messagePartIndex < messageParts.length; messagePartIndex++) {
            if (messageParts[messagePartIndex].length > 0) {
                formattedMessage.push(<div style={cellStyle}
                                           key={"msg" + messagePartIndex}>{messageParts[messagePartIndex]}</div>);
                messageDiv++;
            }
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
                                             fontSize: "0.85em",
                                             lineHeight: "1.25em",
                                             color: color
                                         }}>{reason}</span>
                        }
                    );
                    let style = Object.assign({}, cellStyle);
                    style.paddingTop = "0px";
                    formattedMessage.push(
                        <div style={style} key={"arg" + messagePartIndex}>
                            <details>
                                <summary style={{
                                    color: "rgb(222, 147, 95)",
                                    fontSize: "30px",
                                    lineHeight: "15px"
                                }}>...
                                </summary>
                                {reason}
                            </details>
                        </div>);
                } else {
                    let jsonItem = messageArguments[messagePartIndex];
                    if (typeof jsonItem === "string" && messageParts[messagePartIndex].indexOf("generated output:") !== -1) {
                        try {
                            jsonItem = JSON.parse(jsonItem);
                        } catch (e) {
                            // ignore error in parsing, instead just output string
                        }
                    }
                    formattedMessage.push(<JsonItem key={"arg" + messagePartIndex}
                                                    index={null}
                                                    displayIndex={messageParts[messagePartIndex].indexOf("for action:") === -1}
                                                    collapsed="0"
                                                    display={"table-cell"}
                                                    textStyle={{
                                                        fontFamily: "Roboto, sans-serif",
                                                        backgroundColor: "rgb(29, 31, 33)",
                                                        display: "table-cell",
                                                        verticalAlign: "top"
                                                    }}
                                                    enableClipboard={false}
                                                    jsonItem={jsonItem}/>);
                }
                messageDiv++;
            }
        }
        for (let paddingIndex = messageDiv; paddingIndex < paddingWidth; paddingIndex++) {
            formattedMessage.push(<div key={"pad" + paddingIndex} style={cellStyle}> </div>);
        }
        return formattedMessage;
    };

    static selectStyle(type, noBorderTop) {
        let style = {
            borderTopStyle: "dashed",
            borderTopWidth: "1px",
            borderTopColor: "#cfcccc57",
            whiteSpace: "nowrap",
            overflow: "auto",
            display: "table-row",
            width: "100%"
        };
        if (noBorderTop) {
            style.borderTopWidth = "0";
        }
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
                style.color = "rgb(216,199,166)";
                break;
            case "EXPECTATION_RESPONSE":
                style.color = "rgb(161,208,231)";
                break;
            case "EXPECTATION_MATCHED":
                style.color = "rgb(117,185,186)";
                break;
            case "EXPECTATION_NOT_MATCHED":
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
            logMessage = {},
            logMessageMaxWidth = 0,
            index
        } = this.props;
        const formattedMessage = LogMessage.messageFormatter(logMessage.messageFormat, logMessage.arguments, this.cellStyle, logMessageMaxWidth);
        const noBorderTop = formattedMessage[0].props.children <= 1 || index === 0;
        const timestamp = logMessage.timestamp && logMessage.timestamp.replace((new Date()).toISOString().split('T')[0], "").trim();
        return (<div style={LogMessage.selectStyle(logMessage.type, noBorderTop)}>
            <div style={Object.assign({whiteSpace: "nowrap"}, this.cellStyle)}>{timestamp}</div>
            {formattedMessage.map(div => div)}
        </div>)
    }
};
