import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import QrReader from "react-qr-reader";
// import Lux from "@lespantsfancy/lux";

// import PeerClient from "./lib/PeerClient";

// let pc = new PeerClient();
// console.log(pc.UUID());

@inject("store")
@observer
class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            result: "No result"
        };
    }

    onScanSuccess(data) {
        if(data) {
            this.setState({
                result: data
            });
        }
    }
    onScanError(e) {
        console.log(e);
    }
    
    render() {
        //! MUST directly point to the name [ correct: console.log(ExampleStore.name), wrong: console.log(ExampleStore) // will return {} ]
        const { ExampleStore } = this.props.store;
        // console.log(ExampleStore.name);

        return (
            <div>
                {/* <QrReader
                    delay={ 300 }
                    onError={ this.onScanSuccess.bind(this) }
                    onScan={ this.onScanError.bind(this) }
                    style={{
                        width: '100%'
                    }}
                /> */}
                <p>{ this.state.result }</p>
            </div>
        )
    }
}

export default App;