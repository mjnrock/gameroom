import Lux from "@lespantsfancy/lux";

// import AManager from "./../AManager";

import Channel from "./Channel";
import Message from "./Message";

class ChatManager extends Lux.Core.ClassDecorators.StateEvents {
    constructor() {
        super();
    // constructor(parent) {
    //     super(
    //         "chat",
    //         "Chat",
    //         parent
    //     );

        this.prop("Room", new Channel("Room"));
        this.prop("Team", {});
        // this.prop("Player", {});

        this.on("channel-message");
        
        // this.MassSubcribeParent([
        //     "channel-message"   //  => [ this, last message, channel ]
        // ]);
        this.InitializeRoom();
    }

    InitializeRoom() {
        let Room = this.prop("Room"),
            uuid = Room.watch("Messages", (prop, data, _this) => {
                let lastMsg = data[ data.length - 1 ];

                this.call("channel-message", lastMsg, Room);
            });
    }

    CreateChannel(prop, name) {
        let channels = this.prop(prop);

        channels[ name ] = new Channel(name);

        this.prop(prop, channels);
        
        let uuid = channels[ name ].watch("Messages", (prop, data, _this) => {
            let lastMsg = data[ data.length - 1 ];

            this.call("channel-message", lastMsg, channels[ name ]);
        });

        return channels[ name ];
    }
    DestroyChannel(uuid, prop, name) {
        let channels = this.prop(prop);

        delete channels[ name ];

        this.prop(prop, channels);
        this.unwatch(this.mappings[ uuid ], uuid);

        return this;
    }

    AddTeamChannel(team) {
        return this.CreateChannel("Team", team);
    }
    RemoveTeamChannel(uuid, team) {
        return this.DestroyChannel(uuid, "Team", team);
    }
    // AddPlayerChannel(player) {
    //     return this.CreateChannel("Player", player);
    // }
    // RemovePlayerChannel(player) {
    //     return this.DestroyChannel(uuid, "Player", player);
    // }

    SendRoom() {
        try {
            this.prop("Room").AddMessage(...arguments);
        } catch (e) {
            console.log(`[Invalid Message]: Nah.`, e);
        }

        return this;
    }
    SendTeam(team, ...msg) {
        try {
            this.prop("Team")[ team ].AddMessage(...msg);
        } catch (e) {
            console.log(`[Invalid Team]: "${ team }" does not exist.`);
        }

        return this;
    }
    // SendPlayer(player, ...msg) {
    //     try {
    //         this.prop("Player")[ player ].AddMessage(...msg);
    //     } catch (e) {
    //         console.log(`[Invalid Player]: "${ player }" does not exist.`);
    //     }

    //     return this;
    // }
}

export default ChatManager;


//*     Sample Usage Code
// console.log("=================");
// const CM = ChatModule.create();
// CM.SendRoom(1, 2, 3);

// //TODO Take this sample listener and register parent on initialization
// CM.on("channel-message", (target, msg, channel) => {
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