import AModuleManager from "./../AModuleManager";
import Controller from "./Controller";

export default class ControllerManager extends AModuleManager {
    constructor(controllers = []) {
        super(
            "controller"
        );

        this.prop("Controllers", {});

        this.on("controller-event");
        this.on("user-event");

        this.SetControllers(controllers);

        //! This is off for DEBUGGING reasons only, so as not to pollute `console.log`
        //? Once the Handler has been finalized, this won't have to result in that console logging
        // this.AttemptHTMLBindings();
    }

    AttemptHTMLBindings() {        
        if(window) {
            window.onkeydown = (e) => this.call("user-event", [
                e.type,
                e.which,
                e
            ]);
            window.onkeyup = (e) => this.call("user-event", [
                e.type,
                e.which,
                e
            ]);
        }
    }

    SetControllers(...controllers) {
        let Controls = {};

        for(let controller of controllers) {
            if(controller instanceof Controller) {
                Controls[ controller.UUID() ] = controller;

                controller.listen("control-event", ([ controller, event, control], [ controllerEvent ]) => {
                    this.call("controller-event", [ event, control, controller, controllerEvent ]);
                });
                //* Not subscribing because it will double capture without a second handler, and really not necessary here at this time
                // controller.listen("sub-controller-event", () => this.call("controller-event"));
            }
        }
    }
};