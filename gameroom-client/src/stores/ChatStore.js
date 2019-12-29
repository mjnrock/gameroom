import { observable, action } from "mobx";

class ChatStore {
    @observable Messages = {};

    constructor() {        
        this.Messages[ "Room" ] = [];
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