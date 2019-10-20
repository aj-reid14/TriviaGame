let game_msg = "";
let currQuestionIndex = 0;
let questionTime = 10;
let intervalID;

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

    // Set Timer
    StartTimer();

    InitializeQuestions();

    DisplayQuestion();

    
    $("#submitButton").click(function()
    {
        for (let i = 0; i < 4; i++)
        {
            let currAnswer = "#answerButton" + i;

            if ($(currAnswer)[0].checked)
            {
                let selected = "#" + $(currAnswer)[0].value;

                CheckAnswer(selected);
            }
        }
    })

    // Update the Question
    document.onkeyup = function(event)
    {

        console.log(event);
        if (event.key === 'r')
        {
            currQuestionIndex++;

            if (currQuestionIndex < myQuestions.length)
            {
                DisplayQuestion();
            }
        }
    }

})

function InitializeQuestions() 
{

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
                alert("Correct!");
                break;
            }
            else
            {
                alert("Incorrect.")
                break;
            }
        }
    }
}

function DisplayQuestion()
{
    $("#question").text(myQuestions[currQuestionIndex]["what"]);

    for (let i = 0; i < 4; i++)
    {
        let currAnswer = "#answer" + i;

        $(currAnswer).text(myQuestions[currQuestionIndex]["answers"][i].what);
    }
}

function StartTimer()
{
    intervalID = setInterval(UpdateTime, 1000);
}

function UpdateTime()
{
    if (questionTime > 0)
    {
        questionTime--;
        $("#timeLeft").text(questionTime);   
    }
    else
    {
        alert("Times Up!");
        clearInterval(intervalID);
    }
}