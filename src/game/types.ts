export enum BoxType {
  COIN = 'COIN',
  TREASURE = 'TREASURE'
}

export interface CollisionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}