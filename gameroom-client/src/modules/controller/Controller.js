import AControl from "./AControl";
import ActiveControl from "./ActiveControl";
import ButtonGroup from "./ButtonGroup";
import DPad from "./DPad";

export default class Controller extends AControl {
    constructor(name, controls = []) {
        super(name);

        this.prop("Controls", {});

        this.on("control-event");
        this.on("sub-controller-event");

        this.SetControls(controls);
    }

    Get(nameOrUUID) {
        let Controls = this.prop("Controls");

        if(Controls[ nameOrUUID ]) {
            return Controls[ nameOrUUID ];
        }

        for(let uuid in Controls) {
            if(Controls[ uuid ].prop("Name") === nameOrUUID) {
                return Controls[ uuid ];
            }
        }

        return false;
    }
    GetControls() {
        let obj = {},
            Controls = this.prop("Controls");

        for(let uuid in Controls) {
            obj[ Controls[ uuid ].prop("Name") ] = Controls[ uuid ];
        }

        return obj;
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
                    control.listen("bitmask-update", () => this.call("control-event", "bitmask-update", control));
                }

                if(control instanceof Controller) {
                    control.listen("control-event", () => this.call("control-event", control));
                    //? Special event to route all "control-event" (again) and make it easier to puppet sub-controllers
                    control.listen("control-event", () => this.call("sub-controller-event", control));
                }
            }
        }

        if(Object.entries(Controls).length !== 0) {
            this.prop("Controls", Controls);
        }
    }
};