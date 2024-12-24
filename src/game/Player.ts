import marioSprite from '../assets/mario.png';
import { Entity } from './Entity';
import { Monster } from './Monster';

export class Player extends Entity {
  private sprite: HTMLImageElement;
  private isImageLoaded: boolean = false;
  health: number = 3;
  isInvulnerable: boolean = false;
  private invulnerabilityTimer: number = 0;
  private readonly INVULNERABILITY_DURATION = 60; // frames
  private readonly MONSTER_KILL_BOUNCE = -8; // Bounce velocity when killing a monster

  constructor(x: number, y: number) {
    super(x, y);
    this.width = 32;
    this.height = 32;
    
    this.sprite = new Image();
    this.sprite.onload = () => {
      this.isImageLoaded = true;
    };
    this.sprite.src = marioSprite;
  }

  takeDamage() {
    if (!this.isInvulnerable) {
      this.health--;
      this.isInvulnerable = true;
      this.invulnerabilityTimer = this.INVULNERABILITY_DURATION;
    }
  }

  update(platforms: Platform[], canvasWidth: number) {
    super.update(platforms, canvasWidth);
    
    if (this.isInvulnerable) {
      this.invulnerabilityTimer--;
      if (this.invulnerabilityTimer <= 0) {
        this.isInvulnerable = false;
      }
    }
  }

  checkMonsterCollision(monster: Monster): boolean {
    if (this.checkCollision(monster)) {
      // Check if player is above the monster
      const playerBottom = this.y + this.height;
      const monsterTop = monster.y;
      const playerFalling = this.velocityY > 0;

      if (playerFalling && playerBottom < monsterTop + monster.height / 2) {
        // Bounce off the monster when killing it
        this.velocityY = this.MONSTER_KILL_BOUNCE;
        this.isJumping = true;
        return true; // Player kills monster
      } else {
        this.takeDamage(); // Monster hurts player
      }
    }
    return false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.isInvulnerable && Math.floor(this.invulnerabilityTimer / 4) % 2 === 0) {
      return; // Skip drawing every other frame when invulnerable
    }

    ctx.save();
    
    if (this.direction === 'left') {
      ctx.scale(-1, 1);
      ctx.translate(-this.x - this.width, this.y);
    } else {
      ctx.translate(this.x, this.y);
    }

    if (this.isImageLoaded) {
      ctx.drawImage(this.sprite, 0, 0, this.width, this.height);
    } else {
      ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, this.width, this.height);
    }

    ctx.restore();
  }
}