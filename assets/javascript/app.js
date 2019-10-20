let game_msg = "";
let currQuestionIndex = 0;
let questionTime = 20;
let nextQuestionTIme = 3;
let intervalID;
let gameActive = false;
let correct = 0;
let incorrect = 0;

let anAnswerChoice = 
{
    what: ""
}

let aQuestion = 
{
    what: "temp question",
    answers: []
}

let myQuestions = 
[
    
]

let useTheseQuestions = 
[
    "What is the capital of Florida?",
    "How many continents are there?",
    "When was the University of Miami founded?",
    "Who was the 39th President of the US?",
    "How many Great Lakes?"
]

let useTheseAnswers = 
[
    ["Miami", "Tallahassee", "Gainesville", "Orlando", 1],
    ["4", "5", "6", "7", 3],
    ["1983", "1925", "1955", "1978", 1],
    ["George W. Bush", "Gerald Ford", "Jimmy Carter", "Bill Clinton", 2],
    ["5", "6", "7", "8", 0]
]


$(document).ready(function()
{
    $("#app_msg").text("Press 'Space' to begin.");

    document.onkeyup = function (event) 
    {

        console.log(event.key);
        if (event.code === 'Space' && !gameActive)
        {
            // Set Timer
            StartTimer();

            InitializeQuestions();

            DisplayQuestion();
        }


        if (event.key === 'c') {
            currQuestionIndex++;

            if (currQuestionIndex < myQuestions.length) 
            {
                DisplayQuestion();
            }
        }
    }
    
    $("#submitButton").click(function()
    {
        StopTimer();

        for (let i = 0; i < 4; i++)
        {
            let currAnswer = "#answerButton" + i;

            if ($(currAnswer)[0].checked)
            {
                let selected = "#" + $(currAnswer)[0].value;

                CheckAnswer(selected);
            }
        }

        setTimeout(UpdateQuestion(), 3000);
        
    })

})

function InitializeQuestions() 
{

    gameActive = true;

    // If the number of questions and answers don't match
    if (!(useTheseQuestions.length === useTheseAnswers.length)) 
    {
        game_msg = "Internal Error: Questions and Answers do not match."
        return;
    }
    else 
    {
        
        for (let i = 0; i < useTheseQuestions.length; i++) 
        {
            let newAnswerChoice = [];
            
            for (let j = 0; j < useTheseAnswers[i].length - 1; j++)
            {
                newAnswerChoice.push({ what: useTheseAnswers[i][j], isCorrect: IsCorrect(useTheseAnswers[i], j)});
            }
            
            myQuestions.push({what: useTheseQuestions[i], answers: newAnswerChoice});
            
        }

        console.log(myQuestions);
    }
}

function IsCorrect(arrAnswer, currIndex)
{
    if (currIndex === arrAnswer[4])
        return true;
    else
        return false;
}

function CheckAnswer(selectedAnswer)
{

    let correctAnswer;

    for (let i = 0; i < myQuestions[currQuestionIndex]["answers"].length; i++)
    {
        let thisAnswer = myQuestions[currQuestionIndex]["answers"][i];

        if (thisAnswer.isCorrect)
        {
            if ($(selectedAnswer).text() === thisAnswer.what)
            {
                correct++;
                break;
            }
            else
            {
                incorrect++;
                break;
            }
        }
    }
}

function DisplayQuestion()
{
    $("#app_msg").text("");
    $("#question").text(myQuestions[currQuestionIndex]["what"]);

    for (let i = 0; i < 4; i++)
    {
        let currAnswer = "#answer" + i;

        $(currAnswer).text(myQuestions[currQuestionIndex]["answers"][i].what);
    }
}

function UpdateQuestion()
{

    $("#correct").text(correct);
    $("#incorrect").text(incorrect);

    currQuestionIndex++;

    if (currQuestionIndex < myQuestions.length) 
    {
        DisplayQuestion();
        questionTime = 20;
        StartTimer();
    }
    else
    {
        gameActive = false;
        $("#app_msg").text("Game Over!");
    }
}

function StartTimer()
{
    questionTime = 20;
    intervalID = setInterval(UpdateTimer, 1000);
}

function UpdateTimer()
{
    if (questionTime > 0)
    {
        questionTime--;
        $("#timeLeft").text(questionTime);   
    }
    else
    {
        StopTimer();
        incorrect++;
        UpdateQuestion();
    }
}

function StopTimer()
{
    clearInterval(intervalID);
}