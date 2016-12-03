import { RCurrentGames } from '../interfaces/remote';
import { LCurrentGame } from '../interfaces/local';
import { Player } from '../interfaces/common';

export function currentGamesFormatter(games: RCurrentGames): LCurrentGame[] {
  const formatPlayer = (player): Player => ({
    id: player.id,
    alias: player.alias,
    displayName: player.display_name,
    score: player.score
  });

  return games.map((game): LCurrentGame => ({
    hashcode: game.hashcode,
    status: game.status,
    players: [
      formatPlayer(game.players[0]),
      formatPlayer(game.players[1]),
      formatPlayer(game.players[2]),
      formatPlayer(game.players[3])
    ]
  }))
}
