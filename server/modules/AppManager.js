import AModuleManager from "./AModuleManager";

class AppManager extends AModuleManager {
    constructor(parent) {
        super(
            "root",
            "Application Manager",
            parent
        );
    }

    SetAsParent(manager) {
        if(manager instanceof AModuleManager) {
            manager.parent = this;

            return true;
        }

        return false;
    }

    AddHandler(callback) {
        this.listen("module-message", callback);

        return this;
    }
}

export default AppManager;