import React from 'react'
import PropTypes from 'prop-types'

const LogMessage = ({logMessage}) => {
    return (
        <pre className="log"
             key={logMessage.key}
             style={
                 {
                     padding: "5px",
                     transform: "scaleX(-1)",
                     marginTop: "0",
                     marginRight: "5px",
                     marginBottom: "5px",
                     marginLeft: 0,
                     borderRadius: "2px",
                     backgroundColor: "rgb(29, 31, 33)",
                     color: "rgb(250, 250, 250)"
                 }
             }>{logMessage.value}</pre>
    )
};

LogMessage.propTypes = {
    logMessage: PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    }).isRequired
};

export default LogMessage
