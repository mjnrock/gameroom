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
        this.PeerClient.Handlers.Connect.data = data => {
            try {
                let obj = JSON.parse(data);

                if(obj.Channel === "Room") {
                    const ChatManager = this.props.store.ChatStore.Manager;

                    ChatManager.SendRoom(obj.Message);
                }
            } catch(e) {
                console.log("Error parsing JSON from Peer data");
            }
        };
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
            let message = this.inpChatMessage.current.value;

            ChatManager.SendRoom(this.PeerClient.UUID(), message);  // Load into local message queue
            this.PeerClient.BroadcastConnect({                      // Send to peer message queue
                Channel: "Room",
                Message: new Message(this.PeerClient.UUID(), message)
            });

            this.inpChatMessage.current.value = null;
        }
    }

    render() {
        const { ChatStore } = this.props.store;

        return (
            <div>
                <div className="container">
                    <h3>{ this.PeerClient.UUID() }</h3>

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
                                <li className="list-group-item" key={ i }>
                                    <div>
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