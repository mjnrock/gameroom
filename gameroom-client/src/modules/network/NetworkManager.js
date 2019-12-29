import Lux from "@lespantsfancy/lux";
import AModuleManager from "../AModuleManager";

import Enum from "./enum/package";
import Connector from "./connector/package";

import Packet from "./Packet";

// class NetworkManager extends Lux.Core.ClassDecorators.StateEvents {
class NetworkManager extends AModuleManager {
    constructor(mode = Enum.NetworkMode.P2P) {
        super(
            "network"
        );

        if(mode === Enum.NetworkMode.P2P) {            
            this.prop("Mode", Enum.NetworkMode.P2P);
            this.prop("Connector", new Connector.PeerClient());
            this.prop("ConnectorID", this.prop("Connector").prop("ID"));

            this.prop("Connector").listen("json-data", ([ connector, pkt ]) => {
                this.ReceivePacket(pkt);
            });
        }

        this.on("packet-send");
        this.on("packet-receive");
        this.on("packet-broadcast");
        this.on("message-extraction");
    }

    ConnectToPeer(peerId, server = null) {
        this.prop("Connector").Connect(peerId);
    }

    BroadcastPacket(msg) {
        let packet = new Packet(
            this.prop("Connector").prop("ID"),
            "*",
            msg
        );

        this.call("packet-broadcast", packet);

        this.prop("Connector").BroadcastJSON(packet.toJSON());

        return this;
    }
    SendPacket(receiver, msg) {
        let packet = new Packet(
            this.prop("Connector").prop("ID"),
            receiver,
            msg
        );

        this.call("packet-send", packet);

        this.prop("Connector").SendJSON(receiver, packet.toJSON());

        return this;
    }
    ReceivePacket(packet) {
        let pkt = Packet.fromJSON(packet),
            msg = pkt.Payload.Data;

        this.call("packet-receive", packet);
        this.call("message-extraction", msg);

        return this;
    }
}

export default NetworkManager;