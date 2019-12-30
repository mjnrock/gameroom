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
            this.Registry.Register(new Modules.Network.NetworkManager());
            
            this.Registry.Register(new Modules.Chat.ChannelManager());
            this.Get("chat").CreateChannel("Lobby");
    }
};