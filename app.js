var time =  60;
var currentQuestion = 0;
var timerId;

var startEl = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var startBtn = document.querySelector("#startBtn");
var submitBtn = document.querySelector("#submitHighscore");
var timerEl = document.querySelector("#time")

var highscoresEl = document.querySelector("#highscores")
var endScreen = document.querySelector("#end-screen")

var questionArr = [
  {
    question: "Who is Bod and Linda's oldest child?",
    answers: [
      "Tina","Louise","Teddy","Gene","Tammy"
    ],
    correct: 0
  },
  {
    question: "What is Tina obsessed with?",
    answers: [
      "Onions","Cars","Boys","Math"
    ],
    correct: 3
  }
]
// Use this as a refernce to find a certain answer for a certain question
// var firstQA = questionArr[0].answers[0] 
// to find correct answer you get answers[questionArr[0].correct] === userPick -> correct
/*
for(let i = 0; i < questionArr.length; i++){
  var userPick = document.querySelector("answer")
  if(answers[question[i].correct] === userPick){
    copnsole.log("correct")
  } else {
    console.log("wrong")
  }
}
*/

function startQuiz(){
  console.log ("start")
startEl.classList.add("hide")
questionsEl.classList.remove("hide")

timerId = setInterval(timerCountdown, 1000)

timerEl.textContent = time
startQuestions()

}

function timerCountdown(){
  time--;
  timerEl.textContent = time
  if(time <= 0){
    endGame()
  }
  //check if time is 0
}
function startQuestions(){

var titleEl = document.querySelector("#question-titles")
titleEl.textContent = questionArr[currentQuestion].question
var choices = document.querySelector("#choices")
choices.innerHTML=""
var choiceArr = questionArr[currentQuestion].answers
for (var i=0; i < choiceArr.length; i++){
  var choice = document.createElement("button")
  choice.textContent = choiceArr[i] 
  choice.setAttribute("value", choiceArr[i])
  choice.onclick = answerClick
  choices.appendChild(choice)

}
}

function answerClick(){
var answer = questionArr[currentQuestion].answers
var index = questionArr[currentQuestion].correct
if(this.value != answer[index]){
  time -= 15
  if(time < 0){
    time = 0
  }
  timerEl.textContent = time
}

currentQuestion++

if(currentQuestion == questionArr.length){
  endGame()
} else {
  startQuestions()
}

}

function endGame(){
  clearInterval(timerId)
  var endScreen = document.querySelector("#end-screen")
  endScreen.classList.remove("hide")
  questionsEl.classList.add("hide")
  var finalScore = document.querySelector("#final-score")
  finalScore.textContent = time 
}

function highScore(){
  endScreen.classList.add("hide")
  highscoresEl.classList.remove("hide")
  var initialsEl = document.querySelector("#initials")
  var scoreEl = document.createElement("h1")
  scoreEl.textContent = initialsEl.value + ": " + time
  highscoresEl.appendChild(scoreEl)
}

function playAgain(){
  highscoresEl.classList.add("hide")
  startEl.classList.remove("hide")
  time = 75;
  timerEl.textContent = time
}


startBtn.onclick = startQuiz;
submitBtn.onclick = highScore;
document.querySelector("#play-again").onclick = playAgain;