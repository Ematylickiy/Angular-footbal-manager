import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from '../../../models/player.model';
import { DragServiceService } from '../../../services/drag.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerCardComponent {
  @Input({ required: true }) player?: Player;

  constructor(private dragService: DragServiceService) {}

  onDragStart(player: Player) {
    this.dragService.draggblePlayerSubj = { ...player };
  }

  onDragEnd() {
    this.dragService.clearDraggblePlayer();
  }
}
