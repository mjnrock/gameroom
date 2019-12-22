import NetworkManager from "./NetworkManager";

export default {
    create(parent) {
        return new NetworkManager(parent);
    },

    NetworkManager
};