import Main from "../../Main";
import TriviaHandler from "./TriviaHandler";

import Modules from "./../../../modules/package";

export default class App extends Main {
    constructor() {
        super(
            "trivia",
            new TriviaHandler()
        );

        //? This invocation works, so Controller<Module> should be good to start testing/building
        // let btn = new Modules.Controller.Button("btn");
        // this.Controller.SetControllers(new Modules.Controller.Controller("main", [
        //     btn
        // ]));
        // btn.call("activate", "ACTIVATED");

        let dpad = new Modules.Controller.DPad("pos");
        let a = new Modules.Controller.Button("a");
        let b = new Modules.Controller.Button("b");
        this.Controller.SetControllers(new Modules.Controller.Controller("main", [
            dpad,
            a,
            b
        ]));

        dpad.watch("Bitmask", (k, v) => {
            console.log(k, v);
        });

        // dpad.listen("bitmask-update", ([ btnGrp, mask, [ index, flag ]]) => {
        //     console.log("-----------------------");
        //     console.log(btnGrp);
        //     console.log(mask);
        //     console.log(index);
        //     console.log(flag);
        //     console.log("-----------------------");

        // });
        
        // console.log("-----------------------");
        // console.log(dpad.GetMapping());
        // console.log("-----------------------");

        // dpad.Up(true);
        // dpad.Down(true);
        // dpad.Left(true);

        // dpad.Left(false);
        // dpad.Down(false);

        this.PostInit();
    }

    Get(module) {
        return this.Registry.Get(module);
    }
}