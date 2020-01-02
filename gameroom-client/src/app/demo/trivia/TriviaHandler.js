import Handler from "./../../Handler";

export default class TriviaHandler extends Handler {
    constructor(ref) {
        super(
            ref
        );
    }
    
    ReceiveMessage(msg, type = "json", filter = []) {
        //     Handler.prototype.ReceiveMessage.call(this, msg);

        let [ module, event ] = msg.type.split("."),
            data = msg.data;

        if(module === "chat" && !filter.includes("chat")) {      
            if(event === "message") {                
                /* //! Currently this is the message form that Chat<Module> is sending and should be standardized
                data = {
                    Channel: "Lobby"​
                    Type: "ChatMessage"
                    Message: {
                        Author: 14                ​​
                        Content: "1756"                ​​
                        Timestamp: 1577827945861                ​​
                        UUID: "010e918b-f0af-4859-8811-fe3066781343"
                    }
                }
                */
                console.log(data);

                this.Controller.Get("chat").Get(data.Channel).AddMessage(data.Message);
            }
        } else if(module === "network" && !filter.includes("network")) {
            if(event === "message-extraction") {
                //! This is a PoC line below, and should not actually be here, but instead a proper generalization of this
                this.ReceiveMessage({
                    type: "chat.message",
                    data: data.data
                });
            }
        } else if(module === "controller" && !filter.includes("controller")) {
            if(event === "user-event") {
                console.log(event, data);
            } else if(event === "controller-event") {
                console.log(event, data);
            }
        }
        
        // console.log("----------- TRIVIA HANDLER -----------");
        // console.log(msg);
        // console.log(this.Controller.Get("chat").Get(msg.Channel));
        // console.log("--------- END TRIVIA HANDLER ---------");
    }
}