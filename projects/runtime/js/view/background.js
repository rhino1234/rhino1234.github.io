var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];
        var building1;
        var building2;
        var building3;
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'#545353');//creates a variable called backgroundFill and stores a rectangle that acts as our background
            background.addChild(backgroundFill);// adds the background to the canvas so wecan see it
            
            // TODO: 3 - Add a moon and starfield

            for (var i = 0; i <= 100; i++){
                var circle = draw.circle(2,'white','LightGray',2); //creates a variable called circle that holds each circle
                circle.x = canvasWidth*Math.random();//muitiples canvasWidth a random decimal between .1 and .99 
                circle.y = groundY*Math.random();
                background.addChild(circle);

            }

            var moon = draw.bitmap('img/background/moon.png');
            moon.x = canvasWidth - 600; //holds the x value of the moon
            moon.y = groundY - 400; //holds the y value 
            moon.scaleX = 0.5;//changes the x scale of the moon
            moon.scaleY = 0.5;//changes the y scale of the moon
            background.addChild(moon); //adds the moon to the background
            

            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            // everytime this loop runs, it creates a building with an x and y value and pushes it to the building array to be store in an idex and keeps going.
           

            building3 = draw.bitmap('img/background/building-3.png');
            building3.x = canvasWidth - 1000;
            building3.y = groundY-386;
            building3.scaleX = 1.0 //to change size
            building3.scaleY = 1.0 //to change size
            background.addChild(building3);


            building1 = draw.bitmap('img/background/building-1.png');
            building1.x = canvasWidth - 100;
            building1.y = groundY-185;
            building1.scaleX = 1.5 //to change size
            building1.scaleY = 1.5//to change size
            background.addChild(building1);


            building2 = draw.bitmap('img/background/building-2.png');
            building2.x = canvasWidth - 1000;
            building2.y = groundY-285;
            building2.scaleX = 1.5 //to change size
            building2.scaleY = 1.5 //to change size
            background.addChild(building2);

            
           

            










        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            


            building1.x = building1.x - 1; // takes the current value of tree.x and subtracts 1 pixel 60/second to move the tree to the left
            //if the tree's x value is less than -100 pixels then reassign canvasWidth to the tree's x position
            if(building1.x < -500) {
                building1.x = canvasWidth;
            }

            building2.x = building2.x - 2; // takes the current value of tree.x and subtracts 1 pixel 60/second to move the tree to the left
            //if the tree's x value is less than -100 pixels then reassign canvasWidth to the tree's x position
            if(building2.x < -900) {
                building2.x = canvasWidth;
            }

            
            building3.x = building3.x - 0.9; // takes the current value of tree.x and subtracts 1 pixel 60/second to move the tree to the left
            //if the tree's x value is less than -100 pixels then reassign canvasWidth to the tree's x position
            if(building3.x < -900) {
                building3.x = canvasWidth;
            }
            


        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
