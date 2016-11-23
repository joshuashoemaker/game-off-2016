function terminalSetup() {
    
    let levelTerminals = [
        {
            y : 640,
            x : 1365,
            height: 50,
            width : 50,
            alpha: 0
        },
        {
            y : 640,
            x : 1870,
            height: 50,
            width : 50,
            alpha: 0
        },
        {
            y : 400,
            x : 1580,
            height: 50,
            width : 50,
            alpha: 0
        },
        {
            y : 400,
            x : 1005,
            height: 50,
            width : 50,
            alpha: 0
        }
    ];

    levelTerminals.forEach(function(t){
        terminals.push(createTerminal(t));
    });

    function createTerminal(data){
        let term = new Sprite(resources["assets/sprites/world/test/platform.jpg"].texture);
        term.y = data.y;
        term.x = data.x;
        term.height = data.height;
        term.width = data.height;
        term.alpha = data.alpha;
        term.hacked = false;

        term.hackMeter = new Sprite(resources["assets/sprites/world/test/platform.jpg"].texture);
        term.hackMeter.height = 5;
        term.hackMeter.width = 0;
        term.hackMeter.x = data.x;
        term.hackMeter.y = data.y += -10;
        term.hackMeter.tint = 16745055;

        term.hackMeterBack = new Sprite(resources["assets/sprites/world/test/platform.jpg"].texture);        
        term.hackMeterBack.height = 5;
        term.hackMeterBack.width = 50;
        term.hackMeterBack.x = data.x;
        term.hackMeterBack.y = data.y += -0;
        term.hackMeterBack.tint = 0;
        
        

        term.hackedValue = 0;

        term.Hacking = function(){
            if(b.hit(player, term, false)  && player.isPressingActive && !term.hacked){
                hackingsfx.mute(false);
                term.hackedValue++;
                term.hackMeter.width = term.hackedValue / 2;
                if(term.hackedValue > 99){
                    hackingsfx.mute(true);
                    term.hacked = true;
                    term.hackedValue = 100;
                    terminalsHacked++;
                }
            }
            else{
                hackingsfx.mute(true);
            }
            setTimeout(function(){
                term.Hacking();
            }, fpsTimeout * 2)
        }

        term.Hacking();
        stage.addChild(term);
        stage.addChild(term.hackMeterBack);
        stage.addChild(term.hackMeter);
        return term;
    }
    return true;
}