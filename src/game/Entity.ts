import { Platform } from './Platform';

export class Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityY: number = 0;
  isJumping: boolean = false;
  speed: number = 2;
  direction: 'left' | 'right' = 'right';

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 32;  // Base size for square sprites
    this.height = 32; // Same as width for square sprites
  }

  moveLeft() {
    this.x -= this.speed;
    this.direction = 'left';
  }

  moveRight() {
    this.x += this.speed;
    this.direction = 'right';
  }

  jump() {
    if (!this.isJumping) {
      this.velocityY = -12;
      this.isJumping = true;
    }
  }

  update(platforms: Platform[], canvasWidth: number) {
    // Apply gravity
    this.velocityY += 0.5;
    this.y += this.velocityY;

    // Check platform collisions
    for (const platform of platforms) {
      if (this.checkCollision(platform)) {
        if (this.velocityY > 0) {
          this.y = platform.y - this.height;
          this.velocityY = 0;
          this.isJumping = false;
        }
      }
    }

    // Keep entity within canvas bounds
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > canvasWidth) this.x = canvasWidth - this.width;
  }

  checkCollision(platform: { x: number; y: number; width: number; height: number }): boolean {
    return (
      this.x < platform.x + platform.width &&
      this.x + this.width > platform.x &&
      this.y < platform.y + platform.height &&
      this.y + this.height > platform.y
    );
  }
}