import AModuleManager from "./AModuleManager";

class ModuleManager extends AModuleManager {
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

export default ModuleManager;


//* Working Example
// const Parent = new ModuleManager();
// Parent.AddHandler(( [ eventThis, e, eventResult ], [ listenerEvent, listenerThis ]) => {
//     if(e === "channel-message") {
//         let [ eventThis, msg, channel ] = eventResult;

//         console.log(`[${ channel.prop("Name") }][${ msg.Author }]: ${ msg.Content }`);
//     }
// });
// Parent.AddHandler(( [ eventThis, e, eventResult ], [ listenerEvent, listenerThis ]) => {
//     if(e === "channel-message") {
//         let [ eventThis, msg, channel ] = eventResult;

//         console.log("CATTSTSATTSTSTSTS");
//     }
// });