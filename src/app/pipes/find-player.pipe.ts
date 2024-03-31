import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../models/player.model';
import { TeamService } from '../services/team.service';
import { Observable, map } from 'rxjs';

@Pipe({
  name: 'findPlayer',
})
export class FindPlayerPipe implements PipeTransform {
  constructor(private teamService: TeamService) {}

  transform(fieldPositionId: number): Observable<Player | undefined> {
    return this.teamService.team$.pipe(
      map((team) =>
        team.find((player) => player.fieldPositionId === fieldPositionId),
      ),
    );
  }
}
