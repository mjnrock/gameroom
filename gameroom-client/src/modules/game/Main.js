import Lux from "@lespantsfancy/lux";
import Models from "./models/package";

class Main extends Lux.Core.ClassDecorators.StateEvents {
    constructor() {
        this.Players = {};
        this.Game = null;
    }
}