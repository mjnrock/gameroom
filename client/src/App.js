import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Lux from "@lespantsfancy/lux";

console.log(Lux);

// import PeerClient from "./../../lib/PeerClient";

// let pc = new PeerClient();
// console.log(pc);

@inject("store")
@observer
class App extends Component {
    render() {
        //! MUST directly point to the name [ correct: console.log(ExampleStore.name), wrong: console.log(ExampleStore) // will return {} ]
        const { ExampleStore } = this.props.store;
        // console.log(ExampleStore.name);

        return (
            <div>
                Hello
            </div>
        )
    }
}

export default App;