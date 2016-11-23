//var enemy = [];

let enemy = {

    //Properties
    transform: {
        x: 0,
        y: 0,
        zOrder: 0,
        xv: 0,
        yv: 0
    },
    sprite: new Sprite(idle.id["enemyIdle_"+idle.frameIndex]),
    canMove: true,
    isAware: false,
    bounds: {
            topLeft: 0,
            topRight: 0,
            bottomLeft: 0,
            bottomRight: 0
        },

    State: function(state){
        state(this);
    }
}


//States
function IdleEnter (obj){
    return function(){
        obj.bounds.topLeft = 5;
    };

}

function setupEnemies(){
    
    //Jake
    var Jake = Object.create(enemy);
    Jake.State(IdleEnter(Jake));
    console.log(Jake);
    //Mark
    var Mark = Object.create(enemy);
    Mark.State(IdleEnter(Mark));
    console.log(Mark);
    
}

//setupEnemies()