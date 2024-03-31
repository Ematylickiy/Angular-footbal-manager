export enum PlayerPosition {
  Goalkeeper = 'goalkeeper',
  Defender = 'defender',
  Midfielder = 'midfielder',
  Forward = 'forward',
}

export interface PlayerSchema {
  [key: string]: number;
}
