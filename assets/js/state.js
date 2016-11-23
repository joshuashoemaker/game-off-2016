//Set the game state
var state = play;

gameLoop();

function gameLoop() {

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Update the current game state:
  state();

  //Render the stage
  renderer.render(stage);
}

function play() {
  if(terminalsHacked === 4){
    window.location="https://joshuashoemaker.github.io/game-off-2016/gameover.html"
  }
  if(!player.alive()){
    setTimeout(function(){
    window.location="https://joshuashoemaker.github.io/game-off-2016/gameover.html"
    }, 1500)
  }
}