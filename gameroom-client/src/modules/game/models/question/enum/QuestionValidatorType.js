const QuestionValidatorType = {
    HIGHEST_VALUE: (choice, question) => {
        let max = 0;
        
        question.Choices.forEach(c => {
            if(+c.Value > max) {
                max = +c.Value;
            }
        });

        if(+choice.Value === max) {
            return [ true, +c.Value, max ];
        }

        return [ false, +c.Value, max ];
    },
    LOWEST_VALUE: (choice, question) => {
        let min = Number.MAX_SAFE_INTEGER;
        
        question.Choices.forEach(c => {
            if(+c.Value < min) {
                min = +c.Value;
            }
        });

        if(+choice.Value === min) {
            return [ true, +c.Value, min ];
        }

        return [ false, +c.Value, min ];
    },
    SPECIFIC_VALUE: (choice, question, value) => {
        if(+choice.Value === value) {
            return [ true, +c.Value, value ];
        }

        return [ false, +c.Value, value ];
    }
};

export default {
    ...QuestionValidatorType
};