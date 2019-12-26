import Lux from "@lespantsfancy/lux";

class Message {
    constructor(author, content, ts = null) {
        this.UUID = Lux.Helper.GenerateUUID();
        this.Author = author;
        this.Content = content;
        this.Timestamp = ts || Date.now();
    }
}

export default Message;