import Lux from "@lespantsfancy/lux";
import Message from "./Message";

class Channel extends Lux.Core.ClassDecorators.StateEvents {
    constructor(name) {
        super();

        this.prop("Name", name);
        this.prop("Messages", []);
        this.prop("Members", {});
        
        this.on("sync");
        this.on("message");
        this.on("member-add");
        this.on("member-remove");
    }

    SyncChannel(messages) {
        let A = this.prop("Messages"),
            B = messages,
            Auuid = A.map(m => m.UUID),
            Buuid = B.map(m => m.UUID),
            Bo = {};
        
        B.forEach(m => Bo[ m.UUID ] = m);

        let diff = Buuid.filter(x => !Auuid.includes(x));

        for(let key in diff) {
            A.push(Bo[ diff[ key ] ]);
        }

        this.prop("Messages", A);

        this.call("sync", this);

        return this;
    }

    AddMessage(msg) {
        if(!/.*\S.*/gmi.test(msg)) {
            return false;
        }

        let messages = this.prop("Messages");

        if(msg instanceof Message) {
            messages.push(msg);

            this.prop("Messages", messages);
            
            this.call("message", msg, this);
        } else if(typeof msg === "object") {
            if(msg.Author && msg.Content) {
                this.call("message", msg, this);

                return this.AddMessage(Message.fromJSON(msg));
            }

            return false;
        } else if(arguments.length > 1) {
            return this.AddMessage(new Message(...arguments));
        }

        return this;
    }

    AddMember(uuid, {
        user = null
    } = {}) {
        let members = this.prop("Members");
        
        members[ uuid ] = {
            UUID: uuid,
            Username: user
        };

        this.prop("Members", members);

        this.call("member-add", uuid, members[ uuid ]);
        
        return this;
    }
    RemoveMember(uuid) {
        let members = this.prop("Members");
        
        delete members[ uuid ];

        this.prop("Members", members);
        
        this.call("member-remove", uuid, members[ uuid ]);

        return this;
    }
}

export default Channel;