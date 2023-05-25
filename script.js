var done = false; //tracks if timer is 0s or all questions have been answered

//starts game - hit start button
//starts timer with 120s
//deducts 10s if answer is wrong
//done = true if timer is 0s or all questions have been answered
//saves high score and initials in local storage


var startButton = document.querySelector(".start-button"); 
var tryagainButton = document.getElementById("try-again");
var submitButton = document.getElementById("submit"); 
var resetButton = document.getElementById("reset");
var timerElement = document.querySelector(".timer-count"); 
var studentName = document.getElementById("initials-hs"); 
var enterInitialsEl = document.getElementById("initials");
var displayScores = document.getElementById("display-highscore");
var yourScoreEl = document.getElementById("yourscore");
var resultEl = document.getElementById("result");
var a = document.getElementById("a");
var b = document.getElementById("b");
var c = document.getElementById("c");
var d = document.getElementById("d");
var questionEl = document.getElementById("question");  
var questionNumber = 0;
var correctAnswer = "";
var choicePicked = "";
var done = false;

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
    },

    {
        question: "What is the correct way to write a JavaScript array?",
        a: "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")  ",
        b: "var colors = [\"red\", \"green\", \"blue\"]",
        c: "var colors = (1:\"red\", 2:\"green\", 3:\"blue\")",
        d: "var colors = \"red\", \"green\", \"blue\"",
        answer: "b"
    },

    {
        question: "How does a FOR loop start?",
        a: "for (i = 0; i <= 5)",
        b: "for (i <= 5; i++)",
        c: "for i = 1 to 5",
        d: "for (i = 0; i <= 5; i++)",
        answer: "d"
    }
];

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
    timeLeft = 5;
    showQuiz();
    timer = setInterval(function() {
        if(!done && timeLeft>0){
            showQuiz();
            timeLeft--;
            timerElement.textContent = timeLeft;
        }  
        
        if(timeLeft <= 0 || done){
            resultEl.textContent = "";

            if(timeLeft < 0){
                timeLeft = 0;
                timerElement.textContent = 0;
            }
            clearInterval(timer);
            endQuiz();
        }

    },1000); 
}

function showQuiz(){
    document.getElementById("questions").style.display = "block";
    questionEl.textContent = questions[questionNumber].question
    a.textContent = questions[questionNumber].a;
    b.textContent = questions[questionNumber].b;
    c.textContent = questions[questionNumber].c;
    d.textContent = questions[questionNumber].d;
    correctAnswer = questions[questionNumber].answer;
}


function endQuiz(){
    document.getElementById("questions").style.display = "none"; 
    enterInitialsEl.style.display = "block";  
}


function checkAnswer(){ 
    if(choicePicked === correctAnswer){
        questionNumber++; 
        resultEl.textContent = "Correct!";

        setTimeout(function(){
            resultEl.textContent = "";
        },500);

        if(questionNumber === questions.length){
            done = true; 
        }
    }else{
        timeLeft -= 10;
        resultEl.textContent = "Wrong!"; 
    } 
}

function renderScore(){
    var length;
    var scores = JSON.parse(localStorage.getItem("scores"));
    if(scores === null){
        return;
    }
    
    scores.sort(function(a,b){
        return b.score - a.score;
    }); 
    
    displayScores.textContent = "";
    
    if(scores.length<5){
        length = scores.length;
    }else{
        length = 5;
    }
    
    for(var i=0; i<length;i++){ 
        var scoreEl = document.createElement("li");  
        scoreEl.textContent = scores[i].name + " " + scores[i].score;
        displayScores.appendChild(scoreEl);
    }
    document.getElementById("highscores").style.display = "table"; 
}

startButton.addEventListener("click",startQuiz);

a.addEventListener("click",function(){
    choicePicked = "a";
    checkAnswer();
});

b.addEventListener("click",function(){
    choicePicked = "b";
    checkAnswer();
});

c.addEventListener("click",function(){
    choicePicked = "c";
    checkAnswer();
});

d.addEventListener("click",function(){
    choicePicked = "d";
    checkAnswer();
});

submitButton.addEventListener("click", function(event){ 
    event.preventDefault();   
    
    var student = {
        name: studentName.value,
        score: timeLeft
    };

    if(student.name.trim().length === 0){
        window.alert("You have entered a blank name. Please try again!");
        return;
    } 
     
    
    enterInitialsEl.style.display = "none";
    yourScoreEl.textContent = student.name + " " + student.score;      

    var scores = JSON.parse(localStorage.getItem("scores"));
    if(scores === null){
        scores = [];
    } 
    //checks for duplicate entries
    if(scores.length > 0){
        for(var i = 0; i<scores.length;i++){
            if( (scores[i].name === student.name) && (scores[i].score === student.score)){
                renderScore();
                return;
            }
        }
    }
    scores.push(student);
    localStorage.setItem("scores",JSON.stringify(scores));
    renderScore(); 
}); 

 
resetButton.addEventListener("click", function(event){
    event.preventDefault();
    localStorage.clear();
    displayScores.textContent = "";
});

tryagainButton.addEventListener("click",function(event){
    location.reload();
});
 