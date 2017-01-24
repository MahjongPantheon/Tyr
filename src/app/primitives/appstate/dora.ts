import { Player } from '../../interfaces/common';
import { AppOutcome } from '../../interfaces/app';

export function setDora(dora: number, outcome: AppOutcome, mrWinner: number) {
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'tsumo':
      outcome.dora = dora;
      break;
    case 'multiron':
      outcome.wins[mrWinner].dora = dora;
      break;
    default:
      throw new Error('No yaku may exist on this outcome');
  }
}

export function getDoraOf(user: number, outcome: AppOutcome) {
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'tsumo':
      return outcome.dora;
    case 'multiron':
      return outcome.wins[user].dora;
    default:
      return 0;
  }
}
