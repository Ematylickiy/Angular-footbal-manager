export enum PlayerPosition {
  Goalkeeper = 'goalkeeper',
  Defender = 'defender',
  Midfielder = 'midfielder',
  Forward = 'forward',
}

export enum PlayerPositionsView {
  Goalkeepers = 'Goalkeepers',
  Defenders = 'Defenders',
  Midfielders = 'Midfielders',
  Forwards = 'Forwards',
}

export interface PlayerSchema {
  [key: string]: number;
}
