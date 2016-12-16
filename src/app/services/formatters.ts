import { RCurrentGames, RRound, RUserInfo, RAllPlayersInEvent } from '../interfaces/remote';
import { LCurrentGame, LUser } from '../interfaces/local';
import { Player } from '../interfaces/common';
import { AppState } from '../primitives/appstate';

export function userInfoFormatter(user: RUserInfo): LUser {
  return {
    id: parseInt(user.id.toString(), 10),
    displayName: user.display_name,
    alias: user.alias,
    tenhouId: user.tenhou_id,
    ident: user.ident
  };
}

export function userListFormatter(list: RAllPlayersInEvent): LUser[] {
  return list.map((user) => ({
    id: parseInt(user.id.toString(), 10),
    displayName: user.display_name,
    alias: user.alias,
    tenhouId: user.tenhou_id,
    ident: null  // TODO?
  }));
}

export function currentGamesFormatter(games: RCurrentGames): LCurrentGame[] {
  const formatPlayer = (player): Player => ({
    id: parseInt(player.id, 10),
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

export function formatRoundToRemote(state: AppState): RRound {
  switch (state.getOutcome()) {
    case 'ron':
      return {
        outcome: 'ron',
        riichi: state.getRiichiUsers().map((player) => player.id).join(','),
        winner_id: state.getWinningUsers()[0].id,
        loser_id: state.getLosingUsers()[0].id,
        han: state.getHan() + state.getDora(),
        fu: state.getFu(),
        multi_ron: null,
        dora: state.getDora(),
        uradora: 0,
        kandora: 0,
        kanuradora: 0,
        yaku: state.getSelectedYaku().filter(y => y > 0).join(',')
      };
    case 'tsumo':
      return {
        outcome: 'tsumo',
        riichi: state.getRiichiUsers().map((player) => player.id).join(','),
        winner_id: state.getWinningUsers()[0].id,
        han: state.getHan() + state.getDora(),
        fu: state.getFu(),
        multi_ron: null,
        dora: state.getDora(),
        uradora: 0,
        kandora: 0,
        kanuradora: 0,
        yaku: state.getSelectedYaku().filter(y => y > 0).join(',')
      };
    case 'draw':
      return {
        outcome: 'draw',
        riichi: state.getRiichiUsers().map((player) => player.id).join(','),
        tempai: state.getWinningUsers().map((player) => player.id).join(',')
      };
    case 'abort':
      return {
        outcome: 'abort',
        riichi: state.getRiichiUsers().map((player) => player.id).join(',')
      };
    case 'chombo':
      return {
        outcome: 'chombo',
        loser_id: state.getLosingUsers()[0].id
      };
  }
}
