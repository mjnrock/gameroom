import Lux from "@lespantsfancy/lux";

export default class Handler extends Lux.Core.ClassDecorators.StateEvents {
    constructor(ref) {
        super();

        this.Controller = ref; // ref to App, Module, etc.
    }

    AttachController(ref) {
        this.Controller = ref;

        return this;
    }
    DetachController() {
        this.Controller = null;

        return this;
    }

    async SubRoute(code, msg, type = "json") {
        if(this.Controller.Registry && this.Controller.Handler) {
            let module = this.Controller.Registry.Get(code);

            return await module.Handler.ReceiveMessage(msg, type);
        } else {
            console.log("Controller does not have .Registry AND .Handler properties");

            return false;
        }
    }

    /**
     * The entry method for handling a message from some event or delivery bus
     * @param {any} msg The actual payload
     * @param {string} type The expected type of @msg (e.g. JSON, Binary, etc.)
     */
    ReceiveMessage(msg, type = "json", filter = []) {
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
    }

    AttachListeners() {
        if(this.Controller) {
            this.Controller.Get("network").listen("message-extraction", ([ controller, chatMessage ], [ e ]) => {
                this.ReceiveMessage({
                    type: `network.${ e }`,
                    data: {
                        type: chatMessage.Type,
                        data: chatMessage.Data
                    }
                });
            });
            this.Controller.Get("controller").listen("controller-event", ([ controller, payload ], [ e ]) => {
                let [ event, control ] = payload;

                this.ReceiveMessage({
                    type: `controller.${ e }`,
                    data: {
                        controller,
                        control,
                        event                        
                    }
                });
            });

            if(window) {
                this.Controller.Get("controller").listen("user-event", ([ controller, payload ], [ e ]) => {
                    this.ReceiveMessage({
                        type: `controller.${ e }`,
                        data: payload
                    });
                });
            }
        } else {
            throw new Error("No Controller has been defined");
        }
    }
};