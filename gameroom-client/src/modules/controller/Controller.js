import AControl from "./AControl";
import ActiveControl from "./ActiveControl";
import ButtonGroup from "./ActiveControl";

export default class Controller extends AControl {
    constructor(name, controls = []) {
        super(name);

        this.prop("Controls", {});

        this.on("control-event");
        this.on("sub-controller-event");

        this.SetControls(controls);
    }

    SetControls(controls) {
        let Controls = {};

        for(let control of controls) {
            if(control instanceof AControl) {
                Controls[ control.UUID() ] = control;
    
                if(control instanceof ActiveControl) {
                    control.listen("activate", () => this.call("control-event", "activate", control));
                    control.listen("deactivate", () => this.call("control-event", "deactivate", control));
                }
                if(control instanceof ButtonGroup) {
                    control.listen("bitmask-update", () => this.call("control-event"));
                }

                if(control instanceof Controller) {
                    control.listen("control-event", () => this.call("control-event"));
                    //? Special event to route all "control-event" (again) and make it easier to puppet sub-controllers
                    control.listen("control-event", () => this.call("sub-controller-event"));
                }
            }
        }
    }
};