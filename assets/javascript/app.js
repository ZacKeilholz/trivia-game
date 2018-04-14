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

    ////////////////////////////////////
    //Trivia Game Object
    ////////////////////////////////////

    var triviaGame = {

        ////////////////////////////////////
        //Scores/Misc. Game Variables
        ////////////////////////////////////

        //If true, the pregame method won't run when game is reset
        gameStart: false,

        //Timer Vars

        timerId: "",
        timerEnabled: false,
        timerStatus: 15,

        //Score Vars

        correctAnswers: 0,
        incorrectAnswers: 0,

        //Game End Gifs

        winningImage: "assets/images/winGame.gif",
        losingImage: "assets/images/loseGame.gif",

        ////////////////////////////////////
        //STORED JQUERY LOCATIONS
        ////////////////////////////////////

        gameContainerTarget: "",
        gameTimerTarget: "",
        imageContainerTarget: "",

        //////////////////
        //QUESTIONS
        //////////////////

        //Tracks Which is the Current Question
        questionNumber: 0,

        
        questionLibrary:
            [{
                question: "On Which Gaming Console was Pokemon Red/Blue Released?",
                answer: 2,
                choices: ["SNES (in Japan)", "NES", "GAMEBOY", "PSX"],
                image: "assets/images/gameBoy.gif",
            }, {
                question: "Which 3 Pokemon can you choose from at the start of the game?",
                answer: 1,
                choices: ["Pikachu, Rattata, Pidgey", "Squirtle, Bulbasaur, Charmander", "Larry, Moe, Curly", "Jynx, Golem, Goldeen"],
                image: "assets/images/charmander.gif",
            }, {
                question: "Who is the final boss?",
                answer: 0,
                choices: ["Gary", "Team Rocket", "Mew-Two", "Dr. Doom"],
                image: "assets/images/gary.gif",
            }, {
                question: "What does the Poke Flute Do?",
                answer: 2,
                choices: ["Transports you to anywhere on the map", "Allows you to return to the entrance of a dungeon", "Wakes sleeping Pokemon", "Unlocks secret doors"],
                image: "assets/images/sleeping.gif",
            }, {
                question: "What's the name of the main character?",
                answer: 3,
                choices: ["Goku", "Misty", "Torx", "Ash"],
                image: "assets/images/ash.gif",
            }],

        ////////////////////////////////////
        //SETUP FUNCTIONS- RUN ONLY ONCE
        ////////////////////////////////////

        preGame: function () {
            if (!triviaGame.gameStart) {

                //Set Jquery Targets
                $("#game-name").hide();
                triviaGame.gameContainerTarget = $("#game-container");
                this.imageContainerTarget = $("#image-container");
                triviaGame.gameTimerTarget = $("#game-timer");
                triviaGame.gameStart = true;

                //Start Game
                triviaGame.printQuizToScreen();
            }
        },

        ////////////////////////////////////
        //MAIN QUESTION PRINTING METHOD
        ////////////////////////////////////

        printQuizToScreen: function () {

            //Clean Screen
            $("#reset-container").empty();
            this.imageContainerTarget.attr("src", "");


            //TIMER- RESET TIMER, SET TIME, START TIMER
            this.timerStatus = 15;
            this.gameTimerStart();

            //Empty Current Div Contents
            this.gameContainerTarget.empty();

            //Retrieve question from object
            var currentQuestion = $("<h3>").text("Question " + (this.questionNumber + 1) + ": " + this.questionLibrary[this.questionNumber].question).addClass("text-center border-bottom border-white pb-2 mb-3");

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
                triviaGame.gameTimerStop();
                var playerChoice = $(this).attr("data-name");
                triviaGame.checkAnswer(playerChoice);
            });

        },

        ////////////////////////////////////
        //Check If User Answer Is Correct
        ////////////////////////////////////

        checkAnswer: function (param) {

            this.gameContainerTarget.empty();
            var winLoseElement = $("<h2>");
            console.log("Checking Answer");
            var answerNumber = this.questionLibrary[this.questionNumber].answer;

            //Correct Answer Check
            if (param == answerNumber) {
                this.correctAnswers++;
                var winLoseElement = $("<h2>");
                winLoseElement.text("YOU ARE. THE BEST.").addClass("text-center");
                this.gameContainerTarget.append(winLoseElement);

                //Incorrect Answer Check
            } else {
                this.incorrectAnswers++;
                var winLoseElement = $("<h2>");
                winLoseElement.text("NOPE. Correct Answer was: " + this.questionLibrary[this.questionNumber].choices[answerNumber]).addClass("text-center");
                this.gameContainerTarget.append(winLoseElement);
            }

            //Add an image from the object here
            var currentImage = this.questionLibrary[this.questionNumber].image;
            this.imageContainerTarget.attr("src", this.questionLibrary[this.questionNumber].image);
            this.questionNumber++;
            var _this = this;

            //Print the next question if there are any questions left, otherwise print the gameend screen
            if (_this.questionNumber === _this.questionLibrary.length) {
                setTimeout(function () {
                    _this.gameEnd();
                }, 1000*5);
            } else {
                setTimeout(function () {
                    _this.printQuizToScreen();
                }, 1000*5);
            }
        },

        //////////////////
        //Game End Screen
        //////////////////

        //Runs after the question list runs out
        gameEnd: function () {
            this.gameContainerTarget.empty();
            this.imageContainerTarget.attr("src", "");
            triviaGame.gameTimerStop();

            var h2 = $("<h2>");
            var newGame = $("<button>");

            //WIN
            if (this.correctAnswers == this.questionLibrary.length) {
                this.imageContainerTarget.attr("src", this.winningImage);
                this.gameTimerTarget.text("#WINNING");

                //LOSE
            } else {
                this.imageContainerTarget.attr("src", this.losingImage);
                this.gameTimerTarget.text("YOU LOSE THE GAME");
            };

            //Append Final Player Scores
            var winLoseElement = $("<h2>");
            $("#reset-container").append(newGame);
            winLoseElement.text("Correct Answers: " + this.correctAnswers + " " + " Incorrect Answers: " + this.incorrectAnswers).addClass("text-center");


            //Create and Append Restart Game? Button
            newGame.text("Start Over?");
            newGame.addClass("text-center mt-3 rounded-0 btn btn-success mx-auto restart-game");
            this.gameContainerTarget.append(winLoseElement);

            $(".restart-game").on("click", function () {
                console.log("Game-Restarted!");
                triviaGame.gameRestart();
            });

        },

        //////////////////
        //TIMER METHODS
        //////////////////

        decrement: function () {
            triviaGame.timerStatus--;
            triviaGame.gameTimerTarget.text("Time Remaining: " + triviaGame.timerStatus);

            if (triviaGame.timerStatus === 0) {
                triviaGame.gameTimerStop();
                triviaGame.checkAnswer();
            }
        },

        gameTimerStop: function () {
            clearInterval(triviaGame.timerId);
            triviaGame.gameTimerTarget.text("Get Ready!");
        },

        gameTimerStart: function () {
            this.timerId = setInterval(this.decrement, 1000);
        },

        //////////////////
        //GAME RESET METHOD
        //////////////////

        //This object method resets all altered values- scores, and questionNumber- to zero (except gameStarted boolean!) and shoots us back into question 1.

        gameRestart: function () {
            this.correctAnswers = 0;
            this.incorrectAnswers = 0;
            this.questionNumber = 0;
            this.printQuizToScreen();
        },
    }

    //Game Start Button Listener Is the only code outside the object- it listens for the original Start Game HTML element to be clicked
    $("#start-game").on("click", function () {
        console.log("Game Started");
        triviaGame.preGame();
    });


});

