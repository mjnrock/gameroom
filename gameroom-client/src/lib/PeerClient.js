import Peer from "peerjs";
import Lux from "@lespantsfancy/lux";

class PeerClient extends Lux.Core.ClassDecorators.StateEvents {
    constructor(server = null) {
        super();

        // this.prop("ID", Lux.Core.Helper.GenerateUUID());
        this.prop("ID", +(Math.floor(Math.random() * 100)));

        this.Config = server || {
            host: "192.168.86.97",
            port: 3001,
            path: "/peer"
        };
        this.Connector = new Peer(this.prop("ID"), {
            ...this.Config,
            debug: 3
        });

        this.Connector.on("connection", dataConn => {
            this.Register(dataConn.peer, dataConn);
        });
        // this.Connector.on("disconnected", dataConn => {
        //    // TODO Get disconnected ID ?
        //     this.Unregister(dataConn._id);
        // });

        this.prop("Peers", []);
        this.prop("Connections", {});

        this.on("json-message");
    }

    ReceiveJSON(json) {
        try {
            let obj = json;
    
            while(typeof obj === "string" || obj instanceof String) {
                obj = JSON.parse(json);
            }
    
            this.call("json-message", obj);
        } catch(e) {
            console.log("Could not parse message");
        }

        return this;
    }
    SendJSON(peerId, msg) {
        if(this.HasConnection(peerId)) {
            let conn = this.prop("Connections")[ peerId ];

            while(!(typeof msg === "string" || msg instanceof String)) {
                msg = JSON.stringify(msg);
            }

            conn.send(msg);
        }

        return this;
    }
    BroadcastJSON(msg) {
        for(let uuid in this.prop("Connections")) {
            this.SendJSON(uuid, msg);
        }

        return this;
    }

    
    Connect(peerId, serialization = "json") {
        try {
            let conn = this.Connector.connect(peerId, {
                serialization
            });
    
            this.Register(peerId, conn);
        } catch(e) {
            console.log(`[Connection Failed]: `, e);
        }

        return this;
    }
    Disconnect(peerId) {
        try {
            let conn = this.prop("Connections")[ peerId ];
    
            if(conn.open) {
                conn.close();
            }
        } catch(e) {
            console.log(`[Closure Failure]: `, e);
        }

        this.Unregister(peerId);

        return this;
    }

    Register(peerId, conn = null) {
        this.RegisterPeer(peerId);
        this.RegisterConnection(peerId, conn);

        return this;
    }
    Unregister(peerId) {
        this.UnregisterPeer(peerId);
        this.UnregisterConnection(peerId);

        return this;
    }

    HasPeer(peerId) {
        return this.prop("Peers").includes(peerId);
    }
    RegisterPeer(peerId) {
        if(!this.HasPeer(peerId)) {
            this.prop("Peers").push(peerId);
        }

        return this;
    }
    UnregisterPeer(peerId) {
        this.prop("Peers", this.prop("Peers").filter(p => p !== peerId));

        return this;
    }

    HasConnection(peerId) {
        return Object.keys(this.prop("Connections")).includes(peerId);
    }
    RegisterConnection(peerId, conn) {
        if(!this.HasConnection(peerId)) {
            conn.on("data", this.ReceiveJSON.bind(this));

            console.log(conn)

            this.prop("Connections")[ peerId ] = conn;
        }

        return this;
    }
    UnregisterConnection(peerId) {
        delete this.prop("Connections")[ peerId ];

        return this;
    }
}

export default PeerClient;