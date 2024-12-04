/**
 * Curried function, when fully applied, returns a random integer between min and max.
 */
const getRandomIntFromMinToMax = min => max => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Returns a random integer between 1 and max
 */
const getRandomInt = getRandomIntFromMinToMax(1);

/**
 * Returns a random integer between 2 and max
 */
const getRandomIntGT1 = getRandomIntFromMinToMax(2);


/**
 * Model object that represents the state of the application.
 * Note, the value of the answer input element is not stored as part of the application state.
 * The application state updates when a new question is generated or when the user submits an answer.
 */
const model = {
    currentCategory: "addition",
    leftOperandValue: 0,
    rightOperandValue: 0,
    correctAnswer: 0,
    numCorrectAnswers: 0,
    numIncorrectAnswers: 0,
    /**
     * Returns the current state of the application.
     */
    getState() {
        return {
            currentCategory: this.currentCategory,
            leftOperandValue: this.leftOperandValue,
            rightOperandValue: this.rightOperandValue,
            correctAnswer: this.correctAnswer,
            numCorrectAnswers: this.numCorrectAnswers,
            numIncorrectAnswers: this.numIncorrectAnswers
        };
    },
    /**
     * Updates state of application with new question based on category.
     */
    setupQuestion(category) {
        this.currentCategory = category;
        switch (category) {
            case "addition":
                this.leftOperandValue = getRandomInt(50);
                this.rightOperandValue = getRandomInt(50);
                this.correctAnswer = this.leftOperandValue + this.rightOperandValue;
                break;
            case "subtract":
                let subtractTemp1 = getRandomInt(50);
                let subtractTemp2 = getRandomInt(50);
                this.leftOperandValue = Math.max(subtractTemp1, subtractTemp2);
                this.rightOperandValue = Math.min(subtractTemp1, subtractTemp2);
                this.correctAnswer = this.leftOperandValue - this.rightOperandValue;
                break;
            case "multiply":
                this.leftOperandValue = getRandomIntGT1(20);
                this.rightOperandValue = getRandomIntGT1(20);
                this.correctAnswer = this.leftOperandValue * this.rightOperandValue;
                break;
            case "division":
                let divisionTemp1 = getRandomIntGT1(20);
                let divisionTemp2 = getRandomIntGT1(20);
                let product = divisionTemp1 * divisionTemp2;
                this.leftOperandValue = product;
                this.rightOperandValue = divisionTemp1;
                this.correctAnswer = divisionTemp2;
                break;
        }   
    },
    /**
     * Updates the state of the application with the user's answer.
     */
    submitAnswer(userAnswer) {
        if (userAnswer === this.correctAnswer) {
            this.numCorrectAnswers++;
        } else {
            this.numIncorrectAnswers++;
        }
        this.setupQuestion(this.currentCategory);
    }
};


/**
 * View object that represents the UI of the application.
 */
const view = {
    leftOperandEl: document.getElementById("operand1"),
    rightOperandEl: document.getElementById("operand2"),
    operatorEl: document.getElementById("operator"),
    answerBoxEl: document.getElementById("answer-box"),
    correctAnswerScoreEl: document.getElementById("score"),
    incorrectAnswerScoreEl: document.getElementById("incorrect"),
    additionButtonEl: document.querySelector('button[data-type="addition"]'),
    subtractionButtonEl: document.querySelector('button[data-type="subtract"]'),
    multiplicationButtonEl: document.querySelector('button[data-type="multiply"]'),
    divisionButtonEl: document.querySelector('button[data-type="division"]'),
    submitButtonEl: document.querySelector('button[data-type="submit"]'),
    /**
     * Maps categories to their respective operators, only for internal use by view object.
     * @param {*} category 
     * @returns 
     */
    _getOperator(category) {
        switch (category) {
            case "addition":
                return "+";
            case "subtract":
                return "-";
            case "multiply":
                return "x";
            case "division":
                return "÷";
            default:
                return "+";
        }
    },
    /**
     * Updates the DOM with the current state of the application.
     */
    render(state) {
        this.leftOperandEl.textContent = state.leftOperandValue;
        this.rightOperandEl.textContent = state.rightOperandValue;
        this.operatorEl.textContent = this._getOperator(state.currentCategory);
        this.correctAnswerScoreEl.textContent = state.numCorrectAnswers;
        this.incorrectAnswerScoreEl.textContent = state.numIncorrectAnswers;
        this.answerBoxEl.value = "";
        this.answerBoxEl.focus();
    }
}


/**
 * Controller object that connects the model and view objects.
 */
const controller = {
    answerBoxEl: document.getElementById("answer-box"),
    additionButtonEl: document.querySelector('button[data-type="addition"]'),
    subtractionButtonEl: document.querySelector('button[data-type="subtract"]'),
    multiplicationButtonEl: document.querySelector('button[data-type="multiply"]'),
    divisionButtonEl: document.querySelector('button[data-type="division"]'),
    answerBoxEl: document.getElementById("answer-box"),
    submitButtonEl: document.querySelector('button[data-type="submit"]'),
    /**
     * Initializes the application.
     */
    init() {
        this.setupEventListeners();
        model.setupQuestion("addition");
        view.render(model.getState());
    },
    /**
     * Attaches event listeners to the UI elements.
     */
    setupEventListeners() {
        this.additionButtonEl.addEventListener("click", e => this.setupQuestion("addition"));
        this.subtractionButtonEl.addEventListener("click", e => this.setupQuestion("subtract"));
        this.multiplicationButtonEl.addEventListener("click", e => this.setupQuestion("multiply"));
        this.divisionButtonEl.addEventListener("click", e => this.setupQuestion("division"));
        this.submitButtonEl.addEventListener("click", e => this.submitAnswer());
        this.answerBoxEl.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                this.submitAnswer();
            }
        });
    },
    /**
     * Sets up a new question by updating the model and re-rendering the view.
     */
    setupQuestion(category) {
        model.setupQuestion(category);
        view.render(model.getState());
    },
    /**
     * Submits the user's answer by updating the model and re-rendering the view.
     */
    submitAnswer() {
        model.submitAnswer(parseInt(this.answerBoxEl.value));
        view.render(model.getState());
    }
}

controller.init();



