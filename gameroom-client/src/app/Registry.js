import Lux from "@lespantsfancy/lux";

export default class Registry extends Lux.Core.ClassDecorators.StateEvents {
    constructor(app) {
        super();

        this.App = app; // ref
        this.Modules = {};
    }

    GetAll() {
        return Object.values(this.Modules);
    }

    Get(code) {
        if(this.Has(code)) {
            return this.Modules[ code ];
        }

        return false;
    }
    Has(code) {
        return !!this.Modules[ code ];
    }

    Register(module) {
        this.Modules[ module.prop("Code") ] = module;

        return this;
    }
    Unregister(module) {
        if(typeof module === "string" || module instanceof String) {
            delete this.Modules[ module ];
        } else {
            delete this.Modules[ module.prop("Code") ];
        }

        return this;
    }
};