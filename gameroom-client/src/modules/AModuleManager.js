import Lux from "@lespantsfancy/lux";

class AModuleManager extends Lux.Core.ClassDecorators.StateEvents {
    constructor(name) {
        super();

        this.prop("Name", name);
    }
}

export default AModuleManager;