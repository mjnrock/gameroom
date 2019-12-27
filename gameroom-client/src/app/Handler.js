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
    ReceiveMessage(msg, type = "json") {
        //TODO Route the message
    }
};