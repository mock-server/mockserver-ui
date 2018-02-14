import React from 'react'
import PropTypes from 'prop-types'
import JsonItem from "../components/JsonItem"

const JsonList = ({jsonItems, header}) => {
    return (
        <div style={{
            padding: "2px 1%"
        }}>
            <div className="header">{header}</div>
            <div id="style-5" style={{
                overflowY: "scroll",
                maxHeight: "400px",
                minHeight: "100px",
                transform: "scaleX(-1)",
                backgroundColor: "rgb(251, 251, 251)",
                borderRadius: "5px"
            }}>
                {jsonItems.map((jsonItem) => <JsonItem jsonItem={jsonItem} />)}
            </div>
        </div>
    )
};

JsonList.propTypes = {
    jsonItems: PropTypes.array.isRequired,
    header: PropTypes.string.isRequired
};

export default JsonList
