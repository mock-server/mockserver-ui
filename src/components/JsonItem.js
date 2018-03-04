import React, {Component} from 'react';
import ReactJson from 'react-json-view';

export default class JsonItem extends Component {
    static calculateIndex(counter, jsonItem) {
        let httpObject = jsonItem;
        let index = null;
        if (httpObject) {
            if (httpObject.httpRequest) {
                httpObject = httpObject.httpRequest;
            }
            if (httpObject.method) {
                const value = httpObject.method;
                if (index) {
                    index = index + " " + value;
                } else {
                    index = value;
                }
            }
            if (httpObject.path) {
                const value = httpObject.path;
                if (index) {
                    index = index + " " + value;
                } else {
                    index = value;
                }
            }
            if (httpObject.statusCode) {
                const value = httpObject.statusCode;
                if (index) {
                    index = index + " " + value;
                } else {
                    index = value;
                }
            }
            if (httpObject.reasonPhrase) {
                const value = httpObject.reasonPhrase;
                if (index) {
                    index = index + " " + value;
                } else {
                    index = value;
                }
            }
        }
        return index;
    }

    render() {
        const {
            index = 0,
            displayIndex = true,
            collapsed = 0,
            jsonItem = null,
            display = "block",
            enableClipboard = true,
            textStyle = {}
        } = this.props;

        if (typeof jsonItem === "object") {
            return (<ReactJson
                src={jsonItem}
                style={{
                    whiteSpace: "nowrap",
                    paddingTop: "6px",
                    display: (display === "table-cell" ? "table-cell" : "block")
                }}
                name={displayIndex ? <div style={{
                    display: "table-cell",
                    maxWidth: "200px",
                    minWidth: "115px",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                }}>{JsonItem.calculateIndex(index != null ? "" + index : index, jsonItem)}</div> : null}
                theme={"tomorrow"}
                iconStyle={"triangle"}
                indentWidth={4}
                collapsed={collapsed != null ? collapsed : 0}
                shouldCollapse={(field) => {
                    return false
                }}
                enableClipboard={enableClipboard}
                displayObjectSize={false}
                displayDataTypes={false}
                onEdit={false}
                onAdd={false}
                onDelete={false}
            />);
        } else if (typeof jsonItem === "string" && jsonItem.length > 20) {
            return (
                <details style={textStyle}>
                    <summary style={{
                        color: "rgb(222, 147, 95)",
                        fontSize: "30px",
                        lineHeight: "15px",
                        display: "table-cell"
                    }}>...
                    </summary>
                    <pre>{jsonItem}</pre>
                </details>
            );
        } else if (typeof jsonItem === "string") {
            return (
                <pre style={textStyle}>{jsonItem}</pre>
            );
        } else if (typeof jsonItem === "number") {
            return (
                <pre style={textStyle}>{jsonItem}</pre>
            );
        } else {
            return (<div/>);
        }
    }
};
