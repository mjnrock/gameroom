import Lux from "@lespantsfancy/lux";

import Registry from "./Registry";

export default class Main extends Lux.Core.ClassDecorators.StateEvents {
    constructor(name, handler, registry = null) {
        super();

        this.Name = name;
        this.Handler = handler;
        this.Registry = registry || new Registry(this);
    }
};