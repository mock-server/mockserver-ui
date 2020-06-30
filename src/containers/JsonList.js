import React, {Component} from 'react';
import PropTypes from 'prop-types';
import JsonItem from "../components/JsonItem";
import ListHeader from "../components/ListHeader";

export default class JsonList extends Component {
    static propTypes = {
        header: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            value: PropTypes.object.isRequired
        })).isRequired,
    };

    render() {
        const {
            header = "",
            items = [],
            reverseIndex = true
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
                    {items.map((item, index) => <JsonItem index={reverseIndex ? items.length - index : index + 1}
                                                              key={item.key}
                                                              description={item.description}
                                                              jsonItem={item.value}/>)}
                </div>
            </div>
        );
    }
};
