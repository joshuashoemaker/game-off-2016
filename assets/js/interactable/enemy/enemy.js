function enemySetup(){

    //Animation Objects
    var enemyIdle = {
        id: {},
        frameIndex: 1,
        frameLength: 16,
        play: function(){
            return this.id["enemyIdle" + (this.frameIndex = nextAnimationFrame(this))];
        },
        fps: setAnimationFPS(10)
    }

    var enemyWalk = {
        id: {},
        frameIndex: 1,
        frameLength: 21,
        play: function(){
            return this.id["enemyWalk" + (this.frameIndex = nextAnimationFrame(this))];
        },
        fps: setAnimationFPS(30)
    }

    //Loading Sprite Sheets ito animation Onjects
    enemyIdle.id = PIXI.loader.resources["assets/sprites/enemy/enemyIdle.json"].textures;
    enemyWalk.id = PIXI.loader.resources["assets/sprites/enemy/enemyWalk.json"].textures;

    let levelFollowEnemies = [
        {
                x: 1400,
                y: 630,
                height: 80,
                width: 80,
                visible: true,
                startingTexture : enemyIdle.id["enemyIdle1"],
            detectionRange: 150
        },
         {
                x: 1800,
                y: 630,
                height: 80,
                width: 80,
                visible: true,
                startingTexture : enemyIdle.id["enemyIdle1"],
            detectionRange: 150
        }
    ];

    let levelPatrolEnemies = [
        {
            startPosition: {
                x: 1400,
                y: 390
            },
            endPosition: {
                x: 1800,
                y: 390
            },
            height: 80,
            width: 80,
            visible: true,
            startingTexture : enemyIdle.id["enemyIdle1"],
            startDirection : "right"
        },
        {
            startPosition: {
                x: 800,
                y: 390
            },
            endPosition: {
                x: 1250,
                y: 390
            },
            height: 80,
            width: 80,
            visible: true,
            startingTexture : enemyIdle.id["enemyIdle1"],
            startDirection : "right"
        },
        {
            startPosition: {
                x: 1250,
                y: 390
            },
            endPosition: {
                x: 800,
                y: 390
            },
            height: 80,
            width: 80,
            visible: true,
            startingTexture : enemyIdle.id["enemyIdle1"],
            startDirection : "left"
        }
    ]

    levelFollowEnemies.forEach(function(e){
        enemies.push(createFollowEnemy(e))
    });

    levelPatrolEnemies.forEach(function(e){
        enemies.push(createPatrolEnemy(e))
    });


    function createFollowEnemy(data){
        let enemy = new Sprite(data.startingTexture.texture);
        enemy.x = data.x;
        enemy.y = data.y;
        enemy.height = data.height;
        enemy.width = data.width;
        enemy.visible = data.visible;
        enemy.currentAnimation = enemyIdle;
        enemy.anchor.x = 0.5;
        
        enemy.Animate = function(){
            setTimeout(function(){
                enemy.texture = enemy.currentAnimation.play();
                enemy.Animate();
            }, enemy.currentAnimation.fps);
        };

        enemy.Chase = function(){
            setTimeout(function(){
                if(isInRange(getDistance(player || {}, enemy), data.detectionRange) && Math.floor(enemy.x) != Math.floor(player.x) && player.alive()){
                    let moveValue = moveTowards(enemy, player, 1);
                    if((moveValue >  enemy.x) && enemy.scale.x < 0){
                        enemy.scale.x = 0.3125;
                    }
                    if((moveValue <  enemy.x) && enemy.scale.x > 0){
                        enemy.scale.x = -0.3125;
                    }
                    enemy.x = moveValue;
                    enemy.currentAnimation = enemyWalk;
                }
                else{
                    enemy.currentAnimation = enemyIdle;
                }
                enemy.Chase();
            }, fpsTimeout)
        };
        
        enemy.Animate();
        enemy.Chase();

        stage.addChild(enemy);
        return enemy;
    }
    

    function createPatrolEnemy(data){
        let enemy = new Sprite(data.startingTexture.texture);
        enemy.startPosition = data.startPosition;
        enemy.endPosition = data.endPosition;
        enemy.x = enemy.startPosition.x;
        enemy.y = enemy.startPosition.y;
        enemy.height = data.height;
        enemy.width = data.width;
        enemy.visible = data.visible;
        enemy.currentAnimation = enemyWalk;
        enemy.anchor.x = 0.5;
        enemy.toEndPosition = true;
        enemy.startDirection = data.startDirection;

        if(enemy.startDirection === "left"){
            enemy.scale.x = -0.3125;
        }
        
        enemy.Animate = function(){
            setTimeout(function(){
                enemy.texture = enemy.currentAnimation.play();
                enemy.Animate();
            }, 50);
        };

        enemy.Patrol = function(){
            let moveValue;
            if(enemy.toEndPosition){
                if(!getDistance(enemy, enemy.endPosition) < 1){
                    moveValue = moveTowards(enemy, enemy.endPosition, 1);
                    enemy.x = moveValue;
                    if(enemy.startDirection === "right"){
                        enemy.scale.x = 0.3125;
                    }
                    else{
                        enemy.scale.x = -0.3125;
                    }
                }
                else{
                    enemy.toEndPosition = false;
                }
            }
            else{
                if(!getDistance(enemy, enemy.startPosition) < 1){
                    moveValue = moveTowards(enemy, enemy.startPosition, 1);
                    enemy.x = moveValue;
                    if(enemy.startDirection === "right"){
                        enemy.scale.x = -0.3125;
                    }
                    else{
                        enemy.scale.x = 0.3125;
                    }
                }
                else{
                    enemy.toEndPosition = true;
                }
            }

            setTimeout(function(){
                enemy.Patrol()
            }, fpsTimeout)
        };

        enemy.Animate();
        enemy.Patrol();

        stage.addChild(enemy);
        return enemy;
    }

    return true;
}
