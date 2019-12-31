import ButtonGroup from "./ButtonGroup";
import Button from "./Button";

export default class DPad extends ButtonGroup {
    constructor(name) {
        super(name, [
            new Button(`up`),
            new Button(`down`),
            new Button(`left`),
            new Button(`right`),
        ]);
    }

    maskButton(index, mask) {
        if(this.safetyWrapper(index)) {
            if(mask) {
                this.Activate(index);
            } else {
                this.Deactivate(index);
            }
        }

        return this;
    }
    Up(mask = false) {
        return this.maskButton(0, mask);
    }
    Down(mask = false) {
        return this.maskButton(1, mask);
    }
    Left(mask = false) {
        return this.maskButton(2, mask);
    }
    Right(mask = false) {
        return this.maskButton(3, mask);
    }
};