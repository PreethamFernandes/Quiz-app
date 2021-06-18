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

let questions = [
    {
        "question": "Which tag in HTML is used to add a Paragraph",
        "choice1": "p",
        "choice2": "paragraph",
        "choice3": "para",
        "choice4": "p1",
        "answer": 1
    },
    {
        "question": "Which of the the following is a JavaScript Frontend Framework",
        "choice1": "Bootstrap",
        "choice2": "Express.js",
        "choice3": "React.js",
        "choice4": "Laravel",
        "answer": 3
    },
    {
        "question": "Which tag in used to add internal CSS in HTML",
        "choice1": "CSS",
        "choice2": "internal",
        "choice3": "stylesheet",
        "choice4": "style",
        "answer": 4
    },
    {
        "question": "Which of the following languages is used for Server Side Scripting",
        "choice1": "C",
        "choice2": "PHP",
        "choice3": "Flutter",
        "choice4": "CSS",
        "answer": 2
    }

]


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