const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"))

let currentQuestion = [];
let acceptingAnswers = false;
let score = 0;
let QuestionCounter = 0;
let availableQuestions = [];

let progressText = document.getElementById("progressText")
let scoreText = document.getElementById("score")
var progressBarFull = document.getElementById("progressBarFull")

let questions = 

fetch("question.json").then(res => {
    return res.json();
})
.then(loadedQuestions => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
})
.catch(err => {
    console.log(err)
})

const correctBonus = 10;
const maxQuestions = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;  
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || QuestionCounter > maxQuestions) {
        localStorage.setItem("mostRecentScore", score)
        return window.location.assign("end.html")

    }
    QuestionCounter++;
    progressText.innerText = `Question: ${QuestionCounter}/${maxQuestions}`;
    progressBarFull.style.width = `${(QuestionCounter / maxQuestions) * 100}%`;
    
    
    let questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    })
    
    availableQuestions.splice(questionIndex, 1)
    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;
        
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"

        if(classToApply === "correct") {
            incrementScore(correctBonus)
        }
        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 500)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerHTML = score
}


startGame()