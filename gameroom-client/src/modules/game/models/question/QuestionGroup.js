import Lux from "@lespantsfancy/lux";
import Question from "./Question";

export default class QuestionGroup {
    constructor(questions = []) {
        this.UUID = Lux.Core.Helper.GenerateUUID();
        
        this.Questions = questions;
    }

    AddQuestion(question) {
        if(question instanceof Question) {
            this.Questions.push(question);    
        }

        return this;
    }
}