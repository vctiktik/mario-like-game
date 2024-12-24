export class LevelManager {
  private currentLevel: number = 1;
  private baseMonsterCount: number = 2;

  getCurrentLevel(): number {
    return this.currentLevel;
  }

  getMonsterCount(): number {
    return this.baseMonsterCount + (this.currentLevel - 1);
  }

  nextLevel(): void {
    this.currentLevel++;
  }

  generateMonsterPositions(canvasWidth: number): { x: number, y: number }[] {
    const positions: { x: number, y: number }[] = [];
    const monsterCount = this.getMonsterCount();
    const spacing = canvasWidth / (monsterCount + 1);
    
    for (let i = 0; i < monsterCount; i++) {
      positions.push({
        x: spacing * (i + 1),
        y: 200
      });
    }
    
    return positions;
  }
}