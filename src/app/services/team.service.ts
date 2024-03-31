import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Player } from '../models/player.model';
import { Team } from '../data/team';
import { PlayerPosition } from '../models/player-position.enum';
import { TacticalSchema } from '../helpers/tactical-schema';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private _autofillEmiter$ = new Subject<void>();

  private _team$ = new BehaviorSubject<Player[]>(
    JSON.parse(JSON.stringify(Team)) as Player[],
  );

  get autofillEmiter$(): Observable<void> {
    return this._autofillEmiter$.asObservable();
  }

  get team$(): Observable<Player[]> {
    return this._team$.asObservable();
  }

  get freeMembers$(): Observable<Player[]> {
    return this._team$
      .asObservable()
      .pipe(
        map((players) =>
          players.filter(({ fieldPositionId }) => !fieldPositionId),
        ),
      );
  }

  exchangePlayersPositions(
    exchangedPlayer: Player,
    draggblePlayer: Player,
  ): void {
    const exchangedPlayerPosition = exchangedPlayer?.fieldPositionId;
    const draggblePlayerPosition = draggblePlayer?.fieldPositionId;

    this.updateFieldPositionId(exchangedPlayer.id, draggblePlayerPosition);
    this.updateFieldPositionId(draggblePlayer.id, exchangedPlayerPosition);
  }

  getPlayerByFieldPositionId(fieldPositionId: number): Player | undefined {
    return this._team$.value.find(
      (player) => player.fieldPositionId === fieldPositionId,
    );
  }

  getFieldPlayers(): Player[] {
    return this._team$.value.filter((player) => player.fieldPositionId);
  }

  getFieldPlayersByPosition(position: PlayerPosition): Player[] {
    return this._team$.value.filter(
      (player) => player.fieldPositionId && player.position === position,
    );
  }

  updateFieldPositionId(
    playerId: number,
    fieldPositionId: number | null,
  ): void {
    this._team$.next(
      this._team$.value.map((player) => {
        if (player.fieldPositionId === fieldPositionId) {
          player.fieldPositionId = null;
        }

        if (player.id === playerId) {
          player.fieldPositionId = fieldPositionId;
        }

        return player;
      }),
    );
  }

  resetLineup(): void {
    const updatedTeam = this._team$.value.map((player) => {
      this.updateFieldPositionId(player.id, null);
      return player;
    });

    this._team$.next(updatedTeam);
  }

  autoFillEmit(): void {
    this._autofillEmiter$.next();
  }

  autofillLineup(schema: TacticalSchema): void {
    const filledPositionIds: number[] = [];

    const generatedLineup = this._team$.value.map((player) => {
      const suitablePositions = schema.fieldPositions.find(
        (f) => f[0].position === player.position,
      );
      const notFilledPosition = suitablePositions?.find(
        (pos) => !filledPositionIds.includes(pos.id),
      );

      if (notFilledPosition) {
        this.updateFieldPositionId(player.id, notFilledPosition?.id);
        filledPositionIds.push(notFilledPosition.id);
      }
      return player;
    });

    this._team$.next(generatedLineup);
  }
}
