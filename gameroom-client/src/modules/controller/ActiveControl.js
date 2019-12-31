import AControl from "./AControl";

export default class ActiveControl extends AControl {
    constructor(name) {
        super(name);

        this.prop("IsActive", false);

        this.on("activate");
        this.on("deactivate");
    }
    
    Toggle() {
        if(this.IsActive()) {
            this.Deactivate();
        } else {
            this.Activate();
        }

        return this;
    }
    Activate() {
        this.prop("IsActive", true);

        this.call("activate");

        return this;
    }
    Deactivate() {
        this.prop("IsActive", false);

        this.call("deactivate");

        return this;
    }

    IsActive() {
        return this.prop("IsActive");
    }
};