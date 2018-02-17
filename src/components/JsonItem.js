import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';

export default class JsonItem extends Component {
    static propTypes = {
        jsonItem: PropTypes.object.isRequired
    };

    render() {
        const {
            jsonItem = {}
        } = this.props;

        return (
            <ReactJson
                src={jsonItem}
                style={
                    {
                        padding: "10px",
                        // transform: "scaleX(-1)",
                        // marginRight: "3px"
                    }
                }
                name={null}
                theme={"tomorrow"}
                iconStyle={"triangle"}
                indentWidth={4}
                collapsed={2}
                collapseStringsAfterLength={250}
                shouldCollapse={(field) => {
                    return false
                }}
                enableClipboard={false}
                displayObjectSize={false}
                displayDataTypes={false}
                onEdit={false}
                onAdd={false}
                onDelete={false}
            />
        );
    }
};
