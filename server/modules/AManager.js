import ClassDecorators from "../lib/classDecorators";

class AManager extends ClassDecorators.StateEvents {
    constructor(name, title, parent) {
        super();

        this.name = name;
        this.title = title;
        this.parent = parent;

        this.on("module-message");
    }

    MassSubcribeParent(events = []) {
        try {
            if(this.parent instanceof AManager) {
                for(let i in events) {
                    let event = events[ i ];
                    // console.log(event);

                    this.listen(event, ( result, [ _event, _this ]) => {
                        this.parent.call("module-message", event, result);
                    });
                }
            } else {
                console.log(`[Warning]: AManager<${ this.UUID() }> has no parent.`);
            }
        } catch(e) {
            console.log(`[Error]: You probably sent a bad mapping to the ModuleManager.  Use [ { event: fn }, ... ] syntax.`);
        }
    }
}

export default AManager;