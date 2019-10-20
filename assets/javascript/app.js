let game_msg = "";

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

    InitializeQuestions();

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