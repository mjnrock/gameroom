import Lux from "@lespantsfancy/lux";

import QuestionValidatorType from "./enum/QuestionValidatorType";
import QuestionChoice from "./QuestionChoice";

export default class Question {
    constructor(type, text, choices = [], order = 1) {
        this.UUID = Lux.Core.Helper.GenerateUUID();

        this.Text = text;
        this.Choices = [];
        this.Order = order;

        if(typeof type === "function") {
            this.Validator = type;  // (choice, this)
        } else {
            this.Validator = QuestionValidatorType.HIGHEST_VALUE;
        }

        this.SetChoices(choices);
    }

    ValidateResponse(choiceIndex, ...args) {
        if(typeof this.Validator === "function") {
            return this.Validator(this.Choices[ choiceIndex ], this, ...args);
        } else {
            throw new Error(`Validator is not a function!`);
        }
    }

    SetChoices(choices) {
        for(let i in choices) {
            let choice = choices[ i ];

            if(choice instanceof QuestionChoice) {
                this.Choices.push(choice);
            } else if(Array.isArray(choice)) {
                this.Choices.push(new QuestionChoice(...choice));
            }
        }
    }
}