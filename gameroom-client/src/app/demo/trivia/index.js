import Main from "./../../Main";
import TriviaHandler from "./TriviaHandler";

export default class Trivia extends Main {
    constructor() {
        super(
            "trivia",
            new TriviaHandler(this)
        );
    }
}