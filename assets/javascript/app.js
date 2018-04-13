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
        timerId: "",
        timerEnabled: false,
        timerStatus: 10,

        correctAnswers: 0,
        incorrectAnswers: 0,

        winningImage: "",
        losingImage: "",

        //Location for Trivia Game Container- Set Equal to a Jquery object
        gameContainerTarget: "",
        gameTimerTarget: "",

        //Tracks which question the game is on
        questionNumber: 0,
        questionLibrary:
            [{
                question: "Fav Fruit?",
                answer: 2,
                choices: ["apple", "bananaIsRight", "orange"],
                image: "",
            }, {
                question: "Yo Mama?",
                answer: 0,
                choices: ["apple", "bananaIsRight", "orange"],
                image: "",
            }, {
                question: "Yo Mama?",
                answer: 0,
                choices: ["apple", "bananaIsRight", "orange"],
                image: "",
            }],

        preGame: function () {
            if (!triviaGame.gameStart) {
                //Set Jquery Targets
                triviaGame.gameContainerTarget = $("#game-container");
                triviaGame.gameTimerTarget = $("#game-timer");
                console.log("typeof", typeof this.gameContainerTarget);
                triviaGame.gameStart = true;

                //Start Game
                triviaGame.printQuizToScreen();
            }
        },

        //Empty Main Content Div and Grab/Append Questions in HTML

        printQuizToScreen: function () {

            console.log("PrintQtoScreen");


            //TIMER- RESET TIMER, SET TIME, START TIMER
            this.gameTimerStop();
            this.timerStatus = 10;
            this.gameTimerStart();

            //Empty Current Div Contents
            this.gameContainerTarget.empty();

            //Get object Target

            //Retrieve question from object
            var currentQuestion = $("<h3>").text(this.questionLibrary[this.questionNumber].question).addClass("text-center");

            //Append Game Question to HTML
            this.gameContainerTarget.append(currentQuestion);

            //Append Answer Choices
            for (var i = 0; i < this.questionLibrary[this.questionNumber].choices.length; i++) {
                var newDiv = $("<h3>");
                newDiv.text(this.questionLibrary[this.questionNumber].choices[i])
                //Use Data Class to hold choices index value for comparing to the answer
                newDiv.addClass("text-center game-choice").attr("data-name", i);
                this.gameContainerTarget.append(newDiv);
            }


            $(".game-choice").on("click", function () {
                console.log("Choice clicked");
                var playerChoice = $(this).attr("data-name");
                triviaGame.checkAnswer(playerChoice);
            });


        },

        //Check If the Selection Is correct and print to screen 
        checkAnswer: function (param) {

            this.gameContainerTarget.empty();
            var winLoseElement = $("<h2>");
            console.log("Checking Answer");
            
            //Correct Answer
            if (param == this.questionLibrary[this.questionNumber].answer) {
                this.correctAnswers++;
                console.log("You got it!");
                var winLoseElement = $("<h2>");
                winLoseElement.text("YOU ARE. THE BEST.").addClass("text-center");
                this.gameContainerTarget.append(winLoseElement);

                //Incorrect Answer
            } else {
                this.incorrectAnswers++;
                console.log("YOU SUCK");
                var winLoseElement = $("<h2>");
                winLoseElement.text("NOPE").addClass("text-center");
                this.gameContainerTarget.append(winLoseElement);
            }

            //Add an image from the object here
            var imageElement = $("<img>");
            imageElement.attr("src", this.questionLibrary[this.questionNumber].image).addClass("img responsive img-responsive");

            this.questionNumber++;
            console.log(this.questionNumber);

            //Print the next question if there are any questions left, otherwise print the gameend screen
            var _this = this;
            if (this.questionNumber === this.questionLibrary.length) {
                setTimeout(_this.gameEnd(), 5000);
                //console.log("TEST1: ",this.questionNumber,"TEST2",this.questionLibrary.length);
            } else {
                setTimeout(_this.printQuizToScreen(), 4000);
            }
        },

        //Game End runs after the question list runs out
        gameEnd: function () {
            triviaGame.gameTimerStop();
            var imageElement = $("<img>");
            var h2 = $("<h2>");
            var newGame = $("<p>");


            if (this.correctAnswers == this.questionLibrary.length) {
                console.log("YOU WIN THE GAME");
                imageElement.attr("src", this.winningImage);
                h2.text("YOU WIN").addClass("text-center");
            } else {
                console.log("YOU LOSE THE GAME");
                imageElement.attr("src", this.losingImage);
                h2.text("YOU LOSE THE GAME").addClass("text-center");
            }

            //Append Game Win / Lose Image
            this.gameContainerTarget.empty();

            this.gameContainerTarget.append(imageElement, h2);

            //Append Final Player Scores
            h2.text("Correct Answers: " + this.correctAnswers + " " + " Incorrect Answers: " + this.incorrectAnswers);
            this.gameContainerTarget.append(h2);

            //Create and Append Restart Game? Button
            newGame.text("Start Over?");
            newGame.addClass("text-center mt-3 pb-3 restart-game");
            this.gameContainerTarget.append(newGame);

            $(".restart-game").on("click", function () {
                console.log("Game-Restarted!");
                triviaGame.gameRestart();
            });

        },

        //This object method resets all altered values- scores, and questionNumber- to zero (except gameStarted boolean!) and shoots us back into question 1.

        gameRestart: function () {
            this.correctAnswers = 0;
            this.incorrectAnswers = 0;
            this.questionNumber = 0;
            this.printQuizToScreen();

        },

        decrement: function () {
            triviaGame.timerStatus--;

            console.log("Current time: ", triviaGame.timerStatus);

            triviaGame.gameTimerTarget.text(triviaGame.timerStatus);

            if (triviaGame.timerStatus === 0) {

                triviaGame.gameTimerStop();
                triviaGame.checkAnswer(100);
            }
        },


        gameTimerStop: function () {
            console.log("Timer Stopped");
            clearInterval(triviaGame.timerId);
        },

        //Timer element to be displayed at the top of each question
        gameTimerStart: function () {
            this.timerId = setInterval(this.decrement, 1000);
        },



    }



    //Game Start Button Listener Is the only code outside the object- it listens for the original Start Game HTML element to be clicked
    $("#start-game").on("click", function () {
        console.log("Game Started");
        triviaGame.preGame();
    });




});
