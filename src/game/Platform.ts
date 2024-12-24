export class Platform {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 20;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}