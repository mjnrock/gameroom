import React, { Component } from "react";

export default class Button extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <button
                className="btn btn-primary"
                onMouseDown={ () => this.props.src.Activate() }
                onMouseUp={ () => this.props.src.Deactivate() }
            >
                { this.props.src.prop("Name") }
            </button>
        );
    }
};