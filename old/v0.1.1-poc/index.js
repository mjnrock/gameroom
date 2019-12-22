const express = require("express");
const server = express();
const expressWs = require("express-ws")(server);
const aWss = expressWs.getWss("/");
const QRCode = require("qrcode");

function GenerateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const App = {
    UUID: GenerateUUID(),
    Server: {
        Port: 3000,
        IP: null,
        QRCode: {
            Controller: null,
            Viewport: null
        }
    },
    Loop: null,
    Clients: {},
    Size: {
        Width: 1000,
        Height: 500
    },

    Games: {
        [ GenerateUUID() ]: {
            Title: "Game 1",
            Players: [ 2, 4 ],  // [ min, max ]
            TeamSize: [ 1, 2 ]  // [ min, max ]
        },
        [ GenerateUUID() ]: {
            Title: "Game 2",
            Players: [ 4, 4 ],  // [ min, max ]
            TeamSize: [ 2, 2 ]  // [ min, max ]
        },
        [ GenerateUUID() ]: {
            Title: "Game 3",
            Players: [ 4, 16 ],  // [ min, max ]
            TeamSize: [ 2, 4 ]  // [ min, max ]
        }
    },
    ActiveGame: {
        Score: {
            1: 0,
            2: 0
        },
        Ball: {
            X: 0,
            Y: 0,
            Hx: true,
            Hy: true
        },
        Players: {
            1: {
                X: 0,
                Y: 0
            },
            2: {
                X: 0,
                Y: 0
            }
        }
    }
};
require("dns").lookup(require("os").hostname(), function(err, ip, fam) {
    App.Server.IP = ip;
    QRCode
        .toDataURL(`http://${ ip }:${ App.Server.Port }`, { errorCorrectionLevel: "H" })    // { ..., width: # } will set pixel width
        .then(data => App.Server.QRCode.Controller = data);

    QRCode
        .toDataURL(`http://${ ip }:${ App.Server.Port }/v`, { errorCorrectionLevel: "H" })  // { ..., width: # } will set pixel width
        .then(data => App.Server.QRCode.Viewport = data);

    console.log(`Started Gameroom server at ${ ip }:${ App.Server.Port }`);
});

server.set("trust proxy", true);
// app.use(function (req, res, next) {
//     console.log("middleware");
//     req.testing = "testing";
//     return next();
// });

server.get("/", (req, res) => {
    res.sendFile(`${ __dirname }/client/controller.html`);
});
server.get("/v", (req, res) => {
    res.sendFile(`${ __dirname }/client/viewport.html`);
});

expressWs.getWss().on("connection", ws => {
    let uuid = GenerateUUID();

    ws.UUID = GenerateUUID();
    App.Clients[ uuid ] = ws;

    ws.send(JSON.stringify({
        event: "uuid",
        uuid,
        qr: {
            c: App.Server.QRCode.Controller,
            v: App.Server.QRCode.Viewport
        }
    }));

    console.log(`Added: ${ uuid }`);
    console.log(`Size: ${ Object.keys(App.Clients).length }`);
    console.log(`Clients: ${ Object.keys(App.Clients) }`);
});

server.ws("/", function (ws, req) {
    ws.on("message", function (msg) {
        try {
            let data = JSON.parse(msg);
        } catch(e) {
            console.log(`[Message Failed]: `, JSON.stringify(msg));
        }
    });
});

function SendAllMessage(obj) {
    aWss.clients.forEach(function (client) {
        client.send(JSON.stringify(obj));
    });
}

const SERVER = server.listen(App.Server.Port);