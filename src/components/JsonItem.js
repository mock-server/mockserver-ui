import React, {Component} from 'react';
import ReactJson from 'react-json-view';

export default class JsonItem extends Component {
    render() {
        const {
            collapsed = 0,
            jsonItem = null,
            description = null,
            display = "block",
            enableClipboard = true,
            textStyle = {}
        } = this.props;

        if (typeof jsonItem === "object" || Array.isArray(jsonItem)) {
            return (<ReactJson src={jsonItem}
                               style={{
                                   whiteSpace: "nowrap",
                                   paddingTop: "6px",
                                   display: (display === "table-cell" ? "table-cell" : "block")
                               }}
                               name={description ? <div style={{
                                   display: "table-cell",
                                   maxWidth: "400px",
                                   textOverflow: "ellipsis",
                                   overflow: "hidden",
                                   whiteSpace: "pre"
                               }}>{description}</div> : null}
                               theme={"tomorrow"}
                               iconStyle={"triangle"}
                               indentWidth={4}
                               collapsed={collapsed != null ? collapsed : 0}
                               shouldCollapse={() => {
                                   return false
                               }}
                               enableClipboard={enableClipboard}
                               displayObjectSize={false}
                               displayDataTypes={false}
                               onEdit={false}
                               onAdd={false}
                               onDelete={false}/>);
        } else if (typeof jsonItem === "string" && jsonItem.length > 20) {
            return (<details style={textStyle}>
                <summary style={{
                    color: "rgb(222, 147, 95)",
                    fontSize: "30px",
                    lineHeight: "15px",
                    display: "table-cell"
                }}><span>...</span>
                </summary>
                <pre style={{
                    position: "relative",
                    top: "-5px",
                    left: "20px",
                    paddingRight: "35px"
                }}>{jsonItem}</pre>
            </details>);
        } else if (typeof jsonItem === "string") {
            return (<pre style={textStyle}>{jsonItem}</pre>);
        } else if (typeof jsonItem === "number") {
            return (<pre style={textStyle}>{jsonItem}</pre>);
        } else {
            return (<div/>);
        }
    }
};
