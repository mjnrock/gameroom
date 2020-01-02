import React, { Component } from "react";

export default class Button extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <button
                className={ this.props.className ? this.props.className : `btn btn-primary` }
                style={ this.props.style ? this.props.style : null }
                onMouseDown={ () => this.props.src.Activate() }
                onMouseUp={ () => this.props.src.Deactivate() }
            >
                { this.props.src.prop("Name") }
            </button>
        );
    }
};