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

    /**
     * e.g. [
            [ 0, 2 ],   // Question index 0, Response index 2
            [ 1, 2 ],   // Question index 1, Response index 2
        ]
     */
    ValidateResponses(responses = []) {
        let ret = {};

        for(let i in responses) {
            let res = responses[ i ];

            if(Array.isArray(res)) {
                ret[ res[ 0 ] ] = this.Questions[ res[ 0 ] ].ValidateResponse(res[ 1 ]);
            }
        }

        return ret;
    }
}