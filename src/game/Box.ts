import { BoxType } from './types';

export class Box {
  x: number;
  y: number;
  width: number = 32;
  height: number = 32;
  type: BoxType;
  isHit: boolean = false;
  value: number;
  initialY: number;
  bounceOffset: number = 0;
  bounceSpeed: number = 0;

  constructor(x: number, y: number, type: BoxType) {
    this.x = x;
    this.y = y;
    this.initialY = y;
    this.type = type;
    this.value = type === BoxType.COIN ? 100 : 500;
  }

  hit() {
    if (!this.isHit) {
      this.isHit = true;
      this.bounceSpeed = -8; // Start bounce animation
      return this.value;
    }
    return 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Update bounce animation
    if (this.bounceSpeed !== 0) {
      this.bounceOffset += this.bounceSpeed;
      this.bounceSpeed += 0.5; // Gravity
      
      if (this.bounceOffset >= 0) {
        this.bounceOffset = 0;
        this.bounceSpeed = 0;
      }
    }

    const drawY = this.y + this.bounceOffset;

    ctx.fillStyle = this.isHit ? '#996633' : (this.type === BoxType.COIN ? '#FFD700' : '#B8860B');
    ctx.fillRect(this.x, drawY, this.width, this.height);
    
    // Add question mark or treasure symbol
    ctx.fillStyle = this.isHit ? '#663300' : '#FFFFFF';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.type === BoxType.COIN ? '?' : 'T', this.x + this.width/2, drawY + this.height/2);
  }
}