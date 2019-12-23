import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "mobx-react";

import App from "./App";

import ExampleStore from "./stores/ExampleStore";

const store = window.store = {
    ExampleStore
};

const Root = (
    <Provider store={ store }>
        <App />
    </Provider>
);

ReactDOM.render(
    Root,
    document.getElementById("root")
);