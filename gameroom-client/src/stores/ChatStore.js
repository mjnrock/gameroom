import { observable, action } from "mobx";
import Chat from "./../modules/chat/package";

class ChatStore {
    @observable Messages = [];
    @observable Manager = new Chat.ChatManager();

    constructor() {
        this.Manager.on("channel-message", (target, msg, channel) => {
            this.Messages = channel.prop("Messages");

            console.log(msg);
        });

        this.Manager.SendRoom("Matt", "Hello!");
    }
}

export default new ChatStore();