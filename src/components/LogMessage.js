import React, {Component} from 'react';
import PropTypes from 'prop-types';
import JsonItem from "./JsonItem";
import './log.css';

export default class LogMessage extends Component {
    static propTypes = {
        logMessage: PropTypes.object.isRequired
    };
    cellStyle = {
        display: "table-cell",
        fontFamily: "monospace, Roboto, sans-serif"
    };

    render() {
        const {
            logMessage = {},
        } = this.props;
        return (<div style={logMessage.style}>
            <div style={Object.assign({
                whiteSpace: "pre",
            }, this.cellStyle)}>{logMessage.description}</div>
            {logMessage.messageParts.map((messagePart) => {
                if (!messagePart.argument) {
                    return <div key={messagePart.key}
                                style={this.cellStyle}>{messagePart.value}</div>;
                } else {
                    if (messagePart.multiline || messagePart.because) {
                        let reason = messagePart.value.map(
                            (reason, index) => {
                                let color = "rgb(255, 255, 255)";
                                if (messagePart.because) {
                                    if (reason.indexOf("matched") !== -1) {
                                        color = "rgb(107, 199, 118)";
                                    } else if (reason.indexOf("didn't match") !== -1) {
                                        color = "rgb(216, 88, 118)";
                                    } else {
                                        color = "rgb(255, 255, 255)";
                                    }
                                }
                                return <span key={messagePart.key + "_" + index}
                                             style={{
                                                 marginTop: "-10px",
                                                 color: color,
                                                 display: "block",
                                                 fontSize: "0.95em",
                                                 lineHeight: "1.5em",
                                                 whiteSpace: "pre",
                                                 paddingLeft: "20px",
                                                 paddingBottom: "10px",
                                             }}>{reason}</span>
                            }
                        );
                        return <div key={messagePart.key}
                                    style={Object.assign({paddingLeft: "5px",}, this.cellStyle)}>
                            <details>
                                <summary style={{
                                    color: "rgb(222, 147, 95)",
                                    fontSize: "19px",
                                    lineHeight: "25px",
                                    paddingLeft: "5px",
                                    paddingTop: "0px",
                                    marginTop: "-1px",
                                }}><span>...</span>
                                </summary>
                                {reason}
                            </details>
                        </div>;
                    } else if (messagePart.json) {
                        return <JsonItem key={messagePart.key}
                                         index={null}
                                         collapsed="0"
                                         display={"table-cell"}
                                         textStyle={{
                                             fontFamily: "monospace, Roboto, sans-serif",
                                             backgroundColor: "rgb(29, 31, 33)",
                                             display: "table-cell",
                                             verticalAlign: "top",
                                             padding: "2px",
                                         }}
                                         enableClipboard={false}
                                         jsonItem={messagePart.value}/>;
                    } else {
                        return <div key={messagePart.key}
                                    style={{
                                        fontFamily: "Roboto, sans-serif",
                                        color: "rgb(255, 255, 255)",
                                        display: "table-cell",
                                        paddingLeft: "5px",
                                        paddingRight: "5px",
                                        whiteSpace: "pre",
                                    }}>{messagePart.value}</div>;
                    }
                }
            })}
        </div>)
    }
};
