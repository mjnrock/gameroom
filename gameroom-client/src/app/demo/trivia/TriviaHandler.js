import Handler from "./../../Handler";

export default class TriviaHandler extends Handler {
    constructor(ref) {
        super(
            ref
        );
    }

    ReceiveMessage(msg, type = "json") {
        Handler.prototype.ReceiveMessage.call(this, msg);

        // console.log("----------- TRIVIA HANDLER -----------");
        // console.log(msg);
        // console.log(this.Controller.Get("chat").Get(msg.Channel));
        // console.log("--------- END TRIVIA HANDLER ---------");
    }
}