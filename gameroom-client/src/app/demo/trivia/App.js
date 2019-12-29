import Main from "../../Main";
import TriviaHandler from "./TriviaHandler";

import Modules from "./../../../modules/package";

export default class App extends Main {
    constructor(comp) {
        super(
            "trivia",
            new TriviaHandler()
        );

        this.Handler.AttachController(this);

        this.Registry.Register(new Modules.Chat.ChannelManager());
        this.Get("chat").CreateChannel("Room");
        
        this.Registry.Register(new Modules.Network.NetworkManager());
        
        this.Handler.AttachListeners();

        // setInterval(() => comp.setState({
        //     cat: comp.state.cat + 1
        // }), 500);
    }

    Get(module) {
        return this.Registry.Get(module);
    }
}