import ButtonGroup from "./ButtonGroup";

export default class DPad extends ButtonGroup {
    constructor(name) {
        super(name, [
            `up`,
            `down`,
            `left`,
            `right`,
        ]);
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


//* Example Usage
// let dpad = new DPad("pos");

// dpad.listen("bitmask-update", ([ btnGrp, mask, [ index, flag ]]) => {
//     console.log("-----------------------");
//     console.log(btnGrp);
//     console.log(mask);
//     console.log(index);
//     console.log(flag);
//     console.log("-----------------------");
// });

// dpad.Up(true);
// dpad.Down(true);
// dpad.Left(true);

// dpad.Left(false);
// dpad.Down(false);