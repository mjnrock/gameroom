import Lux from "@lespantsfancy/lux";
import Question from "./Question";

export default class QuestionGroup {
    constructor(questions = []) {
        this.UUID = Lux.Core.Helper.GenerateUUID();
        
        this.Questions = questions;
        this.Index = 0;
    }

    Get(index) {
        return this.Questions[ index ];
    }

    IsAtStart() {
        return this.Index === 0;
    }
    IsAtEnd() {
        return this.Index === this.Questions.length - 1;
    }
    
    Current() {
        return this.Questions[ this.Index ];
    }

    GoTo(index) {
        this.Index = Lux.Core.Helper.Clamp(index, 0, this.Questions.length - 1);

        return this.Questions[ this.Index ];
    }
    Next() {
        return this.GoTo(this.Index + 1);
    }
    Previous() {
        return this.GoTo(this.Index - 1);
    }

    AddQuestion(question) {
        if(question instanceof Question) {
            this.Questions.push(question);    
        }

        return this;
    }

    /**
     * e.g. [
            [ 0, "540b205e-981e-4b16-b3ca-4e8c83b9216a" ],   // Question index 0, Response UUID
            [ 1, "09dd5ddc-1afb-45cd-8a86-1cd22890de2a" ],   // Question index 1, Response UUID
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