import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class App extends Component {
    render() {
        return (
            <div>
                <ul id="chat-messages">

                </ul>
                <input type="text" id="chat-send" className="form-control" />
            </div>
        );
    }
} export default App;