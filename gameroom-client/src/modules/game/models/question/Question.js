import Lux from "@lespantsfancy/lux";

import Enum from "./enum/package";
import QuestionChoice from "./QuestionChoice";

export default class Question {
    constructor(text, choices = [], {
        rtype = Enum.QuestionRewardType.QUESTION_VALUE,
        vtype = Enum.QuestionValidator.Type.VALUE_IS_ONE,
        value = 1,
        valueController = null,
        order = 1
    } = {}) {
        this.UUID = Lux.Core.Helper.GenerateUUID();

        this.Text = text;
        this.Choices = [];
        this.Order = order;

        //? This is preemptively here to allow for things like a variable response value [e.g. 1000 * (Time Remaining / Max Time)]
        //  Round.GetScore knows to use this if the RewardType is set
        this.Value = value;
        this.ValueController = valueController;    // This should be a function

        this.RewardType = rtype;
        if (typeof vtype === "function") {
            this.Validator = vtype;  // (choice, this)
            this.ValidatorType = "CUSTOM";
        } else {
            this.Validator = Enum.QuestionValidator[ vtype ];
            this.ValidatorType = vtype;
        }

        this.SetChoices(choices);

        if(value === null && this.RewardType === Enum.QuestionRewardType.QUESTION_VALUE) {
            throw new Error("Question.Value IS NULL && this.RewardType === Enum.QuestionRewardType.QUESTION_VALUE");
        }
    }

    ValidateResponse(choiceUUID, ...args) {
        if (this.ValidatorType === "CUSTOM") {
            // return this.Validator(this.Choices[ choiceUUID ], this, ...args);
        } else if (Object.keys(Enum.QuestionValidator.Type).includes(this.ValidatorType)) {
            if (typeof choiceUUID === "string" || choiceUUID instanceof String) {
                //TODO Perform RegEx UUID validation
                let [ response ] = this.Choices.filter(c => c.UUID === choiceUUID) || [];

                if (response) {
                    console.log(response)
                    return this.Validator(response, this, ...args);
                } else {
                    throw new Error(`Invalid QuestionChoice UUID`);
                }
            }
        } else {
            throw new Error(`Validator is not a function!`);
        }
    }

    GetChoice(uuid, valueOnly = false) {
        let choice = this.Choices.filter(c => c.UUID === uuid);

        if(choice.length) {
            if(valueOnly) {
                return choice[ 0 ].Value;
            }

            return choice[ 0 ];
        }

        return false;
    }

    SetChoices(choices) {
        for (let i in choices) {
            let choice = choices[i];

            if (choice instanceof QuestionChoice) {
                this.Choices.push(choice);
            } else if (Array.isArray(choice)) {
                this.Choices.push(new QuestionChoice(...choice));
            }
        }
    }

    Sort(fn = null) {
        let randomizer = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        };

        if (typeof fn === "function") {
            this.Choices.sort(fn);
        } else if (fn === -1) {
            randomizer(this.Choices);
        } else {
            this.Choices.sort((a, b) => a.Order - b.Order);
        }

        return this;
    }
}