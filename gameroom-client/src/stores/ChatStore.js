import { observable, action } from "mobx";

class ChatStore {
    @observable Messages = {};  // Message[ Channel.prop("Name") ]<Chat.Message[]>

    constructor() {        
        this.Messages[ "Lobby" ] = [];
    }    

    @action
    AddMessage(channel, msg) {
        if(!Array.isArray(this.Messages[ channel ])) {
            this.Messages[ channel ] = [];
        }

        this.Messages[ channel ].push(msg);
    }
}

export default new ChatStore();