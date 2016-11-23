//Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    b = new Bump(PIXI);

var stage = new Container(),
    renderer = autoDetectRenderer(1280, 720);

    renderer.autoResize = true;
    renderer.resize(1280, 720);
    
    stage.position.x = 0 - window.innerWidth / 2;

//Global Interactives
var player;
var platforms = [];
var walls = [];
var enemies = [];
let terminals = [];
let terminalsHacked = 0;
var background;
var ladder;


  loader
    .add(["assets/sprites/world/test/platform.jpg",
        "assets/sprites/octocat/octocatIdle.json",
        "assets/sprites/octocat/octocatWalk.json",
        "assets/sprites/octocat/octocatHurt.json",
        "assets/sprites/octocat/octocatDead.json",
        "assets/sprites/octocat/octocatJump.json",
        "assets/sprites/octocat/octocatMelee.json",
        "assets/sprites/enemy/enemyWalk.json",
        "assets/sprites/enemy/enemyIdle.json",
        "assets/sprites/world/levelrender2.png"])
    .load(worldSetup);

function worldSetup(){

    
    background = new Sprite(resources["assets/sprites/world/levelrender2.png"].texture);
    background.x = 720;
    background.y = 0;
    background.width = 1280;
    background.height = 720;
    stage.addChild(background);

    if(platformSetup() && enemySetup() && ladderSetup() && playerSetup() && terminalSetup()){
            console.log("Loaded")
        }
  
}

function setAnimationFPS(fps) {
    return 1000/fps;
}

const fpsTimeout = 1000/60;

document.body.appendChild(renderer.view);
