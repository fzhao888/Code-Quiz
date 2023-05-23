var done = false; //tracks if timer is 0s or all questions have been answered

//starts game - hit start button
//starts timer with 120s
//deducts 10s if answer is wrong
//done = true if timer is 0s or all questions have been answered
//saves high score and initials in local storage


var startButton = document.querySelector(".start-button"); 
var timerElement = document.querySelector(".timer-count");
var a = document.getElementById("a");
var b = document.getElementById("b");
var c = document.getElementById("c");
var d = document.getElementById("d");
var question = document.getElementById("question");  
var questionNumber = 0;
var correctAnswer = "";
var choicePicked = "";

var timer;
var timeLeft;
var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        a: "<javascript>",
        b: "<scripting>",
        c: "<script>",
        d: "<js>",
        answer: "c"
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        a: "The <head> section",
        b: "The <body> section",
        c: "Both <head> and <body> sections are correct",
        d: "The <footer> section",
        answer: "c"
    },
    {
        question: "How do you create a function in JavaScript?",
        a: "function = myFunction() ",
        b: "function myFunction()",
        c: "function:myFunction()",
        d: "myFunction()",
        answer: "b"
    } 
]

function init(){
   document.getElementById("questions").style.display = "none";
   document.getElementById("initials").style.display = "none";
   document.getElementById("highscores").style.display = "none";
}

init();

function startQuiz(){
    document.getElementById("welcome").style.display = "none";
    startTimer();
}

function startTimer(){
    timeLeft = 120;
    showQuiz();
    timer = setInterval(function() {
        showQuiz();
        timeLeft--;
        timerElement.textContent = timeLeft;  
        if(timeLeft === 0){
            clearInterval(timer);
            endQuiz();
        }

    },1000); 
}

function showQuiz(){
    document.getElementById("questions").style.display = "block";
    question.textContent = questions[questionNumber+1].question
    a.textContent = questions[questionNumber+1].a;
    b.textContent = questions[questionNumber+1].b;
    c.textContent = questions[questionNumber+1].c;
    d.textContent = questions[questionNumber+1].d;
    correctAnswer = questions[questionNumber+1].answer;
}


function endQuiz(){

}

startButton.addEventListener("click",startQuiz);

a.addEventListener("click",function(){
    choicePicked = "a";
    if(choicePicked === correctAnswer){

    }else{
        timeLeft -= 10;
    }
});

b.addEventListener("click",function(){
    choicePicked = "b";
    if(choicePicked === correctAnswer){

    }else{
        timeLeft -= 10;
        timerElement.textContent = timeLeft;
    }
});

c.addEventListener("click",function(){
    choicePicked = "c";
    if(choicePicked === correctAnswer){

    }else{
        timeLeft -= 10;
        timerElement.textContent = timeLeft;
    }
});

d.addEventListener("click",function(){
    choicePicked = "d";
    if(choicePicked === correctAnswer){

    }else{
        timeLeft -= 10;
        timerElement.textContent = timeLeft;
    }
});
