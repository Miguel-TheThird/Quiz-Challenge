var viewScore = document.querySelector("#view-scores");
var viewCount = document.querySelector("#timer-count");
var startBtn = document.querySelector("#start-button");
var nextBtn = document.querySelector("#next-button");
var questionsTxt = document.querySelector("#questions-text");
var messageTxt = document.querySelector("#msg")
var answersDiv = document.getElementById("answer-button")
var btn = document.querySelector("#btn") 
var btn = document.querySelector("#btn") 
var btn = document.querySelector("#btn") 
var initialsDiv = document.getElementById("initials-Div") 
var inputName = document.getElementById("initials")
var submitBtn = document.getElementById("submit")
var scoreDiv = document.getElementById("scoreDiv")
var scoreList = document.getElementById("highScoreList")
var closeBtn = document.getElementById("closebtn")
var clearBtn = document.getElementById("clearbtn")


var timerCount;
var timer;
var currentQuestionIndex = 0;
var score;

var quizArray = [
    {
        question: 'What is 1 + 1?',
        options: ["2"," 22", "222"],
        correct: 0,
      },
      {
        question: 'What is 2 + 2?',
        options: ["4","44", "444"],
        correct: 0,
      },
      {
        question: 'What is 3 + 3?',
        options: ["6","66", "666"],
        correct: 0,
      },

      {
        question: 'What is 4 + 4?',
        options: ["8","88", "888"],
        correct: 0,
      },
];

//********************EVENTS************************************/
startBtn.addEventListener("click", startGame);
answersDiv.addEventListener("mousedown", checkAnswer);
answersDiv.addEventListener("mouseup", clearMessage);
submit.addEventListener("mousedown", addToHighScore);
submit.addEventListener("mouseup", removeInitDiv); 
viewScore.addEventListener("click", showList);
closeBtn.addEventListener("click", closeScoreList);
clearBtn.addEventListener("click", clearScoreList);
//*****************START QUIZ**********************************/

function startGame(){
    timerCount = 10;
    currentQuestionIndex = 0;
    score = 0;
    removeAswerDivButtons(answersDiv);
    startTimer();
    showQuestion();
    
}

//*****************TIMER********************************************/
function startTimer(){
    timer = setInterval( function(){
    timerCount--;
    console.log(timerCount);
    viewCount.textContent = " " + timerCount; //Introduces a space between text and
    
    if(timerCount <= 0){
      gameOver("Time is Up!");
      questionsTxt.innerHTML = "";
      removeAswerDivButtons(answersDiv);
      stopTimer();
    }
    
  }, 1000);
}
function stopTimer() {
  clearInterval(timer);
}
//*******************SHOW QUESTION***********************************/
function showQuestion(){
  
  questionsTxt.innerHTML = quizArray[currentQuestionIndex].question; //Assign questions by index to div innerhtml 

  for(i = 0; i < quizArray[currentQuestionIndex].options.length; i++){ //Access to the right answer through i
    var answerBtn = document.createElement("button"); //Create a button
    answerBtn.setAttribute("type", "button"); //Set button attribute
    answerBtn.setAttribute("class", "answer-button");
    answerBtn.setAttribute("class","button");
    if (i === 0) {     
      answerBtn.setAttribute("correct", "Correct"); 
      
    } else {
      answerBtn.setAttribute("correct", "Wrong");
    }
    answerBtn.textContent = quizArray[currentQuestionIndex].options[i]; 
    answersDiv.append(answerBtn);
    } 
    answersDiv.childNodes.forEach(function () {
      var randomIndex = Math.floor(Math.random() * 3 ); // Needs to be fix 
      answersDiv.append(answersDiv.children[randomIndex]);});
     
}
//*********************CHECK ANSWER******************************************/

function checkAnswer(event){
  if (event.target.getAttribute("correct") === "Correct") {
    displayMessage(true);
    score++;
    console.log("Score" + score);
    currentQuestionIndex++;
    removeAswerDivButtons(answersDiv);
    
    if (currentQuestionIndex === quizArray.length){
      questionsTxt.innerHTML = ""; 
      gameOver("All questions done!") 
      
    }
    showQuestion();
     
  }else{
    displayMessage(false)
  }
}
//******************REMOVE CREATED BUTTONS***********************************/
function removeAswerDivButtons(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

//***********DISPLAY MESSAGE and CLEAR MESSAGE**********************************/
function displayMessage(correct){
  if(correct){
  messageTxt.innerHTML = "Correct";
  }else{
    messageTxt.innerHTML = "Wrong";
  }
}

function clearMessage(){
  messageTxt.innerHTML = " ";
}

//**********************GAME OVER**************************************/
function gameOver(a){
  messageTxt.innerHTML = a;  //Parameter will get a message to be displayed
  initialsDiv.classList.remove("hide");
  stopTimer();
}
//**********************HIGH SCORE***************************************/
function addToHighScore(){
  var highScoreElement = document.createElement("li");
  var playerInitials = inputName.value + " - " + score;
  highScoreElement.innerText = playerInitials
  console.log(highScoreElement);
  scoreList.appendChild(highScoreElement)
  localStorage.setItem("Score", inputName.value + " - " + score);
  console.log(scoreList)
}
//***********************LIST FOR HIGH SCORES**************************************/
function showList(){
  scoreDiv.classList.remove("hide");
}

function removeInitDiv(){
  initialsDiv.className = "hide";
}

function closeScoreList(){
  scoreDiv.className = "hide";
}

function clearScoreList(){
  while (scoreList.firstChild) {
    scoreList.removeChild(scoreList.firstChild);
}
}
