import Lux from "@lespantsfancy/lux";

class AManager extends Lux.Core.ClassDecorators.StateEvents {
    constructor(name) {
        super();

        this.prop("Name", name);
    }
}

export default AManager;