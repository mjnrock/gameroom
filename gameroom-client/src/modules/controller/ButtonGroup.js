import AControl from "./AControl";
import Button from "./Button";

//? Any easy subscribale/tidier for a given group of buttons with "IsActive" status awareness
export default class ButtonGroup extends AControl {
    constructor(buttons = []) {
        super(name);

        this.prop("Bitmask", 0);
        this.prop("Buttons", []);

        this.on("bitmask-update");

        this.SetButtons(buttons);
    }

    SetButtons(btns) {
        let buttons = [];

        for(let btn of btns) {
            if(btn instanceof Button) {
                buttons.push(btn);
    
                btn.listen("activate", this.OnButtonActivate.bind(this));
                btn.listen("deactivate", this.OnButtonDeactivate.bind(this));
            }
        }
    }

    //TODO Basic idea, add the actual bitmask changing
    OnButtonActivate([ button ]) {
        console.log(button);
        
        this.on("bitmask-update");
    }
    OnButtonDeactivate([ button ]) {
        console.log(button);
        
        this.on("bitmask-update");
    }
};