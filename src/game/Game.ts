import { Player } from './Player';
import { Platform } from './Platform';
import { Box } from './Box';
import { BoxType } from './types';
import { Monster } from './Monster';
import { LevelManager } from './LevelManager';
import { UIManager } from './UIManager';

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  player: Player;
  platforms: Platform[];
  boxes: Box[];
  monsters: Monster[];
  keys: { [key: string]: boolean };
  score: number = 0;
  gameOver: boolean = false;
  private levelManager: LevelManager;
  private uiManager: UIManager;
  private levelComplete: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.levelManager = new LevelManager();
    this.uiManager = new UIManager(canvas, this.ctx);
    
    this.initializeGame();
    this.setupEventListeners();
    this.gameLoop();
  }

  private initializeGame() {
    this.score = 0;
    this.gameOver = false;
    this.levelComplete = false;
    this.levelManager = new LevelManager();
    
    this.player = new Player(50, 200);
    this.platforms = [
      new Platform(0, 400, 800),
      new Platform(300, 300, 200),
      new Platform(100, 200, 200),
    ];
    this.boxes = [
      new Box(150, 150, BoxType.COIN),
      new Box(350, 150, BoxType.TREASURE),
      new Box(450, 150, BoxType.COIN),
    ];
    this.initializeMonsters();
    this.keys = {};
  }

  private initializeMonsters() {
    const monsterPositions = this.levelManager.generateMonsterPositions(this.canvas.width);
    this.monsters = monsterPositions.map(pos => new Monster(pos.x, pos.y));
  }

  private setupEventListeners() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
      if ((e.key === ' ' || e.key === 'ArrowUp') && !this.levelComplete && !this.gameOver) {
        this.player.jump();
      } else if (e.key === ' ' && this.levelComplete) {
        this.startNextLevel();
      } else if (e.key === ' ' && this.gameOver) {
        this.initializeGame();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    });

    this.canvas.addEventListener('click', (e) => {
      if (this.gameOver) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (this.uiManager.isClickOnRestartButton(x, y)) {
          this.initializeGame();
        }
      }
    });
  }

  private startNextLevel() {
    this.levelManager.nextLevel();
    this.levelComplete = false;
    this.player = new Player(50, 200);
    this.initializeMonsters();
  }

  private checkMonsterCollisions() {
    this.monsters = this.monsters.filter(monster => {
      const killed = this.player.checkMonsterCollision(monster);
      if (killed) {
        this.score += 200;
        return false;
      }
      return true;
    });

    if (this.monsters.length === 0 && !this.levelComplete) {
      this.levelComplete = true;
    }
  }

  private update() {
    if (this.gameOver || this.levelComplete) return;

    if (this.keys['ArrowLeft']) {
      this.player.moveLeft();
    }
    if (this.keys['ArrowRight']) {
      this.player.moveRight();
    }

    this.player.update(this.platforms, this.canvas.width);
    this.monsters.forEach(monster => monster.update(this.platforms, this.canvas.width));
    
    // Check collisions
    for (const box of this.boxes) {
      if (this.player.checkCollision(box)) {
        if (this.player.velocityY < 0 && 
            this.player.y + this.player.height > box.y + box.height) {
          const points = box.hit();
          if (points > 0) {
            this.score += points;
          }
        }
      }
    }
    
    this.checkMonsterCollisions();

    if (this.player.health <= 0) {
      this.gameOver = true;
    }
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.uiManager.drawScore(this.score);
    this.uiManager.drawHealth(this.player.health);
    this.uiManager.drawLevel(this.levelManager.getCurrentLevel());

    this.platforms.forEach(platform => platform.draw(this.ctx));
    this.boxes.forEach(box => box.draw(this.ctx));
    this.monsters.forEach(monster => monster.draw(this.ctx));
    this.player.draw(this.ctx);

    if (this.gameOver) {
      this.uiManager.drawGameOver(this.score);
    } else if (this.levelComplete) {
      this.uiManager.drawWinScreen();
    }
  }

  private gameLoop = () => {
    this.update();
    this.draw();
    requestAnimationFrame(this.gameLoop);
  }
}