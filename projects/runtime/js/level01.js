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
                { "type": "finish", "x": 4400, "y": groundY - 300},
                { "type": "sawblade", "x": 800, "y": groundY - 20},
                { "type": "sawblade", "x": 1100, "y": groundY - 20},
                { "type": "sawblade", "x": 1400, "y": groundY - 20},
                { "type": "sawblade", "x": 300, "y": groundY - 20},
                { "type": "enemy1", "x": 400, "y": groundY - 330},
                { "type": "enemy1", "x": 800, "y": groundY - 330},
                { "type": "enemy1", "x": 1200, "y": groundY - 330},
                { "type": "enemy1", "x": 1600, "y": groundY - 330},
                { "type": "reward1", "x": 400, "y": groundY - 250},
                { "type": "reward2","x": 1000, "y": groundY - 250},
                //end of level 1 at 1600
                { "type": "sawblade", "x": 2100, "y": groundY - 20},
                { "type": "sawblade", "x": 2300, "y": groundY - 20},
                { "type": "sawblade", "x": 2500, "y": groundY - 20},
                { "type": "sawblade", "x": 2700, "y": groundY - 20},
                { "type": "reward3", "x": 2000, "y": groundY - 250},
                { "type": "enemy2", "x": 1700, "y": groundY - 300},
                { "type": "enemy2", "x": 2000, "y": groundY - 300},
                { "type": "enemy2", "x": 2300, "y": groundY - 300},
                { "type": "enemy2", "x": 2600, "y": groundY - 300},
                //end of level 2 at 2600
                { "type": "sawblade", "x": 3000, "y": groundY - 20},
                { "type": "sawblade", "x": 3500, "y": groundY - 20},
                { "type": "sawblade", "x": 3400, "y": groundY - 20},
                { "type": "sawblade", "x": 3800, "y": groundY - 20},
                { "type": "sawblade", "x": 4100, "y": groundY - 20},
                { "type": "enemy3", "x": 3000, "y": groundY - 345},
                { "type": "enemy3", "x": 3200, "y": groundY - 345},
                { "type": "enemy3", "x": 3500, "y": groundY - 345},
                { "type": "enemy3", "x": 3800, "y": groundY - 345},
                { "type": "enemy3", "x": 4200, "y": groundY - 345},
                { "type": "reward4", "x": 3800, "y": groundY - 250},

                { "type": "sawblade", "x": 7000, "y": groundY - 20},
                { "type": "sawblade", "x": 7200, "y": groundY - 20},
                { "type": "sawblade", "x": 7300, "y": groundY - 20},
                { "type": "sawblade", "x": 7400, "y": groundY - 20},
                { "type": "sawblade", "x": 7500, "y": groundY - 20},
                { "type": "sawblade", "x": 7600, "y": groundY - 20},
                { "type": "sawblade", "x": 7700, "y": groundY - 20},

                











                



                //{ "type": "reward1", "x": 400, "y": groundY - 220},
                //{ "type": "enemy2", "x": 400, "y": groundY - 300},
                //{ "type": "enemy3", "x": 400, "y": groundY - 345},

               
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x, y){
            var hitZoneSize = 25; //creates the size of the hitzone
            var damageFromObstacle = 20; //setting how much damage the object will inflict
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //
            sawBladeHitZone.x = x; // the x of the hit zone
            sawBladeHitZone.y = y; // the y of the hit zone
            game.addGameItem(sawBladeHitZone);  //adds the hitzone to the game
            var obstacleImage = draw.bitmap('img/obstacles/sawblade.png'); //draws in the image 
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
                game.changeIntegrity(-10) //decreases your health
                console.log('The enemy has hit Halle');
                enemy.shrink();
            };
    
            //this function detects if the projectile collides with Halle and it will increase the score and shrink the enemy
             enemy.onProjectileCollision = function(){
                game.increaseScore(10);
                enemy.shrink();
            };
        }




    //enemy comments on enemy 3 
        function createEnemy1(x, y){
            var enemy1 = game.createGameItem('enemy',25);//creates the
            var enemy1z = draw.bitmap('img/enemies/robot-1.png');
            enemy1z.x = -400;
            enemy1z.y = -300;
            enemy1.addChild(enemy1z);
            enemy1.x = x;
            enemy1.y = groundY-y;
            enemy1.scaleX = 0.2;
            enemy1.scaleY = 0.2;
            game.addGameItem(enemy1);
            enemy1.velocityX = -1;//move the enemy 1 pixel to the left
            enemy1.onPlayerCollision = function() {
                game.changeIntegrity(-10) //decreases your health
                console.log('The enemy has hit Halle');
                enemy1.shrink();
            };

             //this function detects if the projectile collides with Halle and it will increase the score and shrink the enemy
              enemy1.onProjectileCollision = function(){
                 game.increaseScore(10);
                 enemy1.shrink();
            };
        }


        function createEnemy2(x, y){
            var enemy2 = game.createGameItem('enemy',25);//creates the
            var enemy2z = draw.bitmap('img/enemies/robot-2.png');
            enemy2z.x = -400;
            enemy2z.y = -300;
            enemy2.addChild(enemy2z);
            enemy2.x = x;
            enemy2.y = groundY-y;
            enemy2.scaleX = 0.2;
            enemy2.scaleY = 0.2;
            game.addGameItem(enemy2);
            enemy2.velocityX = -1;//move the enemy 1 pixel to the left
            enemy2.onPlayerCollision = function() {
                game.changeIntegrity(-30) //decreases your health
                console.log('The enemy has hit Halle');
                enemy2.shrink();
            };

             //this function detects if the projectile collides with Halle and it will increase the score and shrink the enemy
              enemy2.onProjectileCollision = function(){
                 game.increaseScore(10);
                 enemy2.shrink();
            }; 
        }


        function createEnemy3(x, y){
            var enemy3 = game.createGameItem('enemy',25);//creates the enemy game item and stores it in a variable
            var enemy3z = draw.bitmap('img/enemies/robot-3.png');//adds that image to the enemy
            enemy3z.x = -300;//changes the width of the enemy
            enemy3z.y = -500;//changes the height of the enemy
            enemy3.addChild(enemy3z);//add the enemy to the game
            enemy3.x = x;//parameter
            enemy3.y = groundY-y;//parameter
            enemy3.scaleX = 0.2;//changes the scale size of the enemy
            enemy3.scaleY = 0.2;//changes the scale size of the enemy
            game.addGameItem(enemy3);
            enemy3.velocityX = -1;//move the enemy 1 pixel to the left
            enemy3.onPlayerCollision = function() {
                game.changeIntegrity(-50) //decreases your health
                console.log('The enemy has hit Halle');//logs the the enemy hit halle
                enemy3.shrink();//shrinks the enemy
            };

             //this function detects if the projectile collides with Halle and it will increase the score and shrink the enemy
              enemy3.onProjectileCollision = function(){
                 game.increaseScore(10);//increases the score
                 enemy3.shrink();//shrinks the enemy
            }; 
        }



        function createRewardCHANGE(x, y){
            var rewardCHANGE = game.createGameItem('reward',25);//creates the
             var blueSquareCHANGEz = draw.bitmap('img/collectables/chip1.png');
             blueSquareCHANGEz.x = -150;
             blueSquareCHANGEz.y = -115;
             rewardCHANGE.addChild(blueSquareCHANGEz);
             rewardCHANGE.x = x;
             rewardCHANGE.y = groundY-y;
             rewardCHANGE.scaleX = 0.2;
             rewardCHANGE.scaleY = 0.2;
             game.addGameItem(rewardCHANGE);
             rewardCHANGE.velocityX = -1;//move the reward 1 pixel to the left
             rewardCHANGE.rotationalVelocity = 10;// rotate the reward  
             rewardCHANGE.onPlayerCollision = function() {
                 console.log('The reward has hit Halle');
                 game.changeIntegrity(10);
                 game.increaseScore(10);
 
             };
     
             //this function detects if the projectile collides with Halle and it will increase the score and shrink the reward
              rewardCHANGE.onProjectileCollision = function(){
                 game.increaseScore(10);
                 rewardCHANGE.shrink();
             };
        }


        var collectedRewards = 0;//keeps count of rewards collected
        function createReward1(x, y, image){
            var reward1 = game.createGameItem('reward',25);//creates the reward game item
             var blueSquare1z = draw.bitmap('img/collectables/' + image);//draws the reward image
             blueSquare1z.x = -150;//changes the width of the image
             blueSquare1z.y = -115;//changes the height of the image
             reward1.addChild(blueSquare1z);//add the image to the screen
             reward1.x = x;//parameter
             reward1.y = groundY-y;//parameter
             reward1.scaleX = 0.2;//changes the scale x
             reward1.scaleY = 0.2;//changes the scale y
             game.addGameItem(reward1);
             reward1.velocityX = -1;//move the reward 1 pixel to the left
             
             reward1.onPlayerCollision = function() {
                 console.log('The reward has hit Halle');
                 collectedRewards + 1;//counts the rewards collected
                 game.changeIntegrity(10);//changes the integrity
                 game.increaseScore(10);//increaes the score
                 reward1.shrink();//shrinks the reward when collected
             };
     
            
    
        }

        function createRewardFinish(x, y){
            var rewardfinish = game.createGameItem('reward',25);//creates the
             var blueSquarefinishz = draw.bitmap('img/collectables/finish.png');
             blueSquarefinishz.x = -150;
             blueSquarefinishz.y = -115;
             rewardfinish.addChild(blueSquarefinishz);
             rewardfinish.x = x;
             rewardfinish.y = groundY-y;
             rewardfinish.scaleX = 0.2;
             rewardfinish.scaleY = 0.2;
             game.addGameItem(rewardfinish);
             rewardfinish.velocityX = -1;//move the reward 1 pixel to the left
  
             rewardfinish.onPlayerCollision = function() {
                 console.log('The reward has hit Halle');
                 game.changeIntegrity(10);
                 game.increaseScore(10);
                 rewardfinish.shrink();
                 if (collectedRewards = 4){
                     alert("You Did it! Mission complete!")
                 }
 
             };
     
             //this function detects if the projectile collides with Halle and it will increase the score and shrink the reward
            
        }


        






















        
        
        
        for (var i = 0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i];

            if(gameItem.type === "sawblade"){ //adds the item to the game
                createSawBlade(gameItem.x, gameItem.y) // runs the function for said item
            }
            if(gameItem.type === "drone"){
                createDrone(gameItem.x, gameItem.y)
            }
            if(gameItem.type === "enemy"){
                createEnemy(gameItem.x, gameItem.y)
            }
            if(gameItem.type === "reward"){
                createReward(gameItem.x, gameItem.y, 'chip-1.png')
            }
            if(gameItem.type === "enemy1"){
                createEnemy1(gameItem.x, gameItem.y)
            }
            if(gameItem.type === "enemy2"){
                createEnemy2(gameItem.x, gameItem.y)
            }
            if(gameItem.type === "enemy3"){
                createEnemy3(gameItem.x, gameItem.y)
            }
            if(gameItem.type === "reward1"){
                createReward1(gameItem.x, gameItem.y, 'chip-1.png')
            }
            if(gameItem.type === "reward2"){
                createReward1(gameItem.x, gameItem.y, 'chip-2.png')
            }
            if(gameItem.type === "reward3"){
                createReward1(gameItem.x, gameItem.y, 'chip-3.png')
            }
            if(gameItem.type === "reward4"){
                createReward1(gameItem.x, gameItem.y, 'chip-4.png')
            }

            if(gameItem.type === "finish"){
                createRewardFinish(gameItem.x, gameItem.y)
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
