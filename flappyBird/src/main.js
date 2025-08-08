import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({
 
});

k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("birdD", "sprites/bird-down.png");
k.loadSprite("base", "sprites/base.png");
k.loadSprite("bg", "sprites/bg.png");
k.loadSprite("pipe", "sprites/pipe.png");
k.loadSprite("gameover", "sprites/gameover.png");
k.loadSprite("message", "sprites/message.png");


k.scene("start", () => {
    k.add([
        k.sprite("bg", {width : width() , height : height()}),
        k.pos(0,0),
        k.fixed(),
    ]);
    k.add([
        k.sprite("message"),
        k.pos(width() / 2 - 100 , height() /2 - 200),
        k.fixed(),
    ]);
    k.onClick(() => {
        go("game");
    })
});

go("start");

k.scene("game", () => {
    const pipeGap = 100;
    k.add([
        k.sprite("bg", {width : width() , height : height()}),
        k.pos(0,0),
        k.fixed(),
    ]);
    const offset = rand(-40, 40);

    k.add([
        k.sprite("pipe"),
        k.pos(width() - 100 , height()/2 + offset + pipeGap/2),
        area(),
        "pipe"
    ]);
    k.add([
        k.sprite("pipe", {flipY: true}),
        k.pos(width() - 100 , height()/2 + offset- pipeGap/2),
        k.anchor("botleft"),
        area(),
        "pipe"
    ]);
    k.onUpdate("pipe", (pipe) => {
        pipe.move(-160, 0)

    });
    k.add([
        k.pos(0,620),
        k.sprite("base",{width : width(), height : 120}),
        area(),
        body({
            isStatic : true
        })
    ]);
    const bird = k.add([
        k.pos(k.width() / 2 , k.height() / 2 ),
        k.sprite("birdD"),
        area(),
        body(),
    ]);
    bird.onCollide("pipe", () => {
        go("gameOver");
    });
    
    k.onClick(() => {
        idle = false;
        isIdle(idle);
        bird.jump(100)
    });
});
k.scene("gameOver", () =>{
    k.add([
        k.sprite("bg", {width : width() , height : height()}),
        k.pos(0,0),
        k.fixed(),
    ]);
    k.add([
        k.sprite("gameover"),
        k.pos(width() /2 - 300 , height()/2 - 100),
        k.scale(3)
    ]);
});

let idle = true;

function isIdle(idle){
    if(!idle){
        k.setGravity(160);
    }
}
