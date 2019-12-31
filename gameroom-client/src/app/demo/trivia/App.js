import Main from "../../Main";
import TriviaHandler from "./TriviaHandler";

import Modules from "./../../../modules/package";

export default class App extends Main {
    constructor() {
        super(
            "trivia",
            new TriviaHandler()
        );

        this.PostInit();

        //? This invocation works, so Controller<Module> should be good to start testing/building
        let btn = new Modules.Controller.Button("btn");
        this.Controller.SetControllers(new Modules.Controller.Controller("main", [
            btn
        ]));
        btn.call("activate", "ACTIVATED");
    }

    Get(module) {
        return this.Registry.Get(module);
    }
}