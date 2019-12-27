import Handler from "./../../Handler";

export default class TriviaHandler extends Handler {
    constructor(ref) {
        super(
            ref
        );
    }

    ReceiveMessage(msg, type = "json") {
        console.log("----------- TRIVIA HANDLER -----------");
        console.log(msg);
        console.log("--------- END TRIVIA HANDLER ---------");
    }

    OnChatMessage(msg) {
        this.SubRoute("chat", msg);
    }
}