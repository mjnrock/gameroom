import Lux from "@lespantsfancy/lux";

class Packet {
    constructor(sender, receiver, data) {
        this.UUID = Lux.Core.Helper.GenerateUUID();
        this.Type = "Network.Packet";
        this.Sender = sender;
        this.Receiver = receiver;
        this.Payload = {
            Type: "json",
            Data: data
        };
        this.Timestamp = Date.now();

        return Object.freeze(this);
    }

    toJSON() {
        return JSON.stringify({
            UUID: this.UUID,
            Type: this.Type,
            Sender: this.Sender,
            Receiver: this.Receiver,
            Payload: this.Payload,
            Timestamp: this.Timestamp
        });
    }

    static fromJSON(json) {
        let obj = json;

        while(typeof obj === "string" || obj instanceof String) {
            obj = JSON.parse(obj);
        }

        let msg = new Packet(
            obj.Sender,
            obj.Receiver,
            obj.Payload
        );

        return msg;
    }
}

export default Packet;