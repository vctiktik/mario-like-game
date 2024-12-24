import './style.css';
import { Game } from './game/Game';

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

new Game(canvas);