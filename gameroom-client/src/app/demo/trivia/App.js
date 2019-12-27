import Main from "../../Main";
import TriviaHandler from "./TriviaHandler";

import Modules from "./../../../modules/package";

export default class App extends Main {
    constructor() {
        super(
            "trivia",
            new TriviaHandler()
        );

        this.Handler.AttachController(this);
        
        this.Registry.Register(new Modules.Chat.ChatManager());
    }
}