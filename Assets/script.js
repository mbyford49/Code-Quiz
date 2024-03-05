let time = 60;
var currentQuestionIndex = 0;
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var reactionEl = document.getElementById("reaction");
var timer = document.querySelector("#start");

function playBall(){
    const htmlTochange=document.getElementById("time")
    htmlTochange.textContent=time
    let intervalId=setInterval(function(){
        time--
        htmlTochange.textContent=time
        if(time<1){
            clearInterval(intervalId)
        }
    },1000);
    var introEl = document.getElementById("intro");
    introEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
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
    console.log(buttonEl);
    if(buttonEl.value === questions[currentQuestionIndex].answer) {
        reactionEl.textContent = "Correct!";
    } else {
        reactionEl.textContent = "Nope!"
    }
    currentQuestionIndex++;
    getQuestion();
    
}

timer.addEventListener("click", playBall);
choicesEl.onclick = questionClick;

