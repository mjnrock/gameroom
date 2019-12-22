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

const SERVER = server.listen(App.Server.Port);                App.Players[ data.player ].Y = 0;
                    }
                    if(App.Players[ data.player ].Y > App.Size.Height) {
                        App.Players[ data.player ].Y = App.Size.Height;
                    }

                    if(data.player == 1) {
                        App.Players[ data.player ].X = 100;
                    }
                    if(data.player == 2) {
                        App.Players[ data.player ].X = 400;
                    }
                }

                // SendViewport();
            }
        } catch(e) {
            console.log(`[Message Failed]: `, JSON.stringify(msg));
        }
    });
});

function SendViewport() {
    SendAllMessage({
        event: "viewport",
        clients: Object.keys(App.Clients),
        players: App.Players,
        ball: App.Ball
    });
}

function SendScore() {
    SendAllMessage({
        event: "score",
        score: App.Score
    });
}
function SendAllMessage(obj) {
    aWss.clients.forEach(function (client) {
        client.send(JSON.stringify(obj));
    });
}

const SERVER = server.listen(PORT);

function ResetBall() {
    App.Ball.X = App.Size.Width / 2;
    App.Ball.Y = App.Size.Height / 2;
    App.Ball.Hx = true;
    App.Ball.Hy = true;
}
function isCollision(a, b) {
    return !(
        ((a.Y + a.H) < (b.Y)) ||
        (a.Y > (b.Y + b.H)) ||
        ((a.X + a.W) < b.X) ||
        (a.X > (b.X + b.W))
    );
}
App.Loop = setInterval(() => {
    let pw = 25,
        ph = 100,
        bw = 10,
        step = 10;

    let bx = App.Ball.X,
        by = App.Ball.Y,
        x1 = App.Players[ "1" ].X,
        y1 = App.Players[ "1" ].Y,
        x2 = App.Players[ "2" ].X,
        y2 = App.Players[ "2" ].Y;

    if(isCollision({
        X: bx,
        Y: by,
        H: bw,
        W: bw
    }, {
        X: x1,
        Y: y1,
        H: ph,
        W: pw
    })) {
        App.Ball.Hx = !App.Ball.Hx;
    }
    if(isCollision({
        X: bx + bw,
        Y: by,
        H: bw,
        W: bw
    }, {
        X: x2,
        Y: y2,
        H: ph,
        W: pw
    })) {
        App.Ball.Hx = !App.Ball.Hx;
    }

    if(bx - bw <= 0) {
        App.Ball.Hx = !App.Ball.Hx;
    }
    if(bx + bw >= App.Size.Width) {
        App.Ball.Hx = !App.Ball.Hx;
    }
    if(by - bw <= 0) {
        App.Ball.Hy = !App.Ball.Hy;
    }
    if(by + bw >= App.Size.Height) {
        App.Ball.Hy = !App.Ball.Hy;
    }

    App.Ball.X += (App.Ball.Hx ? 1 : -1) * step;
    App.Ball.Y += (App.Ball.Hy ? 1 : -1) * step;

    if(App.Players[ "1" ].X > 0 && App.Players[ "2" ].X > 0) {
        if(App.Ball.X < App.Players[ "1" ].X + pw) {
            App.Score[ "2" ] += 1;
            SendScore();
            ResetBall();
        }
        if(App.Ball.X > App.Players[ "2" ].X) {
            App.Score[ "1" ] += 1;
            SendScore();
            ResetBall();
        }
    }
}, 1000 / 10);

setInterval(() => {
    SendViewport();
}, 1000 / 20);