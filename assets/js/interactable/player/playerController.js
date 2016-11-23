function keyStrokeSetup(){

    //Capture the keyboard arrow keys
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40),
      space = keyboard(32);
      ctrl = keyboard(17);

  //Left arrow key `press` method
  left.press = function() {
    if(player.canControl){
      //Change the cat's velocity when the key is pressed
      player.vx = -5;
      if(player.scale.x > 0){
        player.scale.x = -0.17578125;
      }
      player.currentAnimation = walk;
      walkingsfx.mute(false);
    }
  };

  //Left arrow key `release` method
  left.release = function() {
    
    if(player.canControl){
      //If the left arrow has been released, and the right arrow isn't down,
      //Stop the cat
      if (!right.isDown ) {
        player.vx = 0;
        player.currentAnimation = idle;
      walkingsfx.mute(true);
      }
    }
  };

  //Right
  right.press = function() {
    if(player.canControl){
      player.vx = 5;
      if(player.scale.x < 0){
        player.scale.x = 0.17578125;
      }
      player.currentAnimation = walk;
      walkingsfx.mute(false);
    }
  };
  right.release = function() {
    if(player.canControl){
      if (!left.isDown) {
        player.vx = 0;
        player.currentAnimation = idle;
      walkingsfx.mute(true);
      }
    }
  };

  //Jump
  space.press = function(){
    if(player.canControl && !player.isClimbing){

      jumpsfx.play();
        player.jumped = true;
        player.vy = -5;
        player.currentAnimation = jump;

        setTimeout(function(){
          player.jumped = false;
          player.vy = 5;
        }, 200);

        console.log("jumped");
      
    }
  };

    //Ctrl
  ctrl.press = function() {
    console.log('Pressed Activate');
    player.isPressingActive = true;
  };

  ctrl.release = function(){
    player.isPressingActive = false;
  }

  //up
up.press = function(){
  if(player.isClimbing){
    player.vy = -1;
  }
}
}

