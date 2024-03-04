let time = 60
var timer = document.querySelector("#start");

function startTimer(){
    const htmlTochange=document.getElementById("time")
    htmlTochange.textContent=time
    let intervalId=setInterval(function(){
        time--
        htmlTochange.textContent=time
        if(time<1){
            clearInterval(intervalId)
        }
    },1000)
}

timer.addEventListener("click", startTimer);

