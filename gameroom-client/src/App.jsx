import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class App extends Component {
    constructor(props) {
        super(props);

        this.inpChatMessage = React.createRef();
    }

    OnChatSend(e) {
        const ChatManager = this.props.store.ChatStore.Manager;

        if(e.which === 13) {
            let message = this.inpChatMessage.current.value;

            ChatManager.SendRoom("Matt", message);

            this.inpChatMessage.current.value = null;
        }
    }

    render() {
        const { ChatStore } = this.props.store;

        return (
            <div>
                <ul id="chat-messages" className="list-group">
                    {
                        ChatStore.Messages.map((msg, i) => (
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
                    type="text"
                    id="chat-send"
                    className="form-control"
                    onKeyUp={ this.OnChatSend.bind(this) }
                    ref={ this.inpChatMessage }
                />
            </div>
        );
    }
} export default App;