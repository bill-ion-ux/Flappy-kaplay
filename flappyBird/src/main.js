import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({
 
});

k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("birdD", "sprites/bird-down.png");
k.loadSprite("birdup", "sprites/bird-up.png");
k.loadSprite("birdmid", "sprites/bird-mid.png");
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
    const g = 1200;
    const jumpForce = 320;
    const pipeGap = 100;
    let idle = true;
    let score = 0;
    k.add([
        k.sprite("bg", {width : width() , height : height()}),
        k.pos(0,0),
        k.fixed(),
    ]);

    function producePipes(){
    const offset = rand(-50, 50);

        k.add([
            k.sprite("pipe"),
            k.pos(width() + 100 , height()/2 + offset + pipeGap/2 ),
            area(),
            "pipe",
            {passed : false}
        ]);
        k.add([
            k.sprite("pipe", {flipY: true}),
                k.pos( width() + 100 ,   height()/2 + offset - pipeGap/2),
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
    const base1 = k.add([
        k.pos(0,620),
        k.sprite("base",{width : width(), height : 120}),
        area(),
        body({
            isStatic : true
        }),
        k.z(10),
        "base"
    ]);
    const base2 = k.add([
        k.pos(width(), 620),
        k.sprite("base", { width: width(), height: 120 }),
        k.z(10),
        "base"
    ]);
    const baseSpeed = 120; // pixels per second
    k.onUpdate("base", (b) => {
        b.move(-baseSpeed, 0);

        if (b.pos.x <= -width()) {
            b.pos.x += width() * 2;
        }
    });

    const scoreText = add([
        k.text(score, {size : 40})
    ]);
    const birdStartX = k.width() / 4;
    const birdFrames = ["birdup","birdmid","birdD"];
    let frame = 0;
    k.loop(0.1, () => {
        frame = (frame + 1) % birdFrames.length;
        bird.use(k.sprite(birdFrames[frame]));
    });
    const bird = k.add([
        k.pos(birdStartX, k.height() / 2 ),
        k.sprite("birdD"),
        area(),
        body(),
        "bird"
    ]);

    bird.onUpdate(() => {
        bird.pos.x = birdStartX;
    });
    bird.onCollide("pipe", () => {
        go("gameOver");
    });
    function isIdle(idle){
        if(!idle){
            k.setGravity(g);
        }
    }
    k.onClick(() => {
        idle = false;
        isIdle(idle);
        bird.jump(jumpForce);
        bird.angle = -30;
    });
    bird.angle = 0; // <--- initialize so k.lerp never sees undefined

    bird.onUpdate(() => {
        if (bird.vel.y < 0) {
            bird.angle = -20;
        } else {
            bird.angle = k.lerp(bird.angle, 90, 4 * k.dt());
        }
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


