import { observable } from "mobx";

class ExampleStore {
    @observable name = "test";
}

export default new ExampleStore();