import { action, computed, observable } from "mobx";

class IncomeDomainStore {
    @observable incomeBeforeTax = 0;

    @action setIncome(incomeAmount) {
        this.incomeBeforeTax = parseInt(incomeAmount);
    }
}

export default IncomeDomainStore;