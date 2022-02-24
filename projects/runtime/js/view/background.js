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
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'#1FAFC0');//creates a variable called backgroundFill and stores a rectangle that acts as our background
            background.addChild(backgroundFill);// adds the background to the canvas so wecan see it
            
            // TODO: 3 - Add a moon and starfield

            for (var i = 0; i <= 100; i++){
                var circle = draw.circle(2,'white','LightGray',2); //creates a variable called circle that holds each circle
                circle.x = canvasWidth*Math.random();//muitiples canvasWidth a random decimal between .1 and .99 
                circle.y = groundY*Math.random();
                background.addChild(circle);

            }

            var moon = draw.bitmap('img/moon.png');
            moon.x = canvasWidth - 300; //holds the x value of the moon
            moon.y = groundY - 450; //holds the y value 
            moon.scaleX = 0.5;//changes the x scale of the moon
            moon.scaleY = 0.5;//changes the y scale of the moon
            background.addChild(moon); //adds the moon to the background
            

            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            // everytime this loop runs, it creates a building with an x and y value and pushes it to the building array to be store in an idex and keeps going.
            for(var i = 0; i < 5; i++) {
                var buildingHeight = Math.random()*300; //declare a variable called buidingHeight that holds the height of the building in pixels
                var building = draw.rect(75,buildingHeight,'LightGray','Black',1); //declares a variable called building which will hold each building
                building.x = 200*i; //adds 200 pixels to the x value every time it runs
                building.y = groundY-buildingHeight; //sets the building's y posiiton by subtracting the height of thebuilding from goundY
                background.addChild(building); //adds the building to the background so we can see it
                buildings.push(building); //psu the building's data to the buildings array and store it as an index
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png');
            tree.x = canvasWidth - 300;
            tree.y = groundY-235;
            //tree.scaleX = 0.7 to change size
            background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1; // takes the current value of tree.x and subtracts 1 pixel 60/second to move the tree to the left
            //if the tree's x value is less than -100 pixels then reassign canvasWidth to the tree's x position
            if(tree.x < -200) {
                tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
            

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
