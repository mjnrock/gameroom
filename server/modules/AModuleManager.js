import ClassDecorators from "./../lib/classDecorators";

class AModuleManager extends ClassDecorators.StateEvents {
    constructor(name, title, parent) {
        super();

        this.name = name;
        this.title = title;
        this.parent = parent;
    }
}

export default AModuleManager;