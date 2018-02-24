import React, {Component} from 'react';
import PropTypes from 'prop-types';
import JsonItem from "../components/JsonItem";
import ListHeader from "../components/ListHeader";

export default class JsonList extends Component {
    static propTypes = {
        jsonItems: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.object.isRequired
        })).isRequired,
        header: PropTypes.string.isRequired
    };

    render() {
        const {
            jsonItems = [],
            header = "",
            reverseIndex = true
        } = this.props;
        return (
            <div style={{
                padding: "2px 0"
            }}>
                <ListHeader text={header} />
                <div style={{
                    overflowY: "scroll",
                    maxHeight: "400px",
                    minHeight: "100px",
                    borderRadius: "5px",
                    padding: "10px",
                    backgroundColor: "rgb(29, 31, 33)",
                    color: "rgb(250, 250, 250)",
                }}>
                    {jsonItems.map((jsonItem, index) => <JsonItem index={reverseIndex ? jsonItems.length - index : index + 1} key={jsonItem.key} jsonItem={jsonItem.value}/>)}
                </div>
            </div>
        );
    }
};
