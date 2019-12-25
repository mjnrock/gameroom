import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
class Controller extends Component {
    render() {
        //! MUST directly point to the name [ correct: console.log(ExampleStore.name), wrong: console.log(ExampleStore) // will return {} ]
        const { ExampleStore } = this.props.store;
        // console.log(ExampleStore.name);

        return (
            <div>
                <div
                    id="peer-id"
                    class="form-control"
                ></div>
        
                <input id="connection-id" type="text" />
        
                <button id="data-send" class="btn btn-lg btn-primary">Send</button>
            </div>
        )
    }
}

export default Controller;