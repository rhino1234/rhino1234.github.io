/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "ENTER": 13,
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
    "W": 87,
    "S": 83,
    "A": 65,
    "D": 68

}
  // Game Item Objects
  var positionX = 0;
  var positionY = 0;
  var speedX = 0;
  var speedY = 0;

  var BpositionX = 0;
  var BpositionY = 0;
  var BspeedX = 0;
  var BspeedY = 0;
  



  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  $(document).on('keydown', handleKeyDown2);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp2);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    repositionGameItemB();
    redrawGameItemB();

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.keyCode === KEY.LEFT){
        speedX -= 5;
    }
    else if (event.keyCode === KEY.RIGHT){
        speedX += 5;
    }
    else if (event.keyCode === KEY.UP){
        speedY -= 5;
    }
    else if (event.keyCode === KEY.DOWN){
        speedY += 5;
    }
}
function handleKeyDown2(event) {
    if (event.keyCode === KEY.A){
        BspeedX -= 5;
    }
    else if (event.keyCode === KEY.D){
        BspeedX += 5;
    }
    else if (event.keyCode === KEY.W){
        BspeedY -= 5;
    }
    else if (event.keyCode === KEY.S){
        BspeedY += 5;
    }
}

function handleKeyUp(event) {
    if (event.keyCode === KEY.LEFT){
        speedX = 0;
    }
    else if (event.keyCode === KEY.RIGHT){
        speedX = 0;
    }
    else if (event.keyCode === KEY.UP){
        speedY = 0;
    }
    else if (event.keyCode === KEY.DOWN){
        speedY = 0;
    }
}
function handleKeyUp2(event) {
    if (event.keyCode === KEY.A){
        BspeedX = 0;
    }
    else if (event.keyCode === KEY.D){
        BspeedX = 0;
    }
    else if (event.keyCode === KEY.W){
        BspeedY = 0;
    }
    else if (event.keyCode === KEY.S){
        BspeedY = 0;
    }
}

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
    positionX += speedX;
    positionY += speedY;

    if (positionX > 391|| positionX < 0){
        positionX -= speedX;
    }
    if (positionY > 391 || positionY < 0){
        positionY -= speedY;
    }
}
function repositionGameItemB(){
    BpositionX += BspeedX;
    BpositionY += BspeedY;

    if (BpositionX > 391|| BpositionX < 0){
        BpositionX -= BspeedX;
    }
    if (BpositionY > 391 || BpositionY < 0){
        BpositionY -= BspeedY;
    }
}

function redrawGameItem(){
    $("#walker").css("left", positionX);
    $("#walker").css("top", positionY);
}
function redrawGameItemB(){
    $("#walker2").css("left", BpositionX);
    $("#walker2").css("top", BpositionY);
}
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}