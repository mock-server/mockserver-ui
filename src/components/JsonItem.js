import React from 'react'
import PropTypes from 'prop-types'
import ReactJson from 'react-json-view'

const JsonItem = ({jsonItem}) => {
    return (
        <ReactJson
            key={jsonItem.key}
            src={jsonItem.value}
            style={
                {
                    padding: "10px",
                    transform: "scaleX(-1)",
                    marginRight: "3px"
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
    )
};

JsonItem.propTypes = {
    jsonItem: PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.object.isRequired
    }).isRequired
};

export default JsonItem
