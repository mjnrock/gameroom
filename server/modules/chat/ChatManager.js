import AModuleManager from "./../AModuleManager";
import Channel from "./Channel";

class ChatManager extends AModuleManager {
    constructor(parent) {
        super(
            "chat",
            "Chat",
            parent
        );

        this.prop("Room", new Channel("Room"));
        this.prop("Team", {});
        this.prop("Player", {});

        this.on("channel-message");

        this.mappings = {};
        
        this.InitializeRoom();
    }

    InitializeRoom() {
        let Room = this.prop("Room");

        let uuid = Room.watch("Messages", (prop, data, _this) => {
            let lastMsg = data[ data.length - 1 ];

            this.call("channel-message", lastMsg, Room);
        });

        this.mappings[ uuid ] = "Messages";
    }

    CreateChannel(prop, name) {
        let channels = this.prop(prop);

        channels[ name ] = new Channel(name);

        this.prop(prop, channels);
        
        let uuid = channels[ name ].watch("Messages", (prop, data, _this) => {
            let lastMsg = data[ data.length - 1 ];

            this.call("channel-message", lastMsg, channels[ name ]);
        });

        this.mappings[ uuid ] = "Messages";

        return channels[ name ];
    }
    DestroyChannel(uuid, prop, name) {
        let channels = this.prop(prop);

        delete channels[ name ];

        this.prop(prop, channels);
        this.unwatch(this.mappings[ uuid ], uuid);

        delete this.mappings[ uuid ];

        return this;
    }

    AddTeamChannel(team) {
        return this.CreateChannel("Team", team);
    }
    RemoveTeamChannel(uuid, team) {
        return this.DestroyChannel(uuid, "Team", team);
    }
    AddPlayerChannel(player) {
        return this.CreateChannel("Player", player);
    }
    RemovePlayerChannel(player) {
        return this.DestroyChannel(uuid, "Player", player);
    }

    SendRoom(a, b, c) {
        console.log(a);
        console.log(b);
        console.log(c);

        return this;
    }
    SendTeam(team, msg) {
        //TODO 

        return this;
    }
    SendPlayer(player, msg) {
        //TODO 

        return this;
    }
}

export default ChatManager;