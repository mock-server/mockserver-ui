import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ListHeader extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired
    };

    render() {
        const {
            text = ""
        } = this.props;
        return (
            <div style={{
                font: "1.25em 'Averia Sans Libre', 'Gloria Hallelujah', 'Indie Flower', Helvetica, Arial, sans-serif",
                marginTop: "0",
                marginRight: "0",
                marginBottom: "3px",
                marginLeft: "2px"
            }}>{text}</div>
        )
    }
};
