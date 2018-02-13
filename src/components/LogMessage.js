import React from 'react'
import PropTypes from 'prop-types'

const LogMessage = ({logMessage}) => {
    return (
        <div className="LogMessage">
            <pre>{logMessage}</pre>
        </div>
    )
};

LogMessage.propTypes = {
    logMessage: PropTypes.string.isRequired
};

export default LogMessage
