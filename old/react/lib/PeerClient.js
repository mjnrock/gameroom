import Peer from "peerjs";
import Lux from "@lespantsfancy/lux";

class PeerClient extends Lux.Core.ClassDecorators.StateEvents {
    constructor(server = null) {
        super();

        this.Server = server || {
            host: "https://192.168.86.74",
            port: 3000,
            path: "/peer"
        };
        this.Handlers = {
            Connect: {
                open: null,
                data: null,
                close: null,
                error: null
            },
            Call: {
                stream: null,
                close: null,
                error: null
            }
        };

        this.prop("Connection", {});
        this.prop("Peer", []);

        this.on("handler-register");
        this.on("handler-unregister");
        this.on("peer-open");
        this.on("peer-connection");
        this.on("peer-call");
        this.on("peer-close");
        this.on("peer-disconnected");
        this.on("peer-error");
        this.on("peer-register");
        this.on("peer-unregister");
        this.on("connection-register");
        this.on("connection-unregister");
        this.on("connection-open");
        this.on("connection-close");


        // this.prop("Me", new Peer(this.UUID(), this.Server));
        this.prop("Me", new Peer(this.UUID(), {
            ...this.Server,
            debug: 3
        }));

        this.prop("Me").on("open", peerId => {
            this.call("peer-open", peerId);
        });
        this.prop("Me").on("connection", dataConnection => {
            this.call("peer-connection", dataConnection);
        });
        this.prop("Me").on("call", mediaConnection => {
            this.call("peer-call", mediaConnection);
        });
        this.prop("Me").on("close", () => {
            //TODO Get closed ID ?
            this.call("peer-close");
        });
        this.prop("Me").on("disconnected", () => {
            //TODO Get disconnected ID ?
            this.call("peer-disconnected");
        });
        this.prop("Me").on("error", error => {
            this.call("peer-error", error);
        });
    }

    SeedHandler(fn) {
        if(typeof fn === "function") {
            fn(this.Handlers, this);
        }

        return this;
    }

    RegisterHandler(event, fn, domain = "Connect") {
        if(typeof fn === "function") {
            this.Handlers[ domain ][ event ] = fn;
            this.call("handler-register", event, fn, domain);
        }

        return this;
    }
    UnregisterHandler(event, domain = "Connect") {
        this.Handlers[ domain ][ event ] = null;
        this.call("handler-unregister", event, domain);

        return this;
    }

    Connect(peerId) {
        if(!this.HasPeer(peerId)) {
            this.RegisterPeer(peerId);
        }

        let me = this.prop("Me"),
            conn = me.connect(peerId);

        if(typeof this.Handlers.Connect.open === "function") {
            conn.on("open", this.Handlers.Connect.open.bind(this));
        }
        if(typeof this.Handlers.Connect.data === "function") {
            conn.on("data", this.Handlers.Connect.data.bind(this));
        }
        if(typeof this.Handlers.Connect.close === "function") {
            conn.on("close", this.Handlers.Connect.close.bind(this));
        }
        if(typeof this.Handlers.Connect.error === "function") {
            conn.on("error", this.Handlers.Connect.error.bind(this));
        }

        this.call("connection-open", peerId, conn);
        this.RegisterConnection(peerId, conn);

        return this;
    }
    Disconnect(peerId) {
        this.UnregisterPeer(peerId);
        let conn = this.UnregisterConnection(peerId);

        conn.close();

        return this;
    }

    HasPeer(peerId) {
        return this.prop("Peer").includes(peerId);
    }
    RegisterPeer(peerId) {
        let peers = this.prop("Peer");

        peers.push(peerId);
        this.call("peer-register", peerId);

        return this.prop("Peer", peers);
    }
    UnregisterPeer(peerId) {
        let peers = this.prop("Peer");

        peers = peers.filter(p => p !== peerId);
        this.call("peer-unregister", peerId);

        this.prop("Peer", peers);

        return peerId;
    }

    //  These only currently allow for 1 connection per peer (e.g. MediaConnection XOR DataConnection)
    RegisterConnection(peerId, conn) {
        let conx = this.prop("Connection");

        conx[ peerId ] = conn;
        this.call("connection-register", peerId, conn);

        return this.prop("Connection", conx);
    }
    UnregisterConnection(peerId) {
        let conx = this.prop("Connection"),
            conn = conx[ peerId ];

        delete conx[ peerId ];
        this.call("connection-unregister", peerId);

        this.prop("Connection", conx);

        return conn;
    }
}

export default PeerClient;