import { FieldPosition } from '../models/field-position.model';
import { PlayerPosition, PlayerSchema } from '../models/player-position.enum';
import { generateRandomId } from './id-generator';

export class TacticalSchema {
  static readonly CountPeapleWithoutGoalkeeper = 10;

  private _fieldPositions: FieldPosition[][];

  get fieldPositions(): FieldPosition[][] {
    return this._fieldPositions.slice();
  }

  private _id = generateRandomId();

  get id(): number {
    return this._id;
  }

  constructor(schema: PlayerSchema) {
    const count = Object.values(schema).reduce((a, b) => a + b);
    if (count !== TacticalSchema.CountPeapleWithoutGoalkeeper) {
      throw Error('Invalid schema');
    }

    this._fieldPositions = this.createFieldPositions(schema);
  }

  private createFieldPositions(schema: PlayerSchema): FieldPosition[][] {
    const fieldPosition: FieldPosition[][] = [];
    fieldPosition.push([{ id: 1, position: PlayerPosition.Goalkeeper }]);

    Object.entries(schema).forEach(([position, count], index) => {
      const players: FieldPosition[] = [];

      for (let i = 1; i <= count; i++) {
        players.push({
          id: index * 10 + i + 1,
          position: position as PlayerPosition,
        });
      }
      fieldPosition.push(players);
    });

    return fieldPosition;
  }
}
