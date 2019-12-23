import React, { Component } from "react";
import { observer, inject } from "mobx";

@inject("color")
@observer
class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { ExampleStore } = this.props.store.ExampleStore;
        console.log(ExampleStore);

        return (
            <div>
                Hello!
            </div>
        );
    }
}

export default App;
