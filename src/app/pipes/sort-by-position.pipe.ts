import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../models/player.model';
import { PlayerPosition } from '../models/player-position.enum';

@Pipe({
  name: 'sortByPosition',
})
export class SortByPositionPipe implements PipeTransform {
  transform(team: Player[] | null): { position: string; players: Player[] }[] {
    const sortedPlayers: { position: string; players: Player[] }[] = [];

    if (!team) return sortedPlayers;

    const playersByPosition = team.reduce(
      (acc, player) => {
        if (!acc[player.position]) {
          acc[player.position] = [];
        }
        acc[player.position].push(player);
        return acc;
      },
      {} as Record<PlayerPosition, Player[]>,
    );

    for (const [position, players] of Object.entries(playersByPosition)) {
      sortedPlayers.push({
        position: this.getPositionView(position as PlayerPosition),
        players,
      });
    }

    return sortedPlayers;
  }

  private getPositionView(position: PlayerPosition): string {
    switch (position) {
      case PlayerPosition.Defender:
        return 'Defenders';
      case PlayerPosition.Midfielder:
        return 'Midfielders';
      case PlayerPosition.Forward:
        return 'Forwards';
      case PlayerPosition.Goalkeeper:
        return 'Goalkeepers';
      default:
        return '';
    }
  }
}
