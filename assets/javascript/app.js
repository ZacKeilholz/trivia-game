/*

1. Game Start screen- background image with main div container that containers a 'start' button and game name
2. Press start
3.  On start event, div is cleared (<h1 game name is left alone) and replaced with 
    a. timer counting down from 30 seconds. 
    b. Question
    C. 4 possible answers.  On hover- the individual answer div container background changes to a differnet (complementary) color. 
4. ANSWER CHOSEN EVENTS 
    a. WRONG ANSWER CLICKED: Div is cleared, ANSWER PAGE COUNDOWN (5 secs) is started, Div is  replaced with 
        i. NOPE,  
        ii. Correct answer was: 
        iii. Image related to the question.  
        iv.  After 5 seconds, the div clears and we move to the next question (Go back to #3).
    b. CORRECT ANSWER CLICKED: Div is cleared, ansser page countdown (5 secs is started), and div is replaced with: 
        i. YEP
        ii. Image (or Gif) related to answer. 
        iii. Countdown ends and we go back to #3.
5. The END.  When there are no more questions to ask, Div is cleared, and this is displayed: 
    i All done Here's how you did.
    ii. Correct Answers
    iii incorrect answers
    iv unanswered: 1
    V.  Start Over Button? 
6. Start over button Resets the game...  



    //Create HTML Element
  /* 
        var a = $("<button>");
        a.attr("data-name",movies[i]);
        a.text(movies[i]);
        $("#movies-view").append(a);
        or to append, you could
        $("#movies-view").append("<button data-name='moviename '>"+movies[i]+"</button>");
        */

/* 
Awesome JS Snippets- 
cl - console log
si - set interval
st - set timeout
jqclass - jq class
jqempty
jqdoc - document ready
*/

$(document).ready(function () {

    //Define Epic Object

    var triviaGame = {
        placeholder: "something",


        gameStart: false,
        questionNumber: 0,
        questionLibrary:
            [{
                question: "Fav Fruit?",
                answer: 2,
                choices: ["apple", "bananaIsRight", "orange"],
            }, {
                question: "Yo Mama?",
                answer: 0,
                choices: ["apple", "bananaIsRight", "orange"],
            }],

        //Empty Main Content Div and Grab/Append Questions in HTML

        printQuizToScreen: function () {
            console.log("PrintQtoScreen");
            console.log(this.questionNumber);
            //If this.questionnumber=questions.length - game end
            // else timer enabled


            //Empty Current Div Contents
            var gameContainerTarget = $("#game-container");
            gameContainerTarget.empty();

            //Get object Target

            //Retrieve question from object
            var currentQuestion = $("<h3>").text(this.questionLibrary[this.questionNumber].question).addClass("text-center");

            //Append Game Question to HTML
            gameContainerTarget.append(currentQuestion);

            //Append Answer Choices
            for (var i = 0; i < this.questionLibrary[this.questionNumber].choices.length; i++) {
                var newDiv = $("<h3>");
                newDiv.text(this.questionLibrary[this.questionNumber].choices[i])
                //Use Data Class to hold choices index value for comparing to the answer
                newDiv.addClass("text-center game-choice").attr("data-name", i);
                gameContainerTarget.append(newDiv);
            }


            $(".game-choice").on("click", function () {
                console.log("Choice clicked");
                var playerChoice = $(this).attr("data-name");
                triviaGame.checkAnswer(playerChoice);
            });

          
        },

        //Check If the Selection Is correct and print to screen 
        checkAnswer: function(param) {
            console.log("Checking Answer");
            if (param==this.questionLibrary[this.questionNumber].answer) {
                console.log("You got it!");
            } else {
                console.log("NOPE");
                
            }

            //triviaGame.questionNumber++;

        },



    }


    //Game Start Button
    $("#start-game").on("click", function () {
        console.log("Game Started");
        triviaGame.gameStart = true;
        console.log(triviaGame.gameStart);
        triviaGame.printQuizToScreen();
    });





});
