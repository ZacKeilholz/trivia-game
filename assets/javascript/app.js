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

    


    



*/