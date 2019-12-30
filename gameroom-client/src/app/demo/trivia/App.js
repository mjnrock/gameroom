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
    }

    Get(module) {
        return this.Registry.Get(module);
    }
}