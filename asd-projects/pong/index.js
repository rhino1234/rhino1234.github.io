/* global $, sessionStorage */

$(document).ready(mainMenu); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
var endingPoint = 0;
var ballsNumber = 1;
var reactBall = 0;
function mainMenu(){
  $('#message').show();
  $('#board').hide();
  $('#settings').hide();
  $( ".mainStart" ).click(function() {
    $('#menu').hide();
    $('#settings').show();
    settings();
      $('.mainStart2').hide();

   });
}
function settings(){
  $( ".back" ).click(function() {
    $('#menu').show();
    $('#settings').hide();
  });
  $( ".points5" ).click(function() {
    endingPoint = 5;
    $('point').text("5");
    $('.points5').css('background-color', "red");
    $('.points6').css('background-color', "blue");
    $('.points7').css('background-color', "blue");
    $('.points8').css('background-color', "blue");
    $('.points9').css('background-color', "blue");
    $('.points10').css('background-color', "blue");
    $('.mainStart2').show();
    $( ".mainStart2" ).click(function() {
      $('#settings').hide();
      $('#board').show();
      runGame();
      settings();
    });
  });
  $( ".points6" ).click(function() {
    endingPoint = 6;
    $('point').text("6");
    $('.points5').css('background-color', "blue");
    $('.points6').css('background-color', "red");
    $('.points7').css('background-color', "blue");
    $('.points8').css('background-color', "blue");
    $('.points9').css('background-color', "blue");
    $('.points10').css('background-color', "blue");
    $('.mainStart2').show();
    $( ".mainStart2" ).click(function() {
      $('#settings').hide();
      $('#board').show();
      runGame();
      settings();
    });
  });
  $( ".points7" ).click(function() {
    endingPoint = 7;
    $('point').text("7");
    $('.points5').css('background-color', "blue");
    $('.points6').css('background-color', "blue");
    $('.points7').css('background-color', "red");
    $('.points8').css('background-color', "blue");
    $('.points9').css('background-color', "blue");
    $('.points10').css('background-color', "blue");
    $('.mainStart2').show();
    $( ".mainStart2" ).click(function() {
      $('#settings').hide();
      $('#board').show();
      runGame();
      settings();
    });
  });
  $( ".points8" ).click(function() {
    endingPoint = 8;
    $('point').text("8");
    $('.points5').css('background-color', "blue");
    $('.points6').css('background-color', "blue");
    $('.points7').css('background-color', "blue");
    $('.points8').css('background-color', "red");
    $('.points9').css('background-color', "blue");
    $('.points10').css('background-color', "blue");
    $('.mainStart2').show();
    $( ".mainStart2" ).click(function() {
      $('#settings').hide();
      $('#board').show();
      runGame();
      settings();
    });
  });
  $( ".points9" ).click(function() {
    endingPoint = 9;
    $('point').text("9");
    $('.points5').css('background-color', "blue");
    $('.points6').css('background-color', "blue");
    $('.points7').css('background-color', "blue");
    $('.points8').css('background-color', "blue");
    $('.points9').css('background-color', "red");
    $('.points10').css('background-color', "blue");
    $('.mainStart2').show();
    $( ".mainStart2" ).click(function() {
      $('#settings').hide();
      $('#board').show();
      runGame();
      settings();
    });
  });
  $( ".points10" ).click(function() {
    endingPoint = 10;
    $('point').text("10");
    $('.points5').css('background-color', "blue");
    $('.points6').css('background-color', "blue");
    $('.points7').css('background-color', "blue");
    $('.points8').css('background-color', "blue");
    $('.points9').css('background-color', "blue");
    $('.points10').css('background-color', "red");
    $('.mainStart2').show();
    $( ".mainStart2" ).click(function() {
      $('#settings').hide();
      $('#board').show();
      runGame();
      settings();
    });
  });
ballsNumber = 1;
  $( ".numberBall1" ).click(function() {
    ballsNumber = 1;
    $('numberBall').text("1");
    $('.numberBall1').css('background-color', "red");
    $('.numberBall2').css('background-color', "blue");
    $('.numberBall3').css('background-color', "blue");
  });
  $( ".numberBall2" ).click(function() {
    ballsNumber = 2;
    $('numberBall').text("2");
    $('.numberBall1').css('background-color', "blue");
    $('.numberBall2').css('background-color', "red");
    $('.numberBall3').css('background-color', "blue");
  });
  $( ".numberBall3" ).click(function() {
    ballsNumber = 3;
    $('numberBall').text("3");
    $('.numberBall1').css('background-color', "blue");
    $('.numberBall2').css('background-color', "blue");
    $('.numberBall3').css('background-color', "red");
  });

  $( ".reactOn" ).click(function() {
    reactBall = true;
    $('reactBall').text("On");
    $('.reactOn').css('background-color', "red");
    $('.reactOff').css('background-color', "blue");
  });
  $( ".reactOff" ).click(function() {
    reactBall = false;
    $('reactBall').text("Off");
    $('.reactOn').css('background-color', "blue");
    $('.reactOff').css('background-color', "red");
  });
}

function changeTheme(player1, player2){
  $('#paddleRight').css('background-color', player1);
  $('#scoreRight').css('background-color', player1);
  $('#paddleLeft').css('background-color', player2);
  $('#scoreLeft').css('background-color', player2);
}
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
  //changeTheme("red","yellow");
  var BOARD_HEIGHT = $('#board').height();
  var BOARD_WIDTH = $('#board').width();
  var paddleSpeed = 7;
  var pointsRight = 0;
  var pointsLeft = 0;
  var endingScore = endingPoint;
  var numberOfBalls = ballsNumber;
  var ballsReact = reactBall;
  // Game Item Objects
function GameItem(x, y, speedX, speedY, color, id){
  var item = {
    x: x,
    y: y, 
    speedX: speedX,
    speedY: speedY,
    h: $(id).height(),
    w: $(id).width(),
    color: $(id).css('background-color', color),
    id: id,
  }
  return item;
}

var pointsRight = 0;
var paddleLeft = GameItem(10, 200, 0, 0,0, '#paddleLeft');
var paddleRight = GameItem(BOARD_WIDTH - 10 - $('#paddleRight').width(), 200, 0, 0,0, '#paddleRight');
var ball = GameItem(400, 200, (Math.random() > 0.5 ? -3 : 3 ), (Math.random() > 0.5 ? -3 : 3 ),0, '#ball');
var ball2 = GameItem(400, 50, (Math.random() > 0.5 ? -3 : 3 ), (Math.random() > 0.5 ? -3 : 3 ),0, '#ball2');
var ball3 = GameItem(400, 325, (Math.random() > 0.5 ? -3 : 3 ), (Math.random() > 0.5 ? -3 : 3 ),0, '#ball3');
var block = GameItem(400, 325, (Math.random() > 0.5 ? -3 : 3 ), (Math.random() > 0.5 ? -3 : 3 ),0, '#block');

var scoreRight = jQuery('#scoreRight');
var scoreLeft = jQuery('#scoreLeft');
var gameEnded = false;

if(numberOfBalls === 1){
  $('#ball').show();
  $('#ball2').hide();
  $('#ball3').hide();
} else if(numberOfBalls === 2){
  $('#ball').show();
  $('#ball2').show();
  $('#ball3').hide();
} else if(numberOfBalls === 3){
  $('#ball').show();
  $('#ball2').show();
  $('#ball3').show();
}

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
    //updateItem(ball2);
    
    updateItem(paddleRight);
    updateItem(paddleLeft);

    moveBall(ball);
    moveBall(ball2);
    moveBall(ball3);
    walls(ball);
    walls(ball2);
    walls(ball3);
    paddleBorder(); 
    ifHit(ball);
    ifHit(ball2);
    ifHit(ball3);
    if (ballsReact === true){
      ballHit();
    }
    //ballHit();

    //hitBlock();
    drawItem(message);
    drawItem(paddleLeft);
    drawItem(paddleRight);
    drawItem(ball);
    drawItem(ball2);
    drawItem(ball3);
    drawItem(block);
    point(ball);
    point(ball2);
    point(ball3);
    changeScore(pointsRight, scoreRight);
    changeScore(pointsLeft, scoreLeft);
    if(gameEnded === false){
      console.log("won");
      whoWins();
    }
    
    
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




function moveBall(ball){
    ball.x = ball.x + ball.speedX;
    ball.y = ball.y + ball.speedY;
}
//function that checks the bottom and top walls for ball
function walls(ball){
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
  if (numberOfBalls === 2){
    if (ball2.x > BOARD_WIDTH) {
      resetBall();
      pointsLeft = pointsLeft + 1;
    }
    if (ball2.x < 0) {
      resetBall();
      pointsRight = pointsRight + 1;
    }
  }
  if (numberOfBalls === 3){
    if (ball2.x > BOARD_WIDTH) {
      resetBall();
      pointsLeft = pointsLeft + 1;
    }
    if (ball2.x < 0) {
      resetBall();
      pointsRight = pointsRight + 1;
    }

    if (ball3.x > BOARD_WIDTH) {
      resetBall();
      pointsLeft = pointsLeft + 1;
    }
    if (ball3.x < 0) {
      resetBall();
      pointsRight = pointsRight + 1;
    }
  }
}





//function that will handle winner instance
function whoWins(){
  if(pointsRight === endingScore){
    $('#message').text("Yellow Wins");
    endGame();
  }else if(pointsLeft === endingScore){
    $('#message').text("Blue Wins");
    endGame();
  }
}

//do collide to determine if two objects have collided
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


 //function that changes ball speed when it hits the paddle(change direction and speed)
function ifHit(ball){
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
function hitBlock(){
  if(doCollide(ball, block)){
    ball.speedX = -ball.speedX;
  }
}
function ballHit(){
  if(numberOfBalls === 2){
    if(doCollide(ball, ball2)){
      ball.speedX = -ball.speedX;
    }
    if(doCollide(ball2, ball)){
      ball2.speedX = -ball2.speedX;
    }
  }
  
  if(numberOfBalls === 3){
    if(doCollide(ball, ball2)){
      ball.speedX = -ball.speedX;
    }
    if(doCollide(ball2, ball)){
      ball2.speedX = -ball2.speedX;
    }
    if(doCollide(ball, ball3)){
      ball.speedX = -ball.speedX;
    }
    if(doCollide(ball2, ball3)){
      ball2.speedX = -ball2.speedX;
    }
    if(doCollide(ball3, ball)){
      ball3.speedX = -ball3.speedX;
    }
    if(doCollide(ball3, ball2)){
      ball3.speedX = -ball3.speedX;
    }
  }
}



//function that will display the score
function changeScore(newText, player) {
  player.text(newText);
}

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
    ball.x = 400;
    ball.y = 200;
    ball.speedX = (Math.random() > 0.5 ? -3 : 3 );
    ball.speedY = (Math.random() > 0.5 ? -3 : 3 );

    ball2.x = 400;
    ball2.y = 50;
    ball2.speedX = (Math.random() > 0.5 ? -3 : 3 );
    ball2.speedY = (Math.random() > 0.5 ? -3 : 3 );

    ball3.x = 400;
    ball3.y = 325;
    ball3.speedX = (Math.random() > 0.5 ? -3 : 3 );
    ball3.speedY = (Math.random() > 0.5 ? -3 : 3 );
  }


  
//BOARD_WIDTH /2;
//BOARD_HEIGHT/2;
  
  
  
 

//function that will display play again button when game is won
  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    gameEnded === true;
    
    $('.reset').show();
    $('#message').show();
    $('#paddleRight').hide();
    $('#paddleLeft').hide();
    $('#ball').hide();
    $('#ball2').hide();
    $('#ball3').hide();

    $('#scoreRight').hide();
    $('#scoreLeft').hide();
    
    // turn off event handlers
    //$(document).off();
  }
  $( ".reset" ).click(function() {
    location.reload();
    endingPoint = 0;
  });
  
}

