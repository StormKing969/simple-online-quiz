// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Which one is the first fully supported 64-bit operating system?",
        imgSrc : "img/cs.jpg",
        choiceA : "Linux",
        choiceB : "Windows Vista",
        choiceC : "Windows XP",
        correct : "A"
    },{
        question : "Which of the following is not a web browser?",
        imgSrc : "img/cs.jpg",
        choiceA : "WWW",
        choiceB : "Facebook",
        choiceC : "MOSAIC",
        correct : "B"
    },{
        question : "In computer world, Trojan refers to?",
        imgSrc : "img/cs.jpg",
        choiceA : "Worm",
        choiceB : "Virus",
        choiceC : "Malware",
        correct : "C"
    },{
        question : "Which one of the following is a programming language?",
        imgSrc : "img/cs.jpg",
        choiceA : "HTTP",
        choiceB : "HPML",
        choiceC : "HTML",
        correct : "C"
    },{
        question : "Which protocol is used to receive e-mail?",
        imgSrc : "img/cs.jpg",
        choiceA : "FTP",
        choiceB : "POP3",
        choiceC : "HTTP",
        correct : "B"
    },{
        question : "Which protocol is used to send e-mail?",
        imgSrc : "img/cs.jpg",
        choiceA : "SMTP",
        choiceB : "SSH",
        choiceC : "HTTP",
        correct : "A"
    },{
        question : "When a computer suddenly stops working, it is said to be?",
        imgSrc : "img/cs.jpg",
        choiceA : "Crashed",
        choiceB : "Bugged",
        choiceC : "Hanged",
        correct : "C"
    },{
        question : "A compiler that automatically detects parallelisms is known as?",
        imgSrc : "img/cs.jpg",
        choiceA : "Run-time compiler",
        choiceB : "Interpreter",
        choiceC : "Optimising compiler",
        correct : "C"
    },{
        question : "The informtation transfer between CPU and cache is in term of?",
        imgSrc : "img/cs.jpg",
        choiceA : "Bits",
        choiceB : "Words",
        choiceC : "Bytes",
        correct : "B"
    },{
        question : "Caches are usually built out of?",
        imgSrc : "img/cs.jpg",
        choiceA : "SRAMS",
        choiceB : "EEPROM",
        choiceC : "PROM",
        correct : "A"
    },{
        question : "Instructions and memory addresses in the RAM of a computer are stored using?",
        imgSrc : "img/cs.jpg",
        choiceA : "Decimal Digits",
        choiceB : "Binary Digits",
        choiceC : "Octal Digits",
        correct : "B"
    },{
        question : "What is a hyperlink?",
        imgSrc : "img/cs.jpg",
        choiceA : "It is used to save the web site",
        choiceB : "None of the answers",
        choiceC : "It is used to link web pages",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















