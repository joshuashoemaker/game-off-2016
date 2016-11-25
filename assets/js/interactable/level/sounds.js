var jumpsfx = new Howl({
      src: ['assets/sfx/jump.wav']
});

var walkingsfx = new Howl({
      src: ['assets/sfx/walking.wav'],
      loop: true
});
walkingsfx.mute(true);
walkingsfx.play();


var hackingsfx = new Howl({
      src: ['assets/sfx/hacking.wav'],
      loop: true
});
hackingsfx.mute(true);
hackingsfx.play();


var deathsfx = new Howl({
      src: ['assets/sfx/death.wav'],
      volume: 0.4
});