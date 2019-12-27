const EnumQuestionType = {
    HIGHEST_VALUE: (choice, question) => {
        let max = 0;
        
        question.Choices.forEach(c => {
            if(+c.Value > max) {
                max = +c.Value;
            }
        });

        if(+choice.Value === max) {
            return [ true, +choice.Value, max ];
        }

        return [ false, 0, max ];
    }
};

export default {
    ...EnumQuestionType
};