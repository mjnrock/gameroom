import Handler from "./../../Handler";

export default class TriviaHandler extends Handler {
    constructor(ref) {
        super(
            ref
        );
    }

    AttachListeners() {
        if(this.Controller) {
            this.Controller.Get("network").listen("message-extraction", ([ controller, msg ]) => {
                this.ReceiveMessage(msg.Data, msg.Type);
            });
        } else {
            throw new Error("No Controller has been defined");
        }
    }

    ReceiveMessage(msg, type = "json") {
        this.Controller.Get("chat").Get(msg.Channel).AddMessage(msg.Message);

        console.log("----------- TRIVIA HANDLER -----------");
        console.log(msg);
        console.log(this.Controller.Get("chat").Get(msg.Channel));
        console.log("--------- END TRIVIA HANDLER ---------");
    }
}