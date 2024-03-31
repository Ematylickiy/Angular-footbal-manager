import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
} from '@angular/core';
import {
  tacticalSchema_4_3_3,
  tacticalSchema_4_4_2,
  tacticalSchema_5_3_2,
} from '../../data/tactical-schemes';
import { FieldPosition } from '../../models/field-position.model';
import { DragServiceService } from '../../services/drag.service';
import { TeamService } from '../../services/team.service';
import { TacticalSchema } from '../../helpers/tactical-schema';
import { PlayerPosition } from '../../models/player-position.enum';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent implements AfterViewInit, OnDestroy {
  draggblePlayer$ = this.dragService.draggblePlayer$;

  activeTacticalSchema = signal<TacticalSchema | null>(null);

  schemas = [
    new TacticalSchema(tacticalSchema_4_3_3),
    new TacticalSchema(tacticalSchema_4_4_2),
    new TacticalSchema(tacticalSchema_5_3_2),
  ];

  private _subscription = new Subscription();

  constructor(
    private dragService: DragServiceService,
    private teamService: TeamService,
  ) {
    this.activeTacticalSchema.set(this.schemas[1]);
  }

  ngAfterViewInit(): void {
    this._subscription = this.teamService.autofillEmiter$
      .pipe(filter(() => !!this.activeTacticalSchema()))
      .subscribe(() => {
        this.teamService.autofillLineup(this.activeTacticalSchema()!);
      });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  onFieldDrop(fieldPosition: FieldPosition): void {
    const draggblePlayer = this.dragService.draggblePlayer;

    if (!draggblePlayer || fieldPosition.id === draggblePlayer.fieldPositionId)
      return;

    const playerOnThisPosition = this.teamService.getPlayerByFieldPositionId(
      fieldPosition.id,
    );

    const isExchangePositions =
      draggblePlayer.fieldPositionId && playerOnThisPosition;

    if (isExchangePositions) {
      this.teamService.exchangePlayersPositions(
        playerOnThisPosition,
        draggblePlayer,
      );
    } else {
      this.teamService.updateFieldPositionId(
        draggblePlayer.id,
        fieldPosition.id,
      );
    }

    this.dragService.clearDraggblePlayer();
  }

  clearPosition(playerId: number) {
    this.teamService.updateFieldPositionId(playerId, null);
  }

  updateActiveSchema(schema: TacticalSchema): void {
    [
      PlayerPosition.Defender,
      PlayerPosition.Midfielder,
      PlayerPosition.Forward,
    ].forEach((pos) => {
      const fieldPlayers = this.teamService.getFieldPlayersByPosition(pos);
      const fieldPositions = schema.fieldPositions.find(
        ([firstFieldPosition]) => firstFieldPosition.position === pos,
      );

      if (fieldPlayers.length > fieldPositions!.length) {
        const excessPlayer = fieldPlayers.find(
          (player) =>
            !fieldPositions?.find((f) => f.id === player.fieldPositionId),
        );

        this.teamService.updateFieldPositionId(excessPlayer!.id, null);
      }
    });

    this.activeTacticalSchema.set(schema);
  }
}
