import Handler from "./../../Handler";

export default class TriviaHandler extends Handler {
    constructor() {
        super(
            ref,
            this.ReceiveMessage
        );
    }

    ReceiveMessage(msg, type = "json") {
        console.log(msg);
    }
}