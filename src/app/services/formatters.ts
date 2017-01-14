import {
  RCurrentGames, RRound, RUserInfo,
  RAllPlayersInEvent, RPlayerData,
  RTimerState
} from '../interfaces/remote';
import { LCurrentGame, LUser, LUserWithScore, LTimerState } from '../interfaces/local';
import { Player } from '../interfaces/common';
import { AppState } from '../primitives/appstate';

export function timerFormatter(timer: RTimerState): LTimerState {
  return {
    started: !!timer.started,
    finished: !!timer.finished,
    timeRemaining: timer.time_remaining ? parseInt(timer.time_remaining.toString(), 10) : 0
  };
}

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

export function lastResultsFormatter(list: RPlayerData[]): LUserWithScore[] {
  if (!list) {
    return null;
  }
  return list.map((user) => ({
    id: parseInt(user.id.toString(), 10),
    displayName: user.display_name,
    alias: user.alias,
    ident: user.ident,
    tenhouId: null, // TODO?
    score: user.score
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
        round_index: state.getCurrentRound(),
        honba: state.getHonba(),
        outcome: 'ron',
        riichi: state.getRiichiUsers().map((player) => player.id).join(','),
        winner_id: state.getWinningUsers()[0].id,
        loser_id: state.getLosingUsers()[0].id,
        han: state.getHan() + state.getDora(),
        fu: state.getFu(),
        multi_ron: null,
        dora: state.getDora(),
        uradora: state.getUradora(),
        kandora: state.getKandora(),
        kanuradora: state.getKanuradora(),
        yaku: state.getSelectedYaku().filter(y => y > 0).join(',')
      };
    case 'multiron':
      let winIdx = 0;
      let wins = state.getWins().map(win => {
        let riichi = winIdx > 0 ? '' : state.getRiichiUsers().map((player) => player.id).join(',');
        winIdx++; // TODO: выпилить когда завезут вынос riichi из секции wins внутри апи
        return {
          riichi,
          winner_id: win.winner,
          han: win.han + win.dora,
          fu: win.fu,
          dora: win.dora,
          uradora: win.uradora,
          kandora: win.kandora,
          kanuradora: win.kanuradora,
          yaku: win.yaku.filter(y => y > 0).join(',')
        };
      });

      return {
        round_index: state.getCurrentRound(),
        honba: state.getHonba(),
        outcome: 'multiron',
        loser_id: state.getLosingUsers()[0].id,
        multi_ron: wins.length,
        wins
      };
    case 'tsumo':
      return {
        round_index: state.getCurrentRound(),
        honba: state.getHonba(),
        outcome: 'tsumo',
        riichi: state.getRiichiUsers().map((player) => player.id).join(','),
        winner_id: state.getWinningUsers()[0].id,
        han: state.getHan() + state.getDora(),
        fu: state.getFu(),
        multi_ron: null,
        dora: state.getDora(),
        uradora: state.getUradora(),
        kandora: state.getKandora(),
        kanuradora: state.getKanuradora(),
        yaku: state.getSelectedYaku().filter(y => y > 0).join(',')
      };
    case 'draw':
      return {
        round_index: state.getCurrentRound(),
        honba: state.getHonba(),
        outcome: 'draw',
        riichi: state.getRiichiUsers().map((player) => player.id).join(','),
        tempai: state.getWinningUsers().map((player) => player.id).join(',')
      };
    case 'abort':
      return {
        round_index: state.getCurrentRound(),
        honba: state.getHonba(),
        outcome: 'abort',
        riichi: state.getRiichiUsers().map((player) => player.id).join(',')
      };
    case 'chombo':
      return {
        round_index: state.getCurrentRound(),
        honba: state.getHonba(),
        outcome: 'chombo',
        loser_id: state.getLosingUsers()[0].id
      };
  }
}
