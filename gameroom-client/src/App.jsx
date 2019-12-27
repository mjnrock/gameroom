import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import PeerClient from "./lib/PeerClient";
import Message from "./modules/chat/Message";

import Game from "./modules/game/package";

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

        this.QuestionGroup = new Game.Model.Question.QuestionGroup();
        this.QuestionGroup.AddQuestion(new Game.Model.Question.Question(
            [
                Game.Model.Question.Enum.QuestionRewardType.QUESTION_VALUE,
                Game.Model.Question.Enum.QuestionValidator.Type.MAX_RESPONSE_VALUE,
            ],
            "Lorem ipsum dolor sit amet.",
            [
                new Game.Model.Question.QuestionChoice("Choice A", 0),
                new Game.Model.Question.QuestionChoice("Choice B", 0),
                new Game.Model.Question.QuestionChoice("Choice C", 0),
                new Game.Model.Question.QuestionChoice("Choice D", 1)
            ],
            {
                value: 50
            }
        ));
        this.QuestionGroup.AddQuestion(new Game.Model.Question.Question(
            [
                Game.Model.Question.Enum.QuestionRewardType.RESPONSE_VALUE,
                Game.Model.Question.Enum.QuestionValidator.Type.MAX_RESPONSE_VALUE,
            ],
            "Consequatur nostrum voluptates itaque quod omnis explicabo ducimus, voluptatem quam! Repellat, illo?",
            [
                new Game.Model.Question.QuestionChoice("Choice A", 0),
                new Game.Model.Question.QuestionChoice("Choice B", 0),
                new Game.Model.Question.QuestionChoice("Choice C", 0),
                new Game.Model.Question.QuestionChoice("Choice D", 1)
            ]
        ));
        this.QuestionGroup.AddQuestion(new Game.Model.Question.Question(
            [
                Game.Model.Question.Enum.QuestionRewardType.RESPONSE_VALUE,
                Game.Model.Question.Enum.QuestionValidator.Type.MAX_RESPONSE_VALUE,
            ],
            "This is a different sample question",
            [
                new Game.Model.Question.QuestionChoice("Choice A", 0),
                new Game.Model.Question.QuestionChoice("Choice B", 0),
                new Game.Model.Question.QuestionChoice("Choice C", 0),
                new Game.Model.Question.QuestionChoice("Choice D", 1)
            ]
        ));


        this.Round = new Game.Model.Question.Round(this.QuestionGroup);
        
        //  Question 1 (i = 0)
        this.Round.AddResponse("Matt", this.Round.QuestionGroup.Questions[ 0 ].Choices[ 0 ].UUID);
        this.Round.AddResponse("Sarah", this.Round.QuestionGroup.Questions[ 0 ].Choices[ 1 ].UUID);
        this.Round.NextQuestion();

        //  Question 2 (i = 1)
        this.Round.AddResponse("Matt", this.Round.QuestionGroup.Questions[ 1 ].Choices[ 2 ].UUID);
        this.Round.AddResponse("Sarah", this.Round.QuestionGroup.Questions[ 1 ].Choices[ 3 ].UUID);
        this.Round.NextQuestion();

        //  Question 3 (i = 2)
        this.Round.AddResponse("Matt", this.Round.QuestionGroup.Questions[ 2 ].Choices[ 3 ].UUID);
        this.Round.AddResponse("Sarah", this.Round.QuestionGroup.Questions[ 2 ].Choices[ 2 ].UUID);
        
        console.log(this.Round);
        console.log(this.Round.GetScores([
            "Matt",
            "Sarah"
        ]));
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