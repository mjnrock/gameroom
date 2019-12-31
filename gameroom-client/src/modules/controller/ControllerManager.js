import AModuleManager from "./../AModuleManager";

export default class ControllerManager extends AModuleManager {
    constructor(controllers = []) {
        super(
            "controller"
        );

        this.prop("Controllers", {});

        this.on("controller-event");

        this.SetControllers(controllers);
    }

    SetControllers(controllers) {
        let Controls = {};

        for(let controller of controllers) {
            if(controller instanceof Controller) {
                Controls[ controller.UUID() ] = controller;

                controller.listen("control-event", () => this.call("controller-event"));
                //* Not subscribing because it will double capture without a second handler, and really not necessary here at this time
                // controller.listen("sub-controller-event", () => this.call("controller-event"));
            }
        }
    }
};