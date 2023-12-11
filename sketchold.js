let level;
let px; //player-x
let py; //player-y
let pa; //player-angle
const speed = 5;
const anglespeed = 0.1;
const levelwid = 8;
const levelhei = 8;
const levelsqr = 64;
const canvasSize = 512;
const pixelx = canvasSize/levelwid;
const pixely = canvasSize/levelhei;
const pi = Math.PI;
px = canvasSize/2;
py = canvasSize/2;
pa = 0;
function setup() {

  createCanvas(canvasSize, canvasSize);
  frameRate(30);



  level = [
  1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,1,
  1,0,0,1,1,1,0,1,
  1,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,1,
  1,0,0,1,0,0,0,1,
  1,0,0,1,0,1,1,1,
  1,1,1,1,1,1,1,1
  ];

  do2D = createCheckbox('2D mode', true);
}

function draw() {
  background(220);
  playerMovement();
  if(do2D.checked()){
    draw2D();
    draw3D();

  }
  else{
    draw3D();
  }
}
function draw2D() {
  for(let i=0;i<levelhei;i++){
    for(let j=0;j<levelwid;j++){
      if(level[i*levelwid+j]==1){
        fill(255,255,255);
      }
      else{
        fill(0,0,0);
      }
      rect(pixelx*j,pixely*i,pixelx-2,pixely-2);

    }
  }
  fill(255,0,0);
  circle(px,py,20);
  circle(px+(cos(pa)*10),py-(sin(pa)*10),10);
  text('px: '+px+' py: '+py,50,50);



}

function draw3D() {

  let ra = pa; //ra = ray angle, lig med player angle
  let rx; //ray-x position
  let ry; //ray-y position
  let xo; //ray x offset
  let yo; //ray y offset
  let lx; //level x celle
  let ly; //level y celle
  let lp; //level array position
  let rays = 1; //mængde af rays;
  let renderdist;
  let renderdistmax = 8; //view distance max
  //matematik kilde: https://www.youtube.com/watch?v=gYRrGTC7GtA, https://lodev.org/cgtutor/raycasting.html
  for(let i=0;i<rays;i++){
    renderdist = 0;
  
   //horisontal
   ry = round(py/pixely)*py;
   rx = 1;

    }
    if(ra==0 || ra==pi){
      rx = px;
      ry = py;
      renderdist = renderdistmax;
    }
    while(renderdist<renderdistmax){
      lx=int(rx/pixelx);
      ly=int(ry/pixely);
      lp=ly*levelwid+lx;
      if((lp<levelwid*levelhei) && (level[lp]==1)){//check kollision
        renderdist = renderdistmax;
      } 
      else{
        rx = rx+xo;
        ry = ry+yo;
        renderdist++;
      }
      
    }
    text('rx: '+rx+' ry: '+ry+' ra: '+ra+' pa: '+pa,100,100);
    line(px,py,rx,ry);
  }
  


}
function playerMovement() {
  if(keyIsDown(87)) { //87 == w
    px=px+(cos(pa)*speed);
    py=py-(sin(pa)*speed);
  }
  if(keyIsDown(65)) { //65 == a
    pa=pa+anglespeed;
    if(pa>(2*Math.PI)){
      pa=0;
    }
  }
  if(keyIsDown(68)){ //68 == d
    pa=pa-anglespeed;
    if(pa<=0){
      pa=2*pi;
    }
  }
  if(keyIsDown(83)) { //83 == s
    px=px-(cos(pa)*speed);
    py=py+(sin(pa)*speed);
  }
}
