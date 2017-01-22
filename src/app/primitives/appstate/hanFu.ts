import { Player } from '../../interfaces/common';
import { AppOutcome } from '../../interfaces/app';


export function setHan(han: number, outcome: AppOutcome, mrWinner: number) {
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'tsumo':
      outcome.han = han;
      break;
    case 'multiron':
      outcome.wins[mrWinner].han = han;
      break;
    default:
      throw new Error('No yaku may exist on this outcome');
  }
}

export function setFu(fu: number, outcome: AppOutcome, mrWinner: number) {
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'tsumo':
      outcome.fu = fu;
      break;
    case 'multiron':
      outcome.wins[mrWinner].fu = fu;
      break;
    default:
      throw new Error('No yaku may exist on this outcome');
  }
}

export function getHanOf(user: number, outcome: AppOutcome) {
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'tsumo':
      return outcome.han;
    case 'multiron':
      return outcome.wins[user].han;
    default:
      return 0;
  }
}

export function getFuOf(user: number, outcome: AppOutcome) {
  let han: number, fu: number;
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'tsumo':
      // Don't send fu to the server for limit hands
      fu = outcome.fu;
      han = outcome.han + outcome.dora;
      if (han >= 5) {
        fu = 0;
      }
      return fu;
    case 'multiron':
      fu = outcome.wins[user].fu;
      han = outcome.wins[user].han + outcome.wins[user].dora;
      if (han >= 5) {
        fu = 0;
      }
      return fu;
    default:
      return 0;
  }
}

export function getPossibleFu(outcome: AppOutcome, mrWinner: number) {
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'tsumo':
      return outcome.possibleFu;
    case 'multiron':
      return outcome.wins[mrWinner].possibleFu;
    default:
      return [];
  }
}

