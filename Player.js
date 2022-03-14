class Player {
  constructor() {
    this.x = Math.floor(Math.random() * innerWidth);
    this.y = Math.floor(Math.random() * innerHeight);
    this.deg = Math.PI/2;
    this.size = 20;
  }
  moveForward(step) {
    this.x += Math.cos(this.deg) * step;
    this.y += Math.sin(this.deg) * step;
  }
  draw() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.moveTo(Math.cos(this.deg) * 12 + this.x + this.size/2, Math.sin(this.deg) * 12 + this.y + this.size/2);
    ctx.lineTo(Math.cos(this.deg+Math.PI-0.8) * 12 + this.x + this.size/2, Math.sin(this.deg+Math.PI-0.8) * 12 + this.y + this.size/2);
    ctx.lineTo(Math.cos(this.deg+Math.PI+0.8) * 12 + this.x + this.size/2, Math.sin(this.deg+Math.PI+0.8) * 12 + this.y + this.size/2);
    ctx.fill();
  }
  turn(deg) {
    this.deg += deg;
  }
  checkCollision(obstacle) {
    if(obstacle.x < this.x + this.size &&
        obstacle.x + obstacle.w > this.x &&
        obstacle.y < this.y + this.size &&
        obstacle.h + obstacle.y > this.y) {
      return true;
    }
  }
}
