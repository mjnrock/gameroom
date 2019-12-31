import Lux from "@lespantsfancy/lux";

import AControl from "./AControl";
import Button from "./Button";

//? Any easy subscribale/tidier for a given group of buttons with "IsActive" status awareness
export default class ButtonGroup extends AControl {
    constructor(name, buttons = []) {
        super(name);

        this.prop("Bitmask", 0);
        this.prop("Buttons", []);

        this.on("bitmask-update");

        this.SetButtons(buttons);
    }

    SetButtons(btns) {
        let buttons = [];

        for(let i in btns) {
            let btn = btns[ i ];
            if(btn instanceof Button) {
                buttons.push(btn);
    
                btn.listen("activate", () => this.OnButtonActivate(btn, i));
                btn.listen("deactivate", () => this.OnButtonDeactivate(btn, i));
            }
        }
        
        this.prop("Buttons", buttons);
    }

    safetyWrapper(index) {
        if(index >= 0 && index < this.prop("Buttons").length) {
            return true;
        } else {
            throw new Error(`[Invalid Index]: "${ index }" does not exist`);
        }
    }
    Toggle(index) {
        if(this.safetyWrapper(index)) {
            this.prop("Buttons")[ index ].Toggle();
        }

        return this;
    }
    Activate(index) {
        if(this.safetyWrapper(index)) {
            this.prop("Buttons")[ index ].Activate();
        }

        return this;
    }
    Deactivate(index) {
        if(this.safetyWrapper(index)) {
            this.prop("Buttons")[ index ].Deactivate();
        }

        return this;
    }
    IsActive(index) {
        if(this.safetyWrapper(index)) {
            this.prop("Buttons")[ index ].IsActive();
        }

        return this;
    }

    //TODO Basic idea, add the actual bitmask changing
    OnButtonActivate(button, index) {
        let mask = Lux.Core.Helper.Bitmask.Add(this.prop("Bitmask"), 2 << +index);
        
        this.prop("Bitmask", mask);
        
        this.call("bitmask-update", mask, [ +index, 2 << +index ]);
    }
    OnButtonDeactivate(button, index) {
        let mask = Lux.Core.Helper.Bitmask.Remove(this.prop("Bitmask"), 2 << +index);
        
        this.prop("Bitmask", mask);
        
        this.call("bitmask-update", mask, [ +index, 2 << +index ]);
    }
};