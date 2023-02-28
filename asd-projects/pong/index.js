/* global $, sessionStorage */

$(document).ready(runGame); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()



function runGame(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  //key object that ssigns the key numbers
  var KEY = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    W: 87, 
    S: 83,
    A: 65,
    D: 68,
  }

  var BOARD_HEIGHT = $('#board').height();
  var BOARD_WIDTH = $('#board').width();
  var paddleSpeed = 7;
  var pointsRight = 0;
  var pointsLeft = 0;
  var winner = 0; 
  var endingScore = 2;
  // Game Item Objects
function GameItem(x, y, speedX, speedY, color, id, text){
  var item = {
    x: x,
    y: y, 
    speedX: speedX,
    speedY: speedY,
    h: $(id).height(),
    w: $(id).width(),
    color: $(id).css('background-color', color),
    id: id,
    text: $(id).text(text)
  }
  return item;
}
var pointsRight = 0;
var message = GameItem(BOARD_WIDTH/2,BOARD_HEIGHT/2,0,0,'gold','#message', winner + ' wins!')
var paddleLeft = GameItem(10, 200, 0, 0,0, '#paddleLeft');
var paddleRight = GameItem(BOARD_WIDTH - 10 - $('#paddleRight').width(), 200, 0, 0,0, '#paddleRight')
var ball = GameItem(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3 : 3 ), (Math.random() > 0.5 ? -3 : 3 ),0, '#ball');
var ball2 = GameItem(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3 : 3 ), (Math.random() > 0.5 ? -3 : 3 ),0, '#ball');
var ball3 = GameItem(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3 : 3 ), (Math.random() > 0.5 ? -3 : 3 ),0, '#ball');
var scoreRight = jQuery('#scoreRight');
var scoreLeft = jQuery('#scoreLeft');




  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    $('#block').hide();
    updateItem(ball);
    updateItem(ball2);
    updateItem(ball3);
    updateItem(paddleRight);
    updateItem(paddleLeft);

    moveBall();
    walls();
    paddleBorder(); 
    ifHit();
    drawItem(message);
    drawItem(paddleLeft);
    drawItem(paddleRight);
    drawItem(ball);
    point();
    changeScore(pointsRight, scoreRight);
    changeScore(pointsLeft, scoreLeft);
    whoWins();
   
    
  }
  $('#message').hide();
  $('.reset').hide();
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.keyCode === KEY.UP){
        paddleRight.speedY = -paddleSpeed;
       
    }
    if (event.keyCode === KEY.DOWN){
        paddleRight.speedY = paddleSpeed;
       
    }
    if (event.keyCode === KEY.W){
      paddleLeft.speedY = -paddleSpeed;
     
  }
    if (event.keyCode === KEY.S){
        paddleLeft.speedY = paddleSpeed;
      
    }
  }

  function handleKeyUp(event) {
    if (event.keyCode === KEY.UP){
        paddleRight.speedY = 0;
    }
    if (event.keyCode === KEY.DOWN){
        paddleRight.speedY = 0;
    }
    if (event.keyCode === KEY.W){
      paddleLeft.speedY = 0;
  }
    if (event.keyCode === KEY.S){
        paddleLeft.speedY = 0;
    }
}

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
 function drawItem(obj){
  $(obj.id).css("top", obj.y); //draw an object in the new location on the y awis
  $(obj.id).css("left", obj.x); //same but for x
 }

 function updateItem(obj){
    obj.x = obj.x + obj.speedX;
    obj.y = obj.y + obj.speedY;
 }
function moveBall(){
    ball.x = ball.x + ball.speedX;
    ball.y = ball.y + ball.speedY;
}
function walls(){
  if(ball.y>BOARD_HEIGHT) {
    ball.speedY = -ball.speedY;
  }
  if (ball.y < 0) {
    ball.speedY = -ball.speedY;
  }
}
function point(){
  if (ball.x > BOARD_WIDTH) {
    resetBall();
    pointsLeft = pointsLeft + 1;
  }
  if (ball.x < 0) {
    resetBall();
    pointsRight = pointsRight + 1;
}
}
function whoWins(){
  if(pointsRight === endingScore){
    endGame();
  }else if(pointsLeft === endingScore){
    endGame();
  }
}
function doCollide(obj1, obj2) {
  // TODO: calculate and store the remaining
  // sides of the square1
  obj1.leftX = obj1.x;
  obj1.topY = obj1.y;
  obj1.rightX = obj1.leftX + $(obj1.id).width();
  obj1.bottomY = obj1.topY + $(obj1.id).height();
  
  // TODO: Do the same for square2
  obj2.leftX = obj2.x;
  obj2.topY = obj2.y;
  obj2.rightX = obj2.leftX + $(obj2.id).width();
  obj2.bottomY = obj2.topY + $(obj2.id).height();

  // TODO: Return true if they are overlapping, false otherwise
if ((obj1.rightX > obj2.leftX) && 
      (obj1.leftX < obj2.rightX) &&
      (obj1.bottomY > obj2.topY) &&
      (obj1.topY < obj2.bottomY)){
    return true;
  } else {
    return false;
  }
  
}
function ifHit(){
  if(doCollide(ball, paddleRight)){
    ball.speedX = -ball.speedX;
    ball.speedX = ball.speedX * 1.1;
    ball.speedY = ball.speedY * 1.1;
  }
  if(doCollide(ball, paddleLeft)){
    ball.speedX = -ball.speedX;
    ball.speedX = ball.speedX * 1.1;
    ball.speedY = ball.speedY * 1.1;
  }
}
function changeScore(newText, player) {
  player.text(newText);
}
  //function that checks the bottom and top walls for ball
  //function checkWalls(){
  //  if(ball.y < 0)
  //}
  //function that checks the boundaries for the paddles
  function paddleBorder(){
    if (paddleRight.y < 0 || paddleRight.y + $(paddleRight.id).height() > BOARD_HEIGHT){
      paddleRight.y -= paddleRight.speedY;
    }
    if (paddleLeft.y < 0 || paddleLeft.y + $(paddleLeft.id).height() > BOARD_HEIGHT){
      paddleLeft.y -= paddleLeft.speedY;
    }
  }
  function resetBall(){
    ball.x = BOARD_WIDTH /2;
    ball.y = BOARD_HEIGHT/2;
    ball.speedX = (Math.random() > 0.5 ? -3 : 3 );
    ball.speedY = (Math.random() > 0.5 ? -3 : 3 );
  }
  //function that will handle what happens when a player scores
  //function that will display the score
  //function that will handle winner instance
  //function that will display play agian button when game is won
  //do collide to determine if two objects have collided
  //function that changes ball speed when it hits the paddle(change direction and speed)


  function endGame() {
    // stop the interval timer
    //clearInterval(interval);
    $('.reset').show();
    $('#message').show();
    $('#paddleRight').hide();
    $('#paddleLeft').hide();
    $('#ball').hide();
    $('#scoreRight').hide();
    $('#scoreLeft').hide();
    
    // turn off event handlers
    //$(document).off();
  }
  $( ".reset" ).click(function() {
   // $(document).on();
   console.log("hi");
    pointsLeft = 0;
    pointsRight = 0;
    ball.speedX = (Math.random() > 0.5 ? -3 : 3 );
    ball.speedY = (Math.random() > 0.5 ? -3 : 3 );
    $('#scoreRight').show();
    $('#scoreLeft').show();
    $(".reset").hide();
    $('#message').hide();
    $('#paddleRight').show();
    $('#paddleLeft').show();
    $('#ball').show();
    resetBall();
  });
}

