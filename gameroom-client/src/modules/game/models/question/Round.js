import Enum from "./enum/package";

export default class Round {
    constructor(group, order = 1) {
        this.QuestionGroup = group;
        this.Order = order;

        this.Responses = {};
    }

    NextQuestion() {
        return this.QuestionGroup.Next();
    }
    PreviousQuestion() {
        return this.QuestionGroup.Previous();
    }

    /**
     * @param {UUID|ID} player A unique identifier for the given player (e.g. Peer.id, UUID, etc.)
     * @param {UUID} choice The UUID of the QuestionChoice
     */
    AddResponse(player, choice, index = null) {
        let i = index || this.QuestionGroup.Index;

        if(!this.Responses[ i ]) {
            this.Responses[ i ] = {};
        }

        this.Responses[ i ][ player ] = choice;

        return this;
    }

    /**
     * Currently only works with `QuestionValidatorType[ MAX_RESPONSE_VALUE, MIN_RESPONSE_VALUE ]`
     * @param {UUID[]} players This serves as the "lookup" for adding points
     */
    GetScores(players = []) {
        let scores = {};

        players.forEach(p => scores[ p ] = 0);

        for(let index in this.Responses) {
            for(let player of players) {
                let question = this.QuestionGroup.Get(index),
                    isCorrect = question.ValidateResponse(this.Responses[ index ][ player ]),
                    value;
                    
                    if(question.RewardType === Enum.QuestionRewardType.RESPONSE_VALUE) {
                        value = question.GetChoice(this.Responses[ index ][ player ], true);
                    } else if(question.RewardType === Enum.QuestionRewardType.QUESTION_VALUE) {
                        value = question.Value;
                    }

                    if(isCorrect && value !== false) {
                        scores[ player ] += value;
                    }
            }
        }

        return scores;
    }
}



//* Testing Example
// this.QuestionGroup = new Game.Model.Question.QuestionGroup();
// this.QuestionGroup.AddQuestion(new Game.Model.Question.Question(
//     [
//         Game.Model.Question.Enum.QuestionRewardType.RESPONSE_VALUE,
//         Game.Model.Question.Enum.QuestionValidator.Type.MAX_RESPONSE_VALUE,
//     ],
//     "Lorem ipsum dolor sit amet.",
//     [
//         new Game.Model.Question.QuestionChoice("Choice A", 5),
//         new Game.Model.Question.QuestionChoice("Choice B", 0),
//         new Game.Model.Question.QuestionChoice("Choice C", 0),
//         new Game.Model.Question.QuestionChoice("Choice D", 1)
//     ]
// ));
// this.QuestionGroup.AddQuestion(new Game.Model.Question.Question(
//     [
//         Game.Model.Question.Enum.QuestionRewardType.RESPONSE_VALUE,
//         Game.Model.Question.Enum.QuestionValidator.Type.MAX_RESPONSE_VALUE,
//     ],
//     "Consequatur nostrum voluptates itaque quod omnis explicabo ducimus, voluptatem quam! Repellat, illo?",
//     [
//         new Game.Model.Question.QuestionChoice("Choice A", 0),
//         new Game.Model.Question.QuestionChoice("Choice B", 0),
//         new Game.Model.Question.QuestionChoice("Choice C", 0),
//         new Game.Model.Question.QuestionChoice("Choice D", 1)
//     ]
// ));
// this.QuestionGroup.AddQuestion(new Game.Model.Question.Question(
//     [
//         Game.Model.Question.Enum.QuestionRewardType.RESPONSE_VALUE,
//         Game.Model.Question.Enum.QuestionValidator.Type.MAX_RESPONSE_VALUE,
//     ],
//     "This is a different sample question",
//     [
//         new Game.Model.Question.QuestionChoice("Choice A", 0),
//         new Game.Model.Question.QuestionChoice("Choice B", 0),
//         new Game.Model.Question.QuestionChoice("Choice C", 0),
//         new Game.Model.Question.QuestionChoice("Choice D", 2)
//     ]
// ));


// this.Round = new Game.Model.Question.Round(this.QuestionGroup);

// //  Question 1 (i = 0)
// this.Round.AddResponse("Matt", this.Round.QuestionGroup.Questions[ 0 ].Choices[ 0 ].UUID);
// this.Round.AddResponse("Sarah", this.Round.QuestionGroup.Questions[ 0 ].Choices[ 1 ].UUID);
// this.Round.NextQuestion();

// //  Question 2 (i = 1)
// this.Round.AddResponse("Matt", this.Round.QuestionGroup.Questions[ 1 ].Choices[ 2 ].UUID);
// this.Round.AddResponse("Sarah", this.Round.QuestionGroup.Questions[ 1 ].Choices[ 3 ].UUID);
// this.Round.NextQuestion();

// //  Question 3 (i = 2)
// this.Round.AddResponse("Matt", this.Round.QuestionGroup.Questions[ 2 ].Choices[ 3 ].UUID);
// this.Round.AddResponse("Sarah", this.Round.QuestionGroup.Questions[ 2 ].Choices[ 2 ].UUID);

// console.log(this.Round);
// console.log(this.Round.GetScores([
//     "Matt",
//     "Sarah"
// ]));


// let testIndex = 0;
// console.log(this.QuestionGroup.ValidateResponses([
//     [ testIndex, this.Round.QuestionGroup.Questions[ testIndex ].Choices[ 3 ].UUID ],
//     [ testIndex + 1, this.Round.QuestionGroup.Questions[ testIndex + 1 ].Choices[ 3 ].UUID ],
//     [ testIndex + 2, this.Round.QuestionGroup.Questions[ testIndex + 2 ].Choices[ 2 ].UUID ],
// ]));