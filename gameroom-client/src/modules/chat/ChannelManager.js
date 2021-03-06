import Lux from "@lespantsfancy/lux";
import AModuleManager from "./../AModuleManager";

import Channel from "./Channel";

class ChannelManager extends AModuleManager {
    constructor() {
        super(
            "chat"
        );

        this.prop("Channels", {});

        this.on("channel-message");
    }

    CreateChannel(name) {
        let channels = this.prop("Channels");

        channels[ name ] = new Channel(name);        
        channels[ name ].watch("Messages", (prop, data, _this) => {
            let lastMsg = data[ data.length - 1 ];

            this.call("channel-message", channels[ name ], lastMsg);
        });

        this.prop("Channels", channels);

        return channels[ name ];
    }
    DestroyChannel(uuid, name) {
        let channels = this.prop("Channels");

        delete channels[ name ];

        this.unwatch(uuid);
        this.prop("Channels", channels);

        return this;
    }

    Get(name) {
        let channel = this.prop("Channels")[ name ];
        
        if(channel) {
            return channel;
        }
        
        return false;
    }

    /**
     * Send a Message to a Channel
     * @param {Channel|string} channel 
     * @param  {...any} payload 
     */
    Send(channel, ...payload) {
        try {
            channel = channel instanceof Channel ? channel : this.prop("Channels")[ channel ];
            
            if(channel) {
                channel.AddMessage(...payload);
            } else {
                console.log(`[Invalid Channel]`);
            }
        } catch (e) {
            console.log(`[Invalid Message]: `, e);
        }

        return this;
    }
}

export default ChannelManager;


//*     Sample Usage Code
// console.log("=================");
// const CM = ChatModule.create();
// CM.SendRoom(1, 2, 3);

// //TODO Take this sample listener and register parent on initialization
// CM.on("channel-message", (target, channel, msg) => {
//     console.log(`[${ channel.prop("Name") }][${ msg.Author }]: ${ msg.Content }`);
// });
// CM.AddTeamChannel("Cats");
// let Cats = CM.prop("Team")[ "Cats" ];
// Cats.AddMessage({
//     author: "Matt",
//     content: "Hello!"
// });
// Cats.AddMessage({
//     author: "Sarah",
//     content: "Hi there!"
// });
// let Room = CM.prop("Room");
// Room.AddMessage({
//     author: "SERVER",
//     content: "Greetings!"
// });
// CM.SendRoom("SERV3R", "H4X0rz");
// CM.SendTeam("Cats", "Author1", "Cats111");
// CM.SendTeam("Dogs", "Author2", "Cats222");
// console.log("=================");