import { observable, action } from "mobx";
import Chat from "./../modules/chat/package";

class ChatStore {
    @observable Room = {};
    @observable Channels = {};
    @observable Manager = new Chat.ChannelManager();

    constructor() {
        this.Manager.CreateChannel("Room");

        this.Room = {
            Channel: this.Manager.Get("Room"),
            Messages: this.Manager.Get("Room").prop("Messages")
        };

        this.Manager.on("channel-message", (target, msg, channel) => {
            let name = channel.prop("Name");

            if(name !== "Room" && !this.Channels[ name ]) {
                this.Channels[ name ] = {
                    Channel: channel,
                    Messages: channel.prop("Messages")
                };
            } else {
                if(name === "Room") {
                    this.Room.Messages = channel.prop("Messages");
                } else {
                    this.Channels[ name ].Messages = channel.prop("Messages");
                }
            }

            console.log(msg);
        });
    }
}

export default new ChatStore();