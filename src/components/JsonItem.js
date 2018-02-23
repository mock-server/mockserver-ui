import React, {Component} from 'react';
import ReactJson from 'react-json-view';

export default class JsonItem extends Component {
    render() {
        const {
            index = 0,
            collapsed = 0,
            jsonItem = null,
            display = "block",
            textStyle = {}
        } = this.props;

        if (typeof jsonItem === "object") {
            return (<ReactJson
                src={jsonItem}
                style={
                    {
                        padding: "10px",
                        display: (display === "table-cell" ? "table-cell" : "block")
                    }
                }
                name={index != null ? "" + index : index}
                theme={"tomorrow"}
                iconStyle={"triangle"}
                indentWidth={4}
                collapsed={collapsed != null ? collapsed : 0}
                collapseStringsAfterLength={250}
                shouldCollapse={(field) => {
                    return false
                }}
                enableClipboard={true}
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
                        display: "table-cell",
                        paddingLeft: "11px"
                    }}>...
                    </summary>
                    <pre style={textStyle}>{jsonItem}</pre>
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
