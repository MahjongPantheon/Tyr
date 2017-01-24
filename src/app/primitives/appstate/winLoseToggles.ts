import { Player } from '../../interfaces/common';
import { AppOutcome } from '../../interfaces/app';

export function toggleWinner(p: Player, outcome: AppOutcome) {
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'tsumo':
      outcome.winner = outcome.winner === p.id ? null : p.id;
      break;
    case 'draw':
      const pIdx = outcome.tempai.indexOf(p.id);
      if (pIdx === -1) {
        outcome.tempai.push(p.id);
      } else {
        outcome.tempai.splice(pIdx, 1);
        const rIdx = outcome.riichiBets.indexOf(p.id);
        if (rIdx !== -1) { // remove riichi if any
          outcome.riichiBets.splice(rIdx, 1);
        }
      }
      break;
    case 'multiron':
      if (outcome.wins[p.id]) {
        delete outcome.wins[p.id];
      } else {
        outcome.wins[p.id] = { // blank win item
          winner: p.id,
          han: 0,
          fu: 0,
          possibleFu: [],
          yaku: [],
          dora: 0
        };
      }
      outcome.multiRon = Object.keys(outcome.wins).length;
      break;
    default:
      throw new Error('No winners exist on this outcome');
  }
}

export function toggleLoser(p: Player, outcome: AppOutcome) {
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'multiron':
    case 'chombo':
      outcome.loser = outcome.loser === p.id ? null : p.id;
      break;
    default:
      throw new Error('No losers exist on this outcome');
  }
}

type PMap = { [key: number]: Player };

export function getWinningUsers(outcome: AppOutcome, playerIdMap: PMap): Player[] {
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'tsumo':
      return outcome.winner
        ? [playerIdMap[outcome.winner]]
        : [];
    case 'multiron':
      let users = [];
      for (let w in outcome.wins) {
        users.push(playerIdMap[outcome.wins[w].winner]);
      }
      return users;
    case 'draw':
      return outcome.tempai.map((t) => playerIdMap[t]);
    default:
      return [];
  }
}

export function getLosingUsers(outcome: AppOutcome, playerIdMap: PMap): Player[] {
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'multiron':
    case 'chombo':
      return outcome.loser
        ? [playerIdMap[outcome.loser]]
        : [];
    default:
      return [];
  }
}
