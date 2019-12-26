import Message from "./Message";
import Channel from "./Channel";
import ChatManager from "./ChatManager";

export default {
    create(parent) {
        return new ChatManager(parent);
    },

    Message,
    Channel,
    ChatManager
};