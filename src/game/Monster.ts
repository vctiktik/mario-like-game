import { Entity } from './Entity';
import { Platform } from './Platform';
import { SpriteManager } from './SpriteManager';

export class Monster extends Entity {
  private moveDirection: number = 1;
  private movementTimer: number = 0;
  private readonly DIRECTION_CHANGE_INTERVAL = 120;
  private spriteManager: SpriteManager;

  constructor(x: number, y: number) {
    super(x, y);
    this.width = 48;  // 1.5x base size (32px)
    this.height = 48; // Square dimensions
    this.speed = 1;
    this.spriteManager = SpriteManager.getInstance();
  }

  update(platforms: Platform[], canvasWidth: number) {
    // Random movement
    this.movementTimer++;
    if (this.movementTimer >= this.DIRECTION_CHANGE_INTERVAL) {
      this.moveDirection = Math.random() > 0.5 ? 1 : -1;
      this.movementTimer = 0;
    }

    // Move in current direction
    this.x += this.speed * this.moveDirection;
    if (this.moveDirection > 0) {
      this.direction = 'right';
    } else {
      this.direction = 'left';
    }

    // Wall collision
    if (this.x < 0) {
      this.x = 0;
      this.moveDirection *= -1;
    }
    if (this.x + this.width > canvasWidth) {
      this.x = canvasWidth - this.width;
      this.moveDirection *= -1;
    }

    // Apply gravity and platform collision
    super.update(platforms, canvasWidth);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    
    if (this.direction === 'left') {
      ctx.scale(-1, 1);
      ctx.translate(-this.x - this.width, this.y);
    } else {
      ctx.translate(this.x, this.y);
    }

    if (this.spriteManager.isMonsterSpriteLoaded()) {
      ctx.drawImage(this.spriteManager.getMonsterSprite(), 0, 0, this.width, this.height);
    } else {
      // Fallback drawing if image hasn't loaded
      ctx.fillStyle = '#800000';
      ctx.fillRect(0, 0, this.width, this.height);
      
      ctx.fillStyle = 'yellow';
      const eyeSize = 10;
      ctx.fillRect(this.width * 0.2, this.height * 0.2, eyeSize, eyeSize);
      ctx.fillRect(this.width * 0.6, this.height * 0.2, eyeSize, eyeSize);
    }

    ctx.restore();
  }
}