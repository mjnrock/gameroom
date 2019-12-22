import ClassDecorators from "./../lib/classDecorators";

class AModuleManager extends ClassDecorators.StateEvents {
    constructor(name, title, parent) {
        super();

        this.name = name;
        this.title = title;
        this.parent = parent;

        this.on("module-message");
    }

    MassSubcribeParent(events = []) {
        try {
            if(this.parent instanceof AModuleManager) {
                for(let i in events) {
                    let event = events[ i ];
                    // console.log(event);

                    this.listen(event, ( result, [ _event, _this ]) => {
                        // console.log(a1);
                        // console.log(a2);
                        // console.log(a3);
                        // console.log(b1);
                        // console.log(b2);
                        // console.log(b3);
                        // console.log(c);
                        this.parent.call("module-message", event, result);
                    });
                }
            } else {
                console.log(`[Warning]: AModuleManager<${ this.UUID() }> has no parent.`);
            }
        } catch(e) {
            console.log(`[Error]: You probably sent a bad mapping to the ModuleManager.  Use [ { event: fn }, ... ] syntax.`);
        }
    }
}

export default AModuleManager;