const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);
const path = require("path");

const PORT = 3000;
require("dns").lookup(require("os").hostname(), function(err, ip, fam) {
    console.log(`Started Gameroom server at ${ ip }:${ PORT }`);
});

function GenerateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

app.set("trust proxy", true);
// app.use(function (req, res, next) {
//     console.log("middleware");
//     req.testing = "testing";
//     return next();
// });

app.get("/", (req, res) => {
    res.sendFile(`${ __dirname }/index.html`);
});

const clients = {};
expressWs.getWss().on("connection", ws => {
    let uuid = GenerateUUID();

    ws.UUID = GenerateUUID();
    clients[ uuid ] = ws;

    console.log(`Added: ${ uuid }`);
    console.log(`Size: ${ Object.keys(clients).length }`);
    console.log(`Clients: ${ Object.keys(clients) }`);
});

app.ws("/", function (ws, req) {
    ws.on("message", function (msg) {
        console.log(msg);
    });
});

setTimeout(() => {
    Object.values(clients).forEach(client => client.send(client.UUID));
}, 5000);

const SERVER = app.listen(PORT);
