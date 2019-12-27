export default class Round {
    constructor(group, order = 1) {
        this.QuestionGroup = group;
        this.Order = order;

        this.Responses = {};
    }

    /**
     * @param {UUID|ID} player A unique identifier for the given player (e.g. Peer.id, UUID, etc.)
     * @param {UUID} choice The UUID of the QuestionChoice
     */
    AddResponse(player, choice) {
        let index = this.QuestionGroup.Index;

        if(!this.Responses[ index ]) {
            this.Responses[ index ] = {};
        }

        this.Responses[ index ][ player ] = choice;

        return this;
    }

    /**
     * Currently only works with `QuestionValidatorType[ HIGHEST_VALUE, LOWEST_VALUE ]`
     * @param {UUID[]} players This serves as the "lookup" for adding points
     */
    GetScores(players = []) {
        let scores = {};

        players.forEach(p => scores[ p ] = 0);

        for(let index in this.Responses) {
            for(let player of players) {
                let question = this.QuestionGroup.Get(index),
                    [ isCorrect, value ] = question.ValidateResponse(this.Responses[ index ][ player ]);

                    if(isCorrect) {
                        scores[ player ] += value;
                    }
            }
        }
    }
}