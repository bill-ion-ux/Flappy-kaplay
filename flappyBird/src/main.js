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
        k.scale(1.5),
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
    let score = 0;
    k.add([
        k.sprite("bg", {width : width() , height : height()}),
        k.pos(0,0),
        k.fixed(),
    ]);

    function producePipes(){
    const offset = rand(-50, 50);

        k.add([
            k.sprite("pipe", {height : 500 , width : 50}),
            k.pos(width() - 100 , height()/2 + offset + pipeGap/2),
            area(),
            "pipe",
            {passed : false}
        ]);
        k.add([
            k.sprite("pipe", {flipY: true}, {height : 1000 , width : 50}),
            k.pos(width() - 100 , height()/2 + offset - pipeGap/2),
            k.anchor("botleft"),
            area(),
            "pipe"
        ]);
    }
    k.loop(1.5, () => {
        producePipes();
    });
    k.onUpdate("pipe", (pipe) => {
        pipe.move(-160, 0)
        if(pipe.passed === false && pipe.pos.x < bird.pos.x){
            pipe.passed = true;
            score += 1;
            scoreText.text = score;
            
        }
    });
    k.add([
        k.pos(0,620),
        k.sprite("base",{width : width(), height : 120}),
        area(),
        body({
            isStatic : true
        })
    ]);
    const scoreText = add([
        k.text(score, {size : 40})
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
        bird.jump(130);
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
    k.onKeyPress("space", () => {
        go("game");
    })
});

let idle = true;

function isIdle(idle){
    if(!idle){
        k.setGravity(160);
    }
}
