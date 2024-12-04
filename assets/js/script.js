/**
 * Description of behaviour
 * 
 * There are four categories of questions - addition, subtraction, multiplication, and division.
 * The user is contiuously asked questions for the currently selected category. Each question is randomly
 * generated, consisting of two randomly selected operands, with the relevant operator. 
 * 
 * When the user submits the correct answer, the users correct answers count is incremented by 1, and when
 * the user submits the incorrect answer, the users incorrect answers count is incremented by 1.
 * 
 * There is no end  - the user can continue answering questions until they decide to stop, switching between
 * categories whenever they wish.
 * 
 * 
 * 
 */


console.log("Aloha, world!");

// Element selectors
const leftOperand = document.getElementById("operand1");
const rightOperand = document.getElementById("operand2");
const operator = document.getElementById("operator");
const answerBox = document.getElementById("answer-box");
const correctAnswerScore = document.getElementById("score");
const incorrectAnswerScore = document.getElementById("incorrect");
const additionButton = document.querySelector('button[data-type="addition"]');
const subtractionButton = document.querySelector('button[data-type="subtract"]');
const multiplicationButton = document.querySelector('button[data-type="multiply"]');
const divisionButton = document.querySelector('button[data-type="division"]');
const submitButton = document.querySelector('button[data-type="submit"]');

// other global variables
let correctAnswers = 0;
let incorrectAnswers = 0;
let currentCategory = "addition";
let leftOperandValue = 0;
let rightOperandValue = 0;
let correctAnswerValue = 0;


// user selects a category
// random operands are generated, and the answer is calculated and stored
// view is updated to show question
// user submits answer, answer is checked against stored answer
// dialog is displayed to show if answer is correct or incorrect, and counters are updated
// new question in the current category is generated, view updated, steps are repeated

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}


function setupQuestion(category) {
    answerBox.value = "";
    currentCategory = category;
    console.log(`Category selected: ${currentCategory}`);
    
    if (category === "addition") {
        operator.textContent = "+";
        leftOperandValue = getRandomInt(50);
        rightOperandValue = getRandomInt(50);
        correctAnswerValue = leftOperandValue + rightOperandValue;
    } else if (category === "subtract") {
        operator.textContent = "-";
        let num1 = getRandomInt(50);
        let num2 = getRandomInt(50);
        leftOperandValue = Math.max(num1, num2);
        rightOperandValue = Math.min(num1, num2);
        correctAnswerValue = leftOperandValue - rightOperandValue;
    } else if (category === "multiply") {
        operator.textContent = "x";
        leftOperandValue = getRandomInt(19) + 1;
        rightOperandValue = getRandomInt(19) + 1;
        correctAnswerValue = leftOperandValue * rightOperandValue;
    } else {
        operator.textContent = "÷";
        let num1 = getRandomInt(19) + 1;
        let num2 = getRandomInt(19) + 1;
        let product = num1 * num2;
        leftOperandValue = product;
        rightOperandValue = num1;
        correctAnswerValue = num2;
    }
    leftOperand.textContent = leftOperandValue;
    rightOperand.textContent = rightOperandValue;
    answerBox.focus();
}


function submitAnswer() {
    
    const userAnswer = parseInt(answerBox.value);
    if (userAnswer === correctAnswerValue) {
        console.log("You are correct!");
        correctAnswers++;
        correctAnswerScore.textContent = correctAnswers;
        
    } else {
        console.log("You are incorrect!");
        incorrectAnswers++;
        incorrectAnswerScore.textContent = incorrectAnswers;
    }
    setupQuestion(currentCategory);

}



additionButton.addEventListener("click", e => setupQuestion("addition"));
subtractionButton.addEventListener("click", e => setupQuestion("subtract"));
multiplicationButton.addEventListener("click", e => setupQuestion("multiply"));
divisionButton.addEventListener("click", e => setupQuestion("division"));

submitButton.addEventListener("click", submitAnswer);
answerBox.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        submitAnswer();
    }
});





// Setup the first question
setupQuestion("addition");














