import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { DragServiceService } from '../../services/drag.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {
  draggblePlayer$ = this.dragService.draggblePlayer$;

  freePlayers$ = this.teamService.freeMembers$;

  constructor(
    private dragService: DragServiceService,
    private teamService: TeamService,
  ) {}

  onPlayerDrop(): void {
    if (!this.dragService.draggblePlayer?.fieldPositionId) return;

    this.teamService.updateFieldPositionId(
      this.dragService.draggblePlayer.id,
      null,
    );

    this.dragService.clearDraggblePlayer();
  }

  autoFill(): void {
    this.teamService.resetLineup();
    this.teamService.autoFillEmit();
  }

  reset(): void {
    this.teamService.resetLineup();
  }
}
