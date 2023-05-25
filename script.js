//starts game - hit start button
//starts timer with 120s
//deducts 10s if answer is wrong
//done = true if timer is 0s or all questions have been answered
//saves high score and initials in local storage

//gets the DOM objects
var welcome = document.getElementById("welcome");
var startButton = document.querySelector(".start-button"); 
var tryagainButton = document.getElementById("try-again");
var submitButton = document.getElementById("submit"); 
var resetButton = document.getElementById("reset");
var timerElement = document.querySelector(".timer-count"); 

var studentName = document.getElementById("initials-hs"); 
var enterInitialsEl = document.getElementById("initials-card");

var highscoreCard = document.getElementById("highscore");
var displayScores = document.getElementById("display-highscore");
var yourScoreEl = document.getElementById("yourscore");

var resultEl = document.getElementById("result");
var a = document.getElementById("a");
var b = document.getElementById("b");
var c = document.getElementById("c");
var d = document.getElementById("d");
var questionEl = document.getElementById("question"); 
var questionsCard = document.getElementById("question-card"); 
//end of getting the DOM objects

var questionNumber = 0;
var correctAnswer = "";
var choicePicked = "";
var done = false; //tracks if timer is 0s or all questions have been answered

var timer;
var timeLeft;

//creates a questions array which stores objects with the fields of questions, four choices, and answer
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

//initialize webpage
function init(){
   questionsCard.style.display = "none";
   enterInitialsEl.style.display = "none";
   highscoreCard.style.display = "none";
}

init();

//starts quiz
function startQuiz(){
    welcome.style.display = "none";
    startTimer();
}

//starts timer
function startTimer(){
    timeLeft = 120;
    showQuiz();  
    timer = setInterval(function() {
        if(!done && timeLeft>0){//checks if time left AND there are still questions left
            showQuiz();
            timeLeft--;
            timerElement.textContent = timeLeft;
        }  
        
        if(timeLeft <= 0 || done){//checks if no time left OR no questions left
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

//displays questions
function showQuiz(){
    questionsCard.style.display = "block";
    questionEl.textContent = questions[questionNumber].question
    a.textContent = questions[questionNumber].a;
    b.textContent = questions[questionNumber].b;
    c.textContent = questions[questionNumber].c;
    d.textContent = questions[questionNumber].d;
    correctAnswer = questions[questionNumber].answer;
}

//ends quiz
function endQuiz(){
    questionsCard.style.display = "none"; 
    enterInitialsEl.style.display = "block";  
}

//checks if answer is correct or wrong and displays it
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

//renders the top five score
function renderScore(){
    var length;
    var scores = JSON.parse(localStorage.getItem("scores"));
    if(scores === null){
        return;
    }
    //sorts all the scores in local storage
    scores.sort(function(a,b){
        return b.score - a.score;
    }); 
    
    displayScores.textContent = "";
    
    /*
        if we have less than five scores, display what we have
        else display top five scores
    */
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
    highscoreCard.style.display = "table"; 
}

//adds event listeners for start,a,b,c,d,submit, try again, and reset buttons
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
    //stores name and score in a student object
    var student = {
        name: studentName.value,
        score: timeLeft
    };

    //checks if initials are enter
    if(student.name.trim().length === 0){
        window.alert("You have entered a blank name. Please try again!");
        return;
    } 
     
    enterInitialsEl.style.display = "none";
    yourScoreEl.textContent = student.name + " " + student.score;      

    var scores = JSON.parse(localStorage.getItem("scores"));//retrieves scores from local storage

    //if there was no previous score, then create an array of scores
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
    localStorage.setItem("scores",JSON.stringify(scores)); //updates scores in local storage
    renderScore(); 
}); 

 
resetButton.addEventListener("click", function(event){
    event.preventDefault();
    localStorage.clear();
    displayScores.textContent = "";
    yourScoreEl.textContent = "";
});

tryagainButton.addEventListener("click",function(event){
    location.reload();
});
//end of adding event listeners