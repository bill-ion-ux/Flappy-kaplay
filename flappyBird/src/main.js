import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay();

k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("bean", "sprites/bean.png");

let idle = true;
const bean = k.add([
    k.pos(600 , 300),
    k.sprite("bean"),
    area(),
    body(),
]);

k.onClick(() => {
    idle = false;
    isIdle(idle);
    bean.jump(100)
});
function isIdle(idle){
    if(!idle){
        k.setGravity(160);
    }
}
