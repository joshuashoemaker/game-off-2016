function ladderSetup(){

ladder = createLadder({
              y : 150,
              x : 1965,
              width: 20,
              height: 550,
              visible: false
});

 function createLadder(data){
          let lad = new Sprite(resources["assets/sprites/world/test/platform.jpg"].texture);
          lad.y = data.y;
          lad.x = data.x;
          lad.width = data.width;
          lad.height = data.height;
          lad.zOrder = data.zOrder;
          lad.visible = data.visible;
          stage.addChild(lad);
          return lad;
      }
      return true;
}