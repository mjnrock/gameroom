import Lux from "@lespantsfancy/lux";
import Message from "./Message";

class Channel extends Lux.Core.ClassDecorators.StateEvents {
    constructor(name) {
        super();

        this.prop("Name", name);
        this.prop("Messages", []);
        this.prop("Members", []);
    }

    SyncChannel(messages) {        
        // console.log("****************************");
        // console.log("INSIDE");
        // console.log("****************************");

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
        
        // console.log("****************************");
        // console.log(A);
        // console.log(B);
        // console.log(Auuid);
        // console.log(Buuid);
        // console.log(Bo);
        // console.log(diff);
        // console.log("****************************");

        this.prop("Messages", A);

        return this;
    }

    AddMessage(msg) {
        let messages = this.prop("Messages");

        if(msg instanceof Message) {
            messages.push(msg);

            this.prop("Messages", messages);
        } else if(typeof msg === "object") {
            if(msg.Author && msg.Content) {
                return this.AddMessage(Message.fromJSON(msg));
            }

            return false;
        } else if(arguments.length > 1) {
            return this.AddMessage(new Message(...arguments));
        }

        return this;
    }

    AddMember(uuid) {
        
        return this;
    }
    RemoveMember(uuid) {

        return this;
    }
}

export default Channel;