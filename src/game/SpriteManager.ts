import monsterSprite from '../assets/monster.png';

export class SpriteManager {
  private static instance: SpriteManager;
  private monsterSprite: HTMLImageElement;
  private isMonsterLoaded: boolean = false;

  private constructor() {
    this.monsterSprite = new Image();
    this.monsterSprite.onload = () => {
      this.isMonsterLoaded = true;
    };
    this.monsterSprite.src = monsterSprite;
  }

  static getInstance(): SpriteManager {
    if (!SpriteManager.instance) {
      SpriteManager.instance = new SpriteManager();
    }
    return SpriteManager.instance;
  }

  getMonsterSprite(): HTMLImageElement {
    return this.monsterSprite;
  }

  isMonsterSpriteLoaded(): boolean {
    return this.isMonsterLoaded;
  }
}