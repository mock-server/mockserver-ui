import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LogMessage from "../components/LogMessage";
import ListHeader from "../components/ListHeader";

export default class LogList extends Component {
    static propTypes = {
        header: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.object.isRequired
        })).isRequired,
        logMessageMaxWidth: PropTypes.number.isRequired,
    };

    render() {
        const {
            header = "",
            items = [],
            logMessageMaxWidth = 0,
        } = this.props;
        return (
            <div style={{
                padding: "2px 0"
            }}>
                <ListHeader text={header}/>
                <div style={{
                    overflowY: "scroll",
                    maxHeight: "400px",
                    minHeight: "100px",
                    borderRadius: "5px",
                    margin: "2px 0px 3px",
                    padding: "5px",
                    backgroundColor: "rgb(29, 31, 33)",
                    color: "rgb(250, 250, 250)",
                }}>
                    <div style={
                        {
                            borderCollapse: "collapse",
                            display: "table",
                            minWidth: "100%"
                        }
                    }>
                        {items.map((item, index) => <LogMessage index={index}
                                                                      key={item.key}
                                                                      logMessage={item.value}
                                                                      logMessageMaxWidth={logMessageMaxWidth}/>)}

                    </div>
                </div>
            </div>
        );
    }
}
