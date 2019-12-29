import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

import { Provider } from "mobx-react";
import ChatStore from "./stores/ChatStore";

const store = window.store = {
    ChatStore
};

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
document.getElementById("root"));


// ReactDOM.render(
//     <App />,
// document.getElementById("root"));