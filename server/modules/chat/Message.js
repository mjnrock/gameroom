import { GenerateUUID } from "./../../lib/helper";

class Message {
    constructor(author, content, ts = null) {
        this.UUID = GenerateUUID();
        this.Author = author;
        this.Content = content;
        this.Timestamp = ts || Date.now();
    }
}

export default Message;