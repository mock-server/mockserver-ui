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
        } else if (typeof jsonItem === "string" || typeof jsonItem === "number") {
            return (
                <pre style={textStyle}>{jsonItem}</pre>
            );
        } else {
            return (<div/>);
        }
    }
};
