class Collision {
  constructor(x, y, w, h, color=0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }
  draw() {
    ctx.fillStyle = (this.color === 1) ? "blue" : "white";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
