const username = document.getElementById('username')
const save = document.getElementById('saveScoreBtn')
let recentScore = localStorage.getItem('mostRecentScore')
let finalScore = document.getElementById('finalScore')

// localStorage.setItem('highScores', JSON.stringify([]))
const highScores =  JSON.parse(localStorage.getItem("highScores")) || []
const max_high_scores = 5;
console.log(highScores)

finalScore.innerHTML = recentScore

username.addEventListener("keyup", () => {
    save.disabled = !username.value
})

saveHighScore = event => {
    event.preventDefault()
    console.log("You clicked on Save!");
    
    let score = {
        score: Math.floor(Math.random() * 100),
        name: username.value
    }
    highScores.push(score)

    highScores.sort((a,b) => b.score - a.score) 

    highScores.splice(5)

    localStorage.setItem("highScores", JSON.stringify(highScores))
    window.location.assign("/code/quiz/index.html")
}
