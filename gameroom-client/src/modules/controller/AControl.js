import Lux from "@lespantsfancy/lux";

export default class AControl extends Lux.Core.ClassDecorators.StateEvents {
    constructor(name) {
        super();

        this.prop("Name", name);
    }
};