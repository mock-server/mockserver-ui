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
                    backgroundColor: "rgb(251, 251, 251)",
                    borderRadius: "5px"
                }}>
                    {jsonItems.map((jsonItem, index) => <JsonItem index={reverseIndex ? jsonItems.length - index : index + 1} key={jsonItem.key} jsonItem={jsonItem.value}/>)}
                </div>
            </div>
        );
    }
};
