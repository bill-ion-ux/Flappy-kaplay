import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({
 
});

k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("birdD", "sprites/bird-down.png");
k.loadSprite("base", "sprites/base.png");
k.loadSprite("bg", "sprites/bg.png");
k.loadSprite("pipe", "sprites/pipe.png");



k.scene("background", () => {
    k.add([
        k.sprite("bg", {width : width() , height : height()}),
        k.pos(0,0),
        k.fixed(),
    ]);
    k.add([
        k.sprite("pipe"),
        k.pos(width() - 100 , 500),

    ]);
     k.add([
        k.sprite("pipe", {flipY: true}),
        k.pos(width() - 100 , -50),

    ]);
    k.add([
    k.pos(0,620),
    k.sprite("base",{width : width(), height : 120}),
    area(),
    body({
        isStatic : true
    })
    ]);
    const bird = k.add([
        k.pos(600 , 300),
        k.sprite("birdD"),
        k.scale(1),
        area(),
        body(),
    ]);
    k.onClick(() => {
        idle = false;
        isIdle(idle);
        bird.jump(100)
    });
});
k.go("background");

let idle = true;



function isIdle(idle){
    if(!idle){
        k.setGravity(160);
    }
}
