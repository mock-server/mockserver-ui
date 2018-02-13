import React from 'react'
import PropTypes from 'prop-types'
import JsonItem from "../components/JsonItem"

const JsonList = ({jsonItems}) => {
    return (
        <div id="style-5" style={{
            overflowY: "scroll",
            maxHeight: "400px",
            transform: "scaleX(-1)",
            backgroundColor: "rgb(251, 251, 251)",
            borderRadius: "5px"
        }}>
            {jsonItems.map((jsonItem) => <JsonItem jsonItem={jsonItem} />)}
        </div>
    )
};

JsonList.propTypes = {
    jsonItems: PropTypes.array.isRequired
};

export default JsonList
