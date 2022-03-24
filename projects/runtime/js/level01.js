var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY - 50},
                { "type": "sawblade", "x": 600, "y": groundY - 50},
                { "type": "sawblade", "x": 800, "y": groundY - 50},

                { "type": "enemy", "x": 600, "y": groundY - 423},
                { "type": "enemy", "x": 700, "y": groundY - 423},
                { "type": "enemy", "x": 656, "y": groundY - 423},

                { "type": "reward", "x": 400, "y": groundY - 450},
                { "type": "reward", "x": 700, "y": groundY - 350},
                { "type": "reward", "x": 900, "y": groundY - 423},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x, y){
            var hitZoneSize = 25; //creates the size of the hitzone
            var damageFromObstacle = 10; //setting how much damage the object will inflict
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //
            sawBladeHitZone.x = x; // the x of the hit zone
            sawBladeHitZone.y = y; // the y of the hit zone
            game.addGameItem(sawBladeHitZone);  //adds the hitzone to the game
            var obstacleImage = draw.bitmap('img/sawblade.png'); //draws in the image 
            sawBladeHitZone.addChild(obstacleImage); //adds the image to the hitzone so you can see it.
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            sawBladeHitZone.rotationalVelocity = 5;
        }

       
        function createEnemy(x, y){
           var enemy = game.createGameItem('enemy',25);//creates the
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = groundY-y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;//move the enemy 1 pixel to the left
            enemy.rotationalVelocity = 10;// rotate the enemy  
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-90) //decreases your health
                console.log('The enemy has hit Halle');
                enemy.shrink();
            };
    
            //this function detects if the projectile collides with Halle and it will increase the score and shrink the enemy
             enemy.onProjectileCollision = function(){
                game.increaseScore(10);
                enemy.shrink();
            };
        }
        function createReward(x, y){
           var reward = game.createGameItem('reward',25);//creates the
            var blueSquare = draw.rect(50,50,'blue');
            blueSquare.x = -25;
            blueSquare.y = -25;
            reward.addChild(blueSquare);
            reward.x = x;
            reward.y = groundY-y;
            game.addGameItem(reward);
            reward.velocityX = -1;//move the reward 1 pixel to the left
            reward.rotationalVelocity = 10;// rotate the reward  
            reward.onPlayerCollision = function() {
                console.log('The reward has hit Halle');
                game.changeIntegrity(10);
                game.increaseScore(10);

            };
    
            //this function detects if the projectile collides with Halle and it will increase the score and shrink the reward
             reward.onProjectileCollision = function(){
                game.increaseScore(10);
                reward.shrink();
            };
        }
        
        
        for (var i = 0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i];

            if(gameItem.type === "sawblade"){
                createSawBlade(gameItem.x, gameItem.y)
            }
            if(gameItem.type === "enemy"){
                createEnemy(gameItem.x, gameItem.y)
            }
            if(gameItem.type === "reward"){
                createReward(gameItem.x, gameItem.y)
            }


        }
         
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
