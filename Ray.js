class Ray {
  constructor(x, y, radius, angle) {
    this.origin = {
      x: x,
      y: y
    }
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angle = angle;
    this.color = 0;
    this.hit = radius;
  }
  draw() {
    // hypotenuse
    ctx.lineWidth = 1;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.origin.x, this.origin.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    // adjacent
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(0, 255, 0, 0.1)";
    ctx.beginPath();
    ctx.moveTo(this.origin.x, this.origin.y);
    ctx.lineTo(Math.cos(this.angle)*len+this.origin.x, Math.sin(this.angle)*len+this.origin.y);
    ctx.stroke();
    // opposite
  }
  shoot(objects) {
    var length = 0;
    var obj;
    var hit = false;
    while(!hit && GetDistance(this.x, this.y, this.origin.x, this.origin.y) < this.radius) {
      this.x += Math.cos(this.angle) * .5;
      this.y += Math.sin(this.angle) * .5;
      length++;
      for(let object of objects) {
        if(object.x < this.x + 0 &&
        object.x + object.w > this.x &&
        object.y < this.y + 0 &&
        object.h + object.y > this.y) {
          this.hit = GetDistance(this.x, this.y, this.origin.x, this.origin.y);
          hit = true;
          obj = object;
        }
      }
    }
    ctx.strokeStyle = "rgba(0, 0, 0, 0)";
    if(obj) {
      this.color = obj.color;
      if(obj.color === 1) {
        ctx.strokeStyle = "rgba(0, 0, 255,"+(1-Lerp(0, this.radius, this.hit/this.radius)/this.radius)+")";
      }else {
        ctx.strokeStyle = "rgba(0, 255, 0,"+(1-Lerp(0, this.radius, this.hit/this.radius)/this.radius)+")";
      }
    }
    var angle =  this.angle - player.deg;
    this.len = this.hit * Math.cos(angle);
    //this.draw();
  }
}
