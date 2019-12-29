import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Tone from "tone";

import PeerClient from "./lib/PeerClient";
import Chat from "./modules/chat/package";

import Demo from "./app/demo/package";

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
        });

        this.ChannelManager = new Chat.ChannelManager();
        this.ChannelManager.CreateChannel("Room");

        //? Using MobX
        this.ChannelManager.listen("channel-message", ([ cm, msg, channel]) => {
            this.props.store.ChatStore.AddMessage(channel.prop("Name"), msg);
        });

        //? Using this.state
        // this.ChannelManager.listen("channel-message", ([ cm, msg, channel]) => {
        //     let messages = this.state[ channel.prop("Name") ] || [];
        //     messages.push(msg);

        //     this.setState({
        //         [ channel.prop("Name") ]: messages
        //     });
        // });

        // this.state = {
        //     Room: []
        // };

        //  ------- DEMO -------
        let Trivia = new Demo.Trivia.App();
        console.log(Trivia);
        
        this.PeerClient.listen("json-message", ([ target, message ]) => {
            Trivia.Handler.ReceiveMessage(message);
        });
        //  ----- END DEMO -----
    }

    SendSound() {
        //a 4 voice Synth
        var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();
        //play a chord
        polySynth.triggerAttackRelease(["C4", "E4", "G4", "B4"], "0.2");

        // var loop = new Tone.Loop(function(time) {
        //     polySynth.triggerAttackRelease(["C4", "E4", "G3", "A3"], "2n", time);
        // }, "2n");
        // loop.start("1m").stop("4m");
        // Tone.Transport.start();

        // console.log(polySynth.context);
    }


    RouteMessage(msg) {
        if(msg.Type === "ChatMessage") {
            this.ChannelManager.Send("Room", msg.Message);
        }
    }
    
    OnConnectPeer(e) {
        if(e.which === 13) {
            let peerId = this.inpConnectPeer.current.value;

            this.PeerClient.Connect(peerId);
        }
    }

    OnChatSend() {
        let message = new Chat.Message(this.PeerClient.prop("ID"), this.inpChatMessage.current.value);

        this.ChannelManager.Send("Room", message);  // Load into local message queue
        this.PeerClient.BroadcastJSON({                      // Send to peer message queue
            Type: "ChatMessage",
            Channel: "Room",
            // Message: new Message(this.PeerClient.UUID(), message)
            Message: message
        });

        this.inpChatMessage.current.value = null;
    }

    componentDidUpdate() {
        this.SendSound();
    }

    render() {
        const { ChatStore } = this.props.store;

        return (
            <div>
                <button
                    id="sound-btn"
                    className="btn btn-lg btn-primary"
                    style={{
                        width: "100%",
                        height: "200px"
                    }}
                    onClick={ this.SendSound.bind(this) }
                >Sound!</button>

                <div className="container">
                    <h3>{ this.PeerClient.prop("ID") }</h3>
                    {/* <h3>{ this.PeerClient.UUID() }</h3> */}

                    <input
                        className="form-control mt2"
                        id="chat-send"
                        type="number"
                        ref={ this.inpConnectPeer }
                        onKeyUp={ this.OnConnectPeer.bind(this) }
                    />
                </div>

                <hr />

                <div className="container">
                    <h3>{ this.ChannelManager.Get("Room").Name }</h3>

                    <ul id="chat-messages" className="list-group">
                        {
                            // this.state[ "Room" ].map((msg, i) => (
                            ChatStore.Messages[ "Room" ].map((msg, i) => (
                            // this.ChannelManager.Get("Room").prop("Messages").map((msg, i) => (
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
                        onKeyUp={ (e) => {
                            if(e.which === 13) {
                                this.OnChatSend();
                            }
                        }}
                    />
                    <button
                        className="btn btn-lg btn-primary"
                        onClick={ this.OnChatSend.bind(this) }
                    >
                        Send
                    </button>
                </div>
            </div>
        );
    }
} export default App;