import Lux from "@lespantsfancy/lux";
import Message from "./Message";

class Channel extends Lux.Core.ClassDecorators.StateEvents {
    constructor(name) {
        super();

        this.prop("Name", name);
        this.prop("Messages", []);
        this.prop("Members", []);
    }

    AddMessage(msg) {
        let messages = this.prop("Messages");

        if(msg instanceof Message) {
            messages.push(msg);

            this.prop("Messages", messages);
        } else if(typeof msg === "object") {
            if(msg.author && msg.content) {
                return this.AddMessage(new Message(msg.author, msg.content));
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