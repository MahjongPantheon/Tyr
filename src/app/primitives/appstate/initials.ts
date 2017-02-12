import {
  AppOutcome,
  AppOutcomeRon,
  AppOutcomeTsumo,
  AppOutcomeDraw,
  AppOutcomeAbort,
  AppOutcomeChombo,
  AppOutcomeMultiRon
} from '../../interfaces/app';
import { Outcome as OutcomeType } from '../../interfaces/common';
import { getFixedFu } from '../yaku-values';

export function initBlankOutcome(round: number, outcome: OutcomeType): AppOutcome {
  let out: AppOutcome;
  switch (outcome) {
    case 'ron':
      const outcomeRon: AppOutcomeRon = {
        selectedOutcome: 'ron',
        roundIndex: round,
        loser: null,
        winner: null,
        han: 0,
        fu: 30,
        possibleFu: getFixedFu([], 'ron'),
        yaku: [],
        riichiBets: [],
        dora: 0
      };
      out = outcomeRon;
      break;
    case 'multiron':
      const outcomeMultiRon: AppOutcomeMultiRon = {
        selectedOutcome: 'multiron',
        roundIndex: round,
        loser: null,
        multiRon: 0,
        riichiBets: [],
        wins: {}
      };
      out = outcomeMultiRon;
      break;
    case 'tsumo':
      const outcomeTsumo: AppOutcomeTsumo = {
        selectedOutcome: 'tsumo',
        roundIndex: round,
        winner: null,
        han: 0,
        fu: 30,
        possibleFu: getFixedFu([], 'tsumo'),
        yaku: [],
        riichiBets: [],
        dora: 0
      };
      out = outcomeTsumo;
      break;
    case 'draw':
      const outcomeDraw: AppOutcomeDraw = {
        selectedOutcome: 'draw',
        roundIndex: round,
        riichiBets: [],
        tempai: []
      };
      out = outcomeDraw;
      break;
    case 'abort':
      const outcomeAbort: AppOutcomeAbort = {
        selectedOutcome: 'abort',
        roundIndex: round,
        riichiBets: []
      };
      out = outcomeAbort;
      break;
    case 'chombo':
      const outcomeChombo: AppOutcomeChombo = {
        selectedOutcome: 'chombo',
        roundIndex: round,
        loser: null
      };
      out = outcomeChombo;
      break;
  }

  return out;
}
