# Version 0.1.0a
This is a **WebSockets** proof-of-concept that should allow a server running `index.js` to server one-to-many `client/controller.html` files, or one-to-many `client/viewport.html` files.

## Pong
**Player 1/2** can control the blue box by clicking "Player 1/2" button and then dragging the mouse up and down on the dark gray box in the `client/controller.html`

The bounding box doesn't work completely accurately, so you may need to adjust the collision ranges before a real game can be played, but otherwise the proof-of-concept works.

## Notes
There is code in the `client/viewport.html` that relies on the npm package `qrcode` initializing the server's IP and Port into a QR code and sending it on a websocket connection to the client and render that data as two (2) QR codes on the canvas.

At this point in the build, that package code was not added to `index.js` so it will not render that data, as it doesn't exist.

You can either:
1) Add/uncomment the necessary code and package to `index.js`
2) Delete the code from `client/viewport.html`