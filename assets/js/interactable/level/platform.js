  function platformSetup() {

      let levelPlatforms = [
          {
              y : 690,
              x : 720,
              height: 100,
              width : 1280,
              visible: false
          },
          {
              y : 655,
              x : 1160,
              width: 100,
              height: 30,
              visible: true
          },
          {
              y : 605,
              x : 1103,
              width: 60,
              height: 10,
              visible: true
          },
          {
              y : 545,
              x : 1200,
              width: 190,
              height: 10,
              visible: true
          },
          {
              y : 460,
              x : 720,
              width: 1280,
              height: 30,
              visible: true
          },
          {
              y : 655,
              x : 1550,
              width: 100,
              height: 30,
              visible: true
          },
          {
              y : 605,
              x : 1477,
              width: 60,
              height: 10,
              visible: true
          },
          {
              y : 545,
              x : 1575,
              width: 250,
              height: 10,
              visible: true
          },
          {
              y : 235,
              x : 1085,
              width: 190,
              height: 10,
              visible: true
          },
          {
              y : 235,
              x : 805,
              width: 190,
              height: 10,
              visible: true
          },
          {
              y : 200,
              x : 1320,
              width: 620,
              height: 10,
              visible: true
          }
          ];

          let levelWalls = [
          {
              y : 500,
              x : 1090,
              width: 10,
              height: 110,
              visible: true
          },
          {
              y : 500,
              x : 1460,
              width: 10,
              height: 110,
              visible: true
          },
          {
              y : 500,
              x : 1940,
              width: 10,
              height: 160,
              visible: true
          },
          {
              y : 210,
              x : 1940,
              width: 10,
              height: 200,
              visible: true
          },
          {
              y : 221,
              x : 1315,
              width: 10,
              height: 250,
              visible: true
          },
          {
              y : 100,
              x : 715,
              width: 10,
              height: 720,
              visible: true
          },
          {
              y : 100,
              x : 1995,
              width: 10,
              height: 720,
              visible: true
          },
          {
              y : 145,
              x : 715,
              width: 1920,
              height: 10,
              visible: true
          }
          ]

          levelPlatforms.forEach(function(p){
              platforms.push(createPlatform(p));
          });

          levelWalls.forEach(function(w){
              walls.push(createPlatform(w));
          });
      
      function createPlatform(data){
          let plat = new Sprite(resources["assets/sprites/world/test/platform.jpg"].texture);
          plat.y = data.y;
          plat.x = data.x;
          plat.width = data.width;
          plat.height = data.height;
          plat.zOrder = data.zOrder;
          plat.visible = false;
          stage.addChild(plat);
          return plat;
      }
      
      return true;
}
