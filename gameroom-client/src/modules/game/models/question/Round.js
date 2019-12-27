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