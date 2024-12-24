export class UIManager {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private restartButton: { x: number; y: number; width: number; height: number };

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    
    // Define restart button dimensions
    const buttonWidth = 200;
    const buttonHeight = 50;
    this.restartButton = {
      x: (canvas.width - buttonWidth) / 2,
      y: canvas.height / 2 + 40,
      width: buttonWidth,
      height: buttonHeight
    };
  }

  drawScore(score: number): void {
    this.ctx.fillStyle = '#000';
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Score: ${score}`, 10, 30);
  }

  drawHealth(health: number): void {
    this.ctx.fillStyle = '#000';
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Health: ${health}`, 10, 60);
  }

  drawLevel(level: number): void {
    this.ctx.fillStyle = '#000';
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'right';
    this.ctx.fillText(`Level: ${level}`, this.canvas.width - 10, 30);
  }

  drawGameOver(finalScore: number): void {
    this.drawOverlay();
    
    // Draw game over text
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2 - 60);
    
    // Draw final score
    this.ctx.font = '32px Arial';
    this.ctx.fillText(`Final Score: ${finalScore}`, this.canvas.width / 2, this.canvas.height / 2);
    
    // Draw restart button
    this.ctx.fillStyle = '#4CAF50';
    this.ctx.fillRect(
      this.restartButton.x,
      this.restartButton.y,
      this.restartButton.width,
      this.restartButton.height
    );
    
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '24px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      'Restart Game',
      this.restartButton.x + this.restartButton.width / 2,
      this.restartButton.y + this.restartButton.height / 2 + 8
    );

    // Draw space instruction
    this.ctx.font = '20px Arial';
    this.ctx.fillText(
      'Press SPACE to restart',
      this.canvas.width / 2,
      this.restartButton.y + this.restartButton.height + 30
    );
  }

  drawWinScreen(): void {
    this.drawOverlay();
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Level Complete!', this.canvas.width / 2, this.canvas.height / 2 - 40);
    
    this.ctx.font = '24px Arial';
    this.ctx.fillText('Press SPACE to continue', this.canvas.width / 2, this.canvas.height / 2 + 20);
  }

  private drawOverlay(): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  isClickOnRestartButton(x: number, y: number): boolean {
    return (
      x >= this.restartButton.x &&
      x <= this.restartButton.x + this.restartButton.width &&
      y >= this.restartButton.y &&
      y <= this.restartButton.y + this.restartButton.height
    );
  }
}