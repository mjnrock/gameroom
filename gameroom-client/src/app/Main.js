import Lux from "@lespantsfancy/lux";

import Modules from "./../modules/package";
import Registry from "./Registry";

export default class Main extends Lux.Core.ClassDecorators.StateEvents {
    constructor(name, handler, registry = null) {
        super();

        this.Name = name;
        this.Handler = handler;
        this.Registry = registry || new Registry(this);
        
        //? [Core Modules]
            this.Network = new Modules.Network.NetworkManager();

            this.Chat = new Modules.Chat.ChannelManager();
            this.Chat.CreateChannel("Lobby");
            
            this.Registry.Register(this.Network);
            this.Registry.Register(this.Chat);
    }

    PostInit() {
        this.Handler.AttachController(this);        
        this.Handler.AttachListeners();
    }
};