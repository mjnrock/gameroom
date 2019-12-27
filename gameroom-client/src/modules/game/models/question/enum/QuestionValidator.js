const QuestionValidator = {
    Type: {
        VALUE_IS_ZERO: "VALUE_IS_ZERO",
        VALUE_IS_ONE: "VALUE_IS_ONE",
        MAX_RESPONSE_VALUE: "MAX_RESPONSE_VALUE",
        MIN_RESPONSE_VALUE: "MIN_RESPONSE_VALUE",
        SPECIFIC_VALUE: "SPECIFIC_VALUE"
    },

    VALUE_IS_ZERO: (choice, question) => {
        console.log(choice)
        if(+choice.Value === 0) {
            return true;
        }

        return false;
    },
    VALUE_IS_ONE: (choice, question) => {
        if(+choice.Value === 1) {
            return true;
        }

        return false;
    },
    MAX_RESPONSE_VALUE: (choice, question) => {
        let max = 0;
        
        question.Choices.forEach(c => {
            if(+c.Value > max) {
                max = +c.Value;
            }
        });

        if(+choice.Value === max) {
            return true;
        }

        return false;
    },
    MIN_RESPONSE_VALUE: (choice, question) => {
        let min = Number.MAX_SAFE_INTEGER;
        
        question.Choices.forEach(c => {
            if(+c.Value < min) {
                min = +c.Value;
            }
        });

        if(+choice.Value === min) {
            return true;
        }

        return false;
    },
    SPECIFIC_VALUE: (choice, question, value) => {
        if(+choice.Value === value) {
            return true;
        }

        return false;
    }
};

export default {
    Run(qvType, ...args) {
        return QuestionValidator[ qvType ](...args);
    },
    ...QuestionValidator
};