import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import PeerClient from "./lib/PeerClient";
import Message from "./modules/chat/Message";

@inject("store")
@observer
class App extends Component {
    constructor(props) {
        super(props);

        this.inpConnectPeer = React.createRef();
        this.inpChatMessage = React.createRef();

        this.PeerClient = new PeerClient();
        this.PeerClient.listen("json-message", ([ target, message ]) => {
            this.RouteMessage(message);
        })
    }


    RouteMessage(msg) {
        if(msg.Type === "ChatMessage") {
            const ChatManager = this.props.store.ChatStore.Manager;

            ChatManager.SendRoom(msg.Message);
        }
    }
    
    OnConnectPeer(e) {
        const ChatManager = this.props.store.ChatStore.Manager;

        if(e.which === 13) {
            let peerId = this.inpConnectPeer.current.value;

            this.PeerClient.Connect(peerId);
        }
    }

    OnChatSend(e) {
        const ChatManager = this.props.store.ChatStore.Manager;

        if(e.which === 13) {
            let message = new Message(this.PeerClient.prop("ID"), this.inpChatMessage.current.value);

            ChatManager.SendRoom(message);  // Load into local message queue
            this.PeerClient.BroadcastJSON({                      // Send to peer message queue
                Type: "ChatMessage",
                Channel: "Room",
                // Message: new Message(this.PeerClient.UUID(), message)
                Message: message
            });

            this.inpChatMessage.current.value = null;
        }
    }

    render() {
        const { ChatStore } = this.props.store;

        return (
            <div>
                <div className="container">
                    <h3>{ this.PeerClient.prop("ID") }</h3>
                    {/* <h3>{ this.PeerClient.UUID() }</h3> */}

                    <input
                        className="form-control mt2"
                        id="chat-send"
                        type="text"
                        ref={ this.inpConnectPeer }
                        onKeyUp={ this.OnConnectPeer.bind(this) }
                    />
                </div>

                <hr />

                <div className="container">
                    <h3>{ ChatStore.Room.Channel.prop("Name") }</h3>

                    <ul id="chat-messages" className="list-group">
                        {
                            ChatStore.Room.Messages.map((msg, i) => (
                                <li className={ `list-group-item pa0 bn` } key={ i }>
                                    <div className={ `mb1 alert ${ msg.Author === this.PeerClient.prop("ID") ? "alert-primary" : "alert-secondary" }` }>
                                        <span className="b">[{ msg.Author }]:&nbsp;</span>
                                        <span>{ msg.Content }</span>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>

                    <input
                        className="form-control mt2"
                        id="chat-send"
                        type="text"
                        ref={ this.inpChatMessage }
                        onKeyUp={ this.OnChatSend.bind(this) }
                    />
                </div>
            </div>
        );
    }
} export default App;