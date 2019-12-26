import Lux from "@lespantsfancy/lux";

class Message {
    constructor(author, content, ts = null) {
        this.UUID = Lux.Core.Helper.GenerateUUID();
        this.Author = author;
        this.Content = content;
        this.Timestamp = ts || Date.now();
    }

    static fromJSON(json) {
        let obj = json;

        while(typeof obj === "string" || obj instanceof String) {
            obj = JSON.parse(obj);
        }

        let msg = new Message(obj.Author, obj.Content, obj.Timestamp);
        msg.UUID = obj.UUID;

        return msg;
    }
}

export default Message;