// fix moving backwards collision

eruda.init({
  defaults: {
    theme: "Dark"
  }
});
//eruda.show();

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let resolution = 150;
let fov = 90 * Math.PI/180;
let length = 1;

let keyboard = {};

let player = new Player();
let offset = 0.5;
let obstacles = [
  new Collision(0+offset, 0, 10, canvas.height*.7, 1),
  new Collision(canvas.width*.3+offset, canvas.height*.3, 10, canvas.height*.7, 1),
  new Collision(canvas.width*.6+offset, 0, 10, canvas.height*.7, 1),
  new Collision(canvas.width*.9+offset, canvas.height*.3, 10, canvas.height*.7, 1),
  new Collision(canvas.width*.45+offset, canvas.height*.5, 15, 15, 1),
  new Collision(canvas.width*.35+offset, canvas.height*.6, 15, 15, 1),
  new Collision(canvas.width*.55+offset, canvas.height*.6, 15, 15, 1),
  new Collision(canvas.width*.45+offset, canvas.height*.7, 15, 15, 1),
  new Collision(canvas.width*.35+offset, canvas.height*.8, 15, 15, 1),
  new Collision(canvas.width*.55+offset, canvas.height*.8, 15, 15, 1),
  new Collision(canvas.width*.45+offset, canvas.height*.3, 15, 15, 1),
  new Collision(canvas.width*.35+offset, canvas.height*.4, 15, 15, 1),
  new Collision(canvas.width*.55+offset, canvas.height*.4, 15, 15, 1),
  //
  new Collision(0-offset, 0, 10, canvas.height*.7, 1),
  new Collision(canvas.width*.3-offset, canvas.height*.3, 10, canvas.height*.7, 1),
  new Collision(canvas.width*.6-offset, 0, 10, canvas.height*.7, 1),
  new Collision(canvas.width*.9-offset, canvas.height*.3, 10, canvas.height*.7, 1),
  new Collision(canvas.width*.45-offset, canvas.height*.5, 15, 15, 1),
  new Collision(canvas.width*.35-offset, canvas.height*.6, 15, 15, 1),
  new Collision(canvas.width*.55-offset, canvas.height*.6, 15, 15, 1),
  new Collision(canvas.width*.45-offset, canvas.height*.7, 15, 15, 1),
  new Collision(canvas.width*.35-offset, canvas.height*.8, 15, 15, 1),
  new Collision(canvas.width*.55-offset, canvas.height*.8, 15, 15, 1),
  new Collision(canvas.width*.45-offset, canvas.height*.3, 15, 15, 1),
  new Collision(canvas.width*.35-offset, canvas.height*.4, 15, 15, 1),
  new Collision(canvas.width*.55-offset, canvas.height*.4, 15, 15, 1),
  //
  new Collision(0, 0, 10, canvas.height*.7),
  new Collision(canvas.width*.3, canvas.height*.3, 10, canvas.height*.7),
  new Collision(canvas.width*.6, 0, 10, canvas.height*.7),
  new Collision(canvas.width*.9, canvas.height*.3, 10, canvas.height*.7),
  new Collision(canvas.width*.45, canvas.height*.5, 15, 15),
  new Collision(canvas.width*.35, canvas.height*.6, 15, 15),
  new Collision(canvas.width*.55, canvas.height*.6, 15, 15),
  new Collision(canvas.width*.45, canvas.height*.7, 15, 15),
  new Collision(canvas.width*.35, canvas.height*.8, 15, 15),
  new Collision(canvas.width*.55, canvas.height*.8, 15, 15),
  new Collision(canvas.width*.45, canvas.height*.3, 15, 15),
  new Collision(canvas.width*.35, canvas.height*.4, 15, 15),
  new Collision(canvas.width*.55, canvas.height*.4, 15, 15)
];
let raycaster = [];

function Start() {
  length = document.querySelector("#length").value;
  fov = document.querySelector("#fov").value * Math.PI/180;
  resolution = document.querySelector("#resolution").value;
  Update();
}

function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grd.addColorStop(0, "black");
  grd.addColorStop(0.5, "black");
  grd.addColorStop(1, "grey");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // W
  if(keyboard[87]) {
    player.moveForward(3);
    for(obstacle of obstacles) {
      if(player.checkCollision(obstacle)) {
        player.moveForward(-3);
        break;
      }
    }
  }
  // S
  if(keyboard[83]) {
    player.moveForward(-3);
    for(obstacle of obstacles) {
      if(player.checkCollision(obstacle)) {
        player.moveForward(3);
        break;
      }
    }
  }
  // A
  if(keyboard[65]) {
    player.turn(Math.PI/-40);
  }
  // D
  if(keyboard[68]) {
    player.turn(Math.PI/40);
  }
  raycaster = [];
  for(let i = 0;i <= resolution-1;i++) {
    raycaster.push(new Ray(
      player.x+player.size/2, 
      player.y+player.size/2, 
      length,  
      Lerp(player.deg-fov/2, player.deg+fov/2, i/(resolution-1))
    ));
    ctx.lineWidth = 1;
    raycaster[raycaster.length-1].shoot(obstacles);
    Draw3d(raycaster[raycaster.length-1], i);
  }
  for(obstacle of obstacles) {
    obstacle.draw();
  }
  player.draw();
}

function GetDistance(x1, y1, x2, y2) {
  return Math.sqrt(
    (x2-x1) ** 2 +
    (y2-y1) ** 2
  );
}

function Lerp(start, end, percent) {
  return start+(end-start)*percent;
}

function Draw3d(ray, index) {
  ctx.lineWidth = (innerWidth/resolution)+.7;
  var brightness = 1-ray.len/ray.radius;
  ctx.strokeStyle = (ray.hit < ray.radius) ? (ray.color === 0) ? "rgb("+24*brightness+","+57*brightness+", "+154*brightness+")" : "rgba("+31*brightness+", "+73*brightness+", "+199*brightness+")" : "rgba(0, 0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(Lerp(0, canvas.width, index/resolution), map(ray.len, 0, ray.radius, 0, canvas.height/2));
  ctx.lineTo(Lerp(0, canvas.width, index/resolution), map(ray.len, 0, ray.radius, canvas.height, canvas.height/2));
  ctx.stroke();
}

window.onload = function() {
  Start();
}

window.onresize = function() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

window.onkeydown = e => {
  keyboard[e.keyCode] = true;
}

window.onkeyup = e => {
  keyboard[e.keyCode] = false;
}

document.querySelector("#resolution").oninput = function() {
  resolution = this.value;
  document.querySelector("#resid").innerHTML = this.value;
}

document.querySelector("#fov").oninput = function() {
  fov = this.value * Math.PI/180;
  document.querySelector("#fovid").innerHTML = this.value;
}

document.querySelector("#length").oninput = function() {
  length = this.value;
  document.querySelector("#lenid").innerHTML = this.value;
}

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;
