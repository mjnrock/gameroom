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
     * @param {Array} filter Contains list of Module.prop("Name") that should be ignored by the Handler
     */
    ReceiveMessage(msg, type = "json", filter = []) {}

    //TODO These messages should be standardized into a "ModuleMessage" class
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