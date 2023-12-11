
let infiniteblocks;
let infblocks = false;
let inMenu = false;
let state = false;
let pX; //player-x
let pY; //player-y
let dirX; //retningsvektor af spiller
let dirY; //retningsvektor af spiller
let plaX; //retningsvektor af kameraplan
let plaY; //retningsvektor af kameraplan
const levelwid = 24;
const levelhei = 24;
const canvasSize = 512;
const screenwid = 640;
const screenhei = 480;
const pixelx = screenwid/levelwid;
const pixely = screenhei/levelhei;
const pi = Math.PI;
let largeNumber;
let speed;
let rotspeed;
largeNumber = 1234567890;
pX = 10;
pY = 10;
dirX = -1;
dirY = 0;
plaX = 0;
plaY = 0.66; //2 * arctan(0.66/1)=66 deg
let aimedBlock = 0;
let selectedBlock = 2;
let block2count = 0;
let block3count = 0;
let block4count = 0;
let currentBlockCount = 0;
let time;
let oldTime;
var level = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,4,3,4,2,0,0,0,1],
    [1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,4,0,0,0,4,0,0,0,1],
    [1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,3,0,5,0,2,0,0,0,1],
    [1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,4,0,0,0,4,0,0,0,1],
    [1,0,2,2,2,2,2,0,0,0,0,0,0,0,0,2,4,3,4,2,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,3,0,3,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,3,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,3,0,3,1],
    [1,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,0,0,0,0,0,0,1],
    [1,2,2,2,2,2,0,0,0,0,4,0,0,0,4,5,4,0,0,0,0,0,0,1],
    [1,2,2,2,2,2,0,0,0,0,4,0,4,0,4,0,4,0,0,0,0,0,0,1],
    [1,2,2,2,2,2,0,0,0,0,4,0,4,0,0,0,4,0,0,0,0,0,0,1],
    [1,2,2,5,2,2,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,0,0,1],
    [1,2,2,2,2,2,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,1],
    [1,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];
function setup() {
infiniteblocks = createCheckbox('Infinite blocks',false);
infiniteblocks.changed(checkEvent);
infiniteblocks.position(screenwid/2-50,100);
infiniteblocks.hide();
time = 0;
temptime = 0;
createCanvas(screenwid, screenhei+screenhei);
frameRate(10);
 

}
function draw() {
    background(0);

    fill(255);
    rect(screenwid-25,0,25,25);
    fill(0);
    text("ESC", screenwid-24,13);
    if(inMenu){
    drawMenu();
    }
    else{
    infiniteblocks.hide();
    draw3D();
    draw2D();
    drawUI();
    keyHandler();
    }


temptime = time;
time = millis();
timeprframe = (time-temptime) / 1000.0;
speed = timeprframe * 5.0;
rotspeed = timeprframe * 3.0;
print(1.0/timeprframe);




    
}
function keyHandler() {
    if(keyIsDown(87)) { //87 == w
        print("w");
        if(level[Math.floor(pX+dirX*speed)][Math.floor(pY)] == 0) {
            pX += dirX * speed;
        }
        if(level[Math.floor(pX)][Math.floor(pY+dirY*speed)] == 0){
            pY += dirY * speed;
        }
      }
      if(keyIsDown(65)) { //65 == a
        print("a");
        let tempdirX = dirX;
        dirX = dirX * Math.cos(rotspeed) - dirY * Math.sin(rotspeed);
        dirY = tempdirX * Math.sin(rotspeed) + dirY * Math.cos(rotspeed);
        let tempplaX = plaX;
        plaX = plaX * Math.cos(rotspeed) - plaY * Math.sin(rotspeed);
        plaY = tempplaX * Math.sin(rotspeed) + plaY * Math.cos(rotspeed);
      }
      if(keyIsDown(68)){ //68 == d
        print("d");
        let tempdirX = dirX;
        dirX = dirX * Math.cos(-rotspeed) - dirY * Math.sin(-rotspeed);
        dirY = tempdirX * Math.sin(-rotspeed) + dirY * Math.cos(-rotspeed);
        let tempplaX = plaX;
        plaX = plaX * Math.cos(-rotspeed) - plaY * Math.sin(-rotspeed);
        plaY = tempplaX * Math.sin(-rotspeed) + plaY * Math.cos(-rotspeed);
      }
      if(keyIsDown(83)) { //83 == s
        print("s");
        if(level[Math.floor(pX-dirX*speed)][Math.floor(pY)] == 0) {
            pX -= dirX * speed;
        }
        if(level[Math.floor(pX)][Math.floor(pY-dirY*speed)] == 0){
            pY -= dirY * speed;
        }
      }
      if(keyIsDown(32)) { //32 == space
        if(level[Math.floor(pX+dirX*speed*2)][Math.floor(pY+dirY*speed*2)] == 0) {
            switch(selectedBlock){
                case 2:
                    if(block2count>0 || infblocks){
                        level[Math.floor(pX+dirX*speed*2)][Math.floor(pY+dirY*speed*2)] = selectedBlock;
                        block2count--;
                    } 
    
                    break;
                case 3:
                    if(block3count>0 || infblocks) {
                        level[Math.floor(pX+dirX*speed*2)][Math.floor(pY+dirY*speed*2)] = selectedBlock;
                        block3count--;
                    }
                    break;
                case 4:
                    if(block4count>0 || infblocks) {
                        level[Math.floor(pX+dirX*speed*2)][Math.floor(pY+dirY*speed*2)] = selectedBlock;
                        block4count--;
                    }
                    break;
                default:
                    break;
                }
            
        }
        
    
        }
    if(keyIsDown(16)) { //16 == shift
        if(level[Math.floor(pX+dirX*speed*2)][Math.floor(pY+dirY*speed*2)] > 1) {
            aimedBlock = level[Math.floor(pX+dirX*speed*2)][Math.floor(pY+dirY*speed*2)];
            switch(aimedBlock){
                case 2:
                    block2count++;
                    break;
                case 3:
                    block3count++;
                    break;
                case 4:
                    block4count++;
                    break;
                default:
                    break;
            }
            level[Math.floor(pX+dirX*speed*2)][Math.floor(pY+dirY*speed*2)] = 0;
    
        }
    }
    if(keyIsDown(69)) { //69 = e
        selectedBlock++;
        if(selectedBlock > 4){
            selectedBlock = 2;
        }
    
    }
    if(keyIsDown(81)) { //81 = q
        selectedBlock--;
        if(selectedBlock < 2){
            selectedBlock = 4;
        }
    }
}
function draw3D() {
    fill(210,180,140);
    rect(0,screenhei/2,screenwid,screenhei);
    fill(0);
    for(var x = 0; x < screenwid; x++){
        var cameraX = 2 * x / screenwid -1;
        var rayDirX = dirX + plaX * cameraX;
        var rayDirY = dirY + plaY * cameraX;
    
        var mapX = Math.floor(pX);
        var mapY = Math.floor(pY);
    
        var sideDistX;
        var sideDistY;
    
        var deltaDistX;
        var deltaDistY;
        
        if(rayDirX == 0){
            deltaDistX = largeNumber;
        }
        else {
            deltaDistX = Math.abs(1/rayDirX);
        }
        if(rayDirY == 0){
            deltaDistY = largeNumber;
        }
        else {
            deltaDistY = Math.abs(1/rayDirY);
        }
    
        var perpWallDist;
    
        var stepX;
        var stepY;
        var hit = 0;
        var side;
        if(rayDirX < 0) {
            stepX = -1;
            sideDistX = (pX - mapX) * deltaDistX;
        }
        else {
            stepX = 1;
            sideDistX = (mapX + 1.0 - pX) * deltaDistX;
        }
        if(rayDirY < 0) {
            stepY = -1;
            sideDistY = (pY - mapY) * deltaDistY;
        }
        else {
            stepY = 1;
            sideDistY = (mapY + 1.0 - pY) * deltaDistY;
        }
    
        while(hit == 0)
        {
            if(sideDistX < sideDistY) {
                sideDistX += deltaDistX;
                mapX += stepX;
                side = 0;
            }
            else {
                sideDistY += deltaDistY;
                mapY += stepY;
                side = 1;
            }
            
            if(level[mapX][mapY] > 0){
                hit = 1;
            }
        }
    
        if(side == 0) {
            perpWallDist = (sideDistX - deltaDistX);
        }
        else {
            perpWallDist = (sideDistY - deltaDistY);
        }
    
        var lineHeight = Math.floor(screenhei/perpWallDist);
        var drawStart = -lineHeight / 2 + screenhei / 2;
        if(drawStart < 0) {
            drawStart = 0;
        }
        var drawEnd = lineHeight / 2 + screenhei / 2;
        if(drawEnd >= screenhei) {
            drawEnd = screenhei-1;
        }
        var c;
        var red;
        var green;
        var blue;
        switch(level[mapX][mapY]) {
            case 1: 
            red = 255;
            green = 0;
            blue = 0;
            c = color(red,green,blue);
            break;
            case 2: 
            red = 0;
            green = 255;
            blue = 0;
            c = color(red,green,blue);
            break;
            case 3:
            red = 0;
            green = 0;
            blue = 255;
            c = color(red,green,blue);
            break;
            case 4: 
            red = 255;
            green = 255;
            blue = 255;
            c = color(red,green, blue);
            break;
            default:
            red = 255;
            green = 255;
            blue = 0;
            c = color(red,green,blue);
            break;
        }
        if(side == 1) {
            red = red/2;
            green = green/2;
            blue = blue/2;
            c = color(red,green,blue);
        }
        stroke(c);
        strokeWeight(2);
        line(x,drawStart,x,drawEnd);
    
    
    
    }
}
function draw2D() {
    for(let i=0;i<levelhei;i++){
      for(let j=0;j<levelwid;j++){
        if(level[j][i] !=0){ 
          fill(255,255,255); //Hvid farve
        }else{
          fill(0,0,0); //sort farve
        }
        stroke(128);
        rect(pixelx*(levelwid-j-1),pixely*i+screenhei,pixelx-2,pixely-2+screenhei);
      }
    }
    fill(255,0,0);
    circle(screenwid-pX*pixelx,pY*pixely+screenhei,20);
  }
function drawUI() {
    switch(selectedBlock) {
        case 1: 
        red = 255;
        green = 0;
        blue = 0;
        c = color(red,green,blue,);
        break;
        case 2: 
        red = 0;
        green = 255;
        blue = 0;
        c = color(red,green,blue);
        break;
        case 3:
        red = 0;
        green = 0;
        blue = 255;
        c = color(red,green,blue);
        break;
        case 4: 
        red = 255;
        green = 255;
        blue = 255;
        c = color(red,green, blue);
        break;
        default:
        red = 255;
        green = 255;
        blue = 0;
        c = color(red,green,blue);
        break;
    }
    fill(c);
    stroke(0);
    rect(25,25,25,25);
    text("Selected block: "+selectedBlock, 65, 35);
    if(infblocks) {
        currentBlockCount = '∞';
    }
    else {
    switch(selectedBlock){
        case 2:
            currentBlockCount = block2count;
            break;
        case 3:
            currentBlockCount = block3count;
            break;
        case 4:
            currentBlockCount = block4count;
            break;
        default: 
            currentBlockCount = 0;
            break;

    }
}
    text("Block Count: "+currentBlockCount, 65, 45)


}
function drawMenu(){
textSize(36);
fill(255);
background(128);
stroke(0);
textAlign(CENTER);
text("Raycaster!!!",screenwid/2,40);
rect(screenwid/2-100,200,200,50);
text("Start",screenwid/2,235);
textSize(12);
textAlign(LEFT);
infiniteblocks.show();


}
function mousePressed(){
    if(checkBounds(screenwid-25,screenwid,0,25) && !inMenu){
        inMenu = true;
    }
    if(checkBounds((screenwid/2-100),(screenwid/2+100),200,250) && inMenu){
        inMenu = false;
    } 
}
function mouseReleased(){
    state = false;
}
function checkBounds(boundx1,boundx2,boundy1,boundy2) {
    a = false;
    if(((mouseX > boundx1) && (mouseX < boundx2)) && ((mouseY > boundy1) && (mouseY < boundy2))){
    a = true;
    }
    return a;
    }
function checkEvent() {
    if(infiniteblocks.checked()) {
        infblocks = true;
    }
    else {
        infblocks = false;
    }

    



}