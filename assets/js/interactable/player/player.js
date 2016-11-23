//This `setup` function will run when the image has loaded
function playerSetup() {


    //------------------Add Sprites to Animations-----------------
    dead.id = PIXI.loader.resources["assets/sprites/octocat/octocatDead.json"].textures;
    idle.id = PIXI.loader.resources["assets/sprites/octocat/octocatIdle.json"].textures;
    walk.id = PIXI.loader.resources["assets/sprites/octocat/octocatWalk.json"].textures;
    hurt.id = PIXI.loader.resources["assets/sprites/octocat/octocatHurt.json"].textures;
    jump.id = PIXI.loader.resources["assets/sprites/octocat/octocatJump.json"].textures;

    //Setup the player
    player = new Sprite(idle.id["catIdle_"+idle.frameIndex]);
    player.canControl = true;
    player.anchor.x = 0.5;
    player.anchor.y = 1;
    player.vx = 0;
    player.vy = 0;
    player.x = 810;
    player.y = 695;
    player.width = 45;
    player.height = 45;
    player.currentAnimation = idle;
    player.health = 1;
    player.jumped = false;
    player.isHurt = false;
    player.isPressingActive = false;
    player.isClimbing = false;

    player.alive = function () {
        if(player.health > 0){
            return true;
        }
        else{
            player.health = 0;
            return false;
        }
    }


    player.isGrounded = function(){

        let collision = b.rectangleCollision(player, platforms[0], false, false, false) || 
                        b.rectangleCollision(player, platforms[1], false, false, false) || 
                        b.rectangleCollision(player, platforms[2], false, false, false) || 
                        b.rectangleCollision(player, platforms[3], false, false, false) || 
                        b.rectangleCollision(player, platforms[4], false, false, false) || 
                        b.rectangleCollision(player, platforms[5], false, false, false) || 
                        b.rectangleCollision(player, platforms[6], false, false, false) || 
                        b.rectangleCollision(player, platforms[7], false, false, false) || 
                        b.rectangleCollision(player, platforms[8], false, false, false) || 
                        b.rectangleCollision(player, platforms[9], false, false, false) || 
                        b.rectangleCollision(player, platforms[10], false, false, false);
        
        if(collision === "bottom"){
            if(player.alive() && !player.isHurt){
                if(player.vx == 0){
                    player.currentAnimation = idle;
                }
                if(player.vx != 0){
                    player.currentAnimation = walk;
                }
            }
            return true;
        }
        else{
            if(!player.isHurt){
                player.currentAnimation = jump;
            }
            return false;
        }
    };
        

    player.direction = function(){
        if(player.scale.x = 1)
            return "right";
        else
            return "left";
}
    
    player.hurt = function(){
        if(!player.isHurt){

            player.isHurt = true;
            player.health--;
            player.canControl = false;
            player.vx = 0;
            
            if(player.alive()){
                player.currentAnimation = hurt;
                setTimeout(function(){
                    player.canControl = true;
                    player.vx = 0;
                    player.currentAnimation = idle;
                    player.isHurt = false;
                }, 500);
            }
            else{
                player.canControl = false;
                player.currentAnimation = dead;
                player.vx = 0;
                deathsfx.play();
                walkingsfx.mute(true);
                hackingsfx.mute(true);
            }
        }
    };

    player.Animate = function(){
        setTimeout(function(){
            player.texture = player.currentAnimation.play();
            player.Animate();
        }, player.currentAnimation.fps);
    }

    player.Update = function () { 

        if(b.hit(player, ladder, false, false)){
            player.isClimbing = true;
            platforms[4].width = 0;
        }
        else{
            player.isClimbing = false;
            platforms[4].width = 1280;
        }

        if(!player.isGrounded() && !player.jumped && !player.isClimbing){
            player.vy = 10;
        }
        else if(player.jumped){
            player.vy = -10;
        }

        if(!player.alive()){
            player.vx = 0;
        }



        player.x += player.vx;
        player.y += player.vy;

            if(b.hit(player, enemies[0], false)){
                if(isInRange(getDistance(player, enemies[0]), 73)){
                    player.hurt();
                }
            }
            if(b.hit(player, enemies[1], false)){
                if(isInRange(getDistance(player, enemies[1]), 73)){
                    player.hurt();
                }
            }

            b.hit(player, walls[0], true, false);
            b.hit(player, walls[1], true, false);
            b.hit(player, walls[2], true, false);
            b.hit(player, walls[3], true, false);
            b.hit(player, walls[4], true, false);
            b.hit(player, walls[5], true, false);
            b.hit(player, walls[6], true, false);
            b.hit(player, walls[7], true, false);
        
        requestAnimationFrame(player.Update);
    };
  
  
    player.Update(); //Repeats every Frame
    player.Animate(); //Stand alone loop for object animations
    keyStrokeSetup(); //Sets up player Controller
    stage.addChild(player);
    return true;
}

    //Create Animations
    var idle = {
        id: {},
        frameIndex: 1,
        frameLength: 22,
        play: function(){
            return this.id["catIdle_" + (this.frameIndex = nextAnimationFrame(this))];
        },
        fps: setAnimationFPS(24)
    }

    var walk = {
        id: {},
        frameIndex: 1,
        frameLength: 21,
        play: function(){
            return this.id["catWalk_" + (this.frameIndex = nextAnimationFrame(this))];
        },
        fps: setAnimationFPS(30)
    }

    var hurt = {
        id: {},
        frameIndex: 1,
        frameLength: 22,
        play: function(){
            return this.id["catHurt_" + (this.frameIndex = nextAnimationFrame(this))];
        },
        fps: setAnimationFPS(30)
    }

    var dead = {
        id: {},
        frameIndex: 1,
        frameLength: 1,
        play: function(){
            return this.id["catDead_1"];
        },
        fps: setAnimationFPS(30)
    }

    var jump = {
        id: {},
        frameIndex: 1,
        frameLength: 20,
        play: function(){
            return this.id["catJump_" + (this.frameIndex = nextAnimationFrame(this))];
        },
        fps: setAnimationFPS(30)
    }

