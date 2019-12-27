const QuestionValidatorType = {
    HIGHEST_VALUE: (choice, question) => {
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
    LOWEST_VALUE: (choice, question) => {
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
    ...QuestionValidatorType
};