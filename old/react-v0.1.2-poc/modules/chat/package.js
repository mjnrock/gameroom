import Message from "./Message";
import Channel from "./Channel";
import GameChatManager from "./GameChatManager";

export default {
    create(parent) {
        return new GameChatManager(parent);
    },

    Message,
    Channel,
    GameChatManager
};