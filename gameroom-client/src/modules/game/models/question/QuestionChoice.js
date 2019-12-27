import Lux from "@lespantsfancy/lux";

export default class QuestionChoice {
    constructor(text, value, order = 1) {
        this.UUID = Lux.Core.Helper.GenerateUUID();
        
        this.Text = text;
        this.Value = value;
        this.Order = order;
    }
}