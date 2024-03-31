import { PlayerSchema, PlayerPosition } from '../models/player-position.enum';

export const tacticalSchema_4_4_2: PlayerSchema = {
  [PlayerPosition.Defender]: 4,
  [PlayerPosition.Midfielder]: 4,
  [PlayerPosition.Forward]: 2,
};

export const tacticalSchema_5_3_2: PlayerSchema = {
  [PlayerPosition.Defender]: 5,
  [PlayerPosition.Midfielder]: 3,
  [PlayerPosition.Forward]: 2,
};

export const tacticalSchema_4_3_3: PlayerSchema = {
  [PlayerPosition.Defender]: 4,
  [PlayerPosition.Midfielder]: 3,
  [PlayerPosition.Forward]: 3,
};
