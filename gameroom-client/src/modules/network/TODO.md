## Tasks
* Abstract and pull up the `PeerClient` into a general `Network.{ SendJSON, ReceiveJSON, BroadcastJSON }`
  * At some point this could then be enhanced to route more complex packets, other than just `JSON`
  * Do same thing for a `WebSocket` connection
  * Do similar thing for API calls
* `Network` should be able to use `PeerJS` or `WebSockets` or `AJAX` to get data and should maintain a list of its connections
* In practice, this should probably be a very low-level (i.e. `core`) module and all apps should have it

### Message Bus Example
Attach the `{App}.Handler` to the `"json-data"` event that the `PeerClient` will fire:
```
//  ------- DEMO -------
let Trivia = new Demo.Trivia.App();
console.log(Trivia);

Trivia.Get("network").listen("message-extraction", ([ target, message ]) => {
    Trivia.Handler.ReceiveMessage(message);
});
//  ----- END DEMO -----
```