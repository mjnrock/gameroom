import { observable } from "mobx";
import Chat from "./../modules/chat/package";

class ChatStore {
    @observable manager = new Chat.ChatManager();
}

export default new ChatStore();