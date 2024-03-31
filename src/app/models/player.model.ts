import { PlayerPosition } from './player-position.enum';

export interface Player {
  id: number;
  number: number;
  name: string;
  lastName: string;
  position: PlayerPosition;
  fieldPositionId: number | null;
  avatar: string;
}
