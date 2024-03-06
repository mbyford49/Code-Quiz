let time = 60;
var intervalId;
var currentQuestionIndex = 0;
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var reactionEl = document.getElementById("reaction");
var timerEl = document.getElementById("time");
var timer = document.querySelector("#start");

function playBall(){
    var introEl = document.getElementById("intro");
    introEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    const htmlTochange=document.getElementById("time")
    htmlTochange.textContent=time
    intervalId=setInterval(function(){
        time--
        htmlTochange.textContent=time
        if(time < 1){
            clearInterval(intervalId)
            getScore(); }
    },1000);
    
    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl =document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";
    for ( var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
        choiceNode.textContent = i + 1 + ". " + choice;
        choicesEl.appendChild(choiceNode);
    }
}

function questionClick(event) {
    var buttonEl = event.target;
    if (buttonEl.value !== questions[currentQuestionIndex].answer){
        time -= 10;
        if (time < 1){
            time = 0;
        }
    }
    if(buttonEl.value === questions[currentQuestionIndex].answer) {
        reactionEl.textContent = "Correct!";
    } else {
        reactionEl.textContent = "Nope!"
    }
    currentQuestionIndex++;

    if (time<1 || currentQuestionIndex === questions.length) {
        clearInterval(intervalId);
        getScore();
    } else {
    getQuestion();
    }
}



function getScore() {
    console.log("getting score");
    var scoreEl = document.getElementById("score");
    scoreEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
    reactionEl.setAttribute("class", "hide");
    const previousScores = localStorage.getItem("high-scores")
    if (previousScores){
      var parsedScores =  JSON.parse(previousScores)
      parsedScores.push(finalScoreEl.textContent);
      localStorage.setItem("high-scores", JSON.stringify(parsedScores));
    } else { 
        const highScores = JSON.stringify([finalScoreEl.textContent]);
        localStorage.setItem("high-scores", highScores);
    }
}

timer.addEventListener("click", playBall);
choicesEl.addEventListener("click", questionClick);

