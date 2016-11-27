import {
  Outcome,
  AppOutcome,
  AppOutcomeRon,
  AppOutcomeTsumo,
  AppOutcomeDraw,
  AppOutcomeAbort,
  AppOutcomeChombo,
  AppOutcomeMultiRon
} from '../interfaces/app';
import { Outcome as OutcomeType, Yaku } from '../interfaces/common';

type AppScreen = 'overview' | 'outcomeSelect' | 'playersSelect' | 'yakuSelect' | 'confirmation';

export class AppState {
  private _currentScreen: AppScreen = 'overview';

  private _currentOutcome: AppOutcome = null;
  private _currentRound: number = 1;
  private _players: [number, number, number, number]; // e-s-w-n
  private _playersPoints: [number, number, number, number];
  private _riichiOnTable: number = 0;
  private _honba: number = 0;

  initBlankOutcome(outcome: OutcomeType) {
    switch (outcome) {
      case 'ron':
        const outcomeRon: AppOutcomeRon = {
          selectedOutcome: 'ron',
          roundIndex: this._currentRound,
          loser: null,
          winner: null,
          han: 0,
          fu: 30,
          yaku: [],
          riichiBets: [],
          dora: 0
        };
        this._currentOutcome = outcomeRon;
        break;
      case 'multiron':
        const outcomeMultiRon: AppOutcomeMultiRon = {
          selectedOutcome: 'multiron',
          roundIndex: this._currentRound,
          loser: null,
          multiRon: 0,
          wins: []
        };
        this._currentOutcome = outcomeRon;
        break;
      case 'tsumo':
        const outcomeTsumo: AppOutcomeTsumo = {
          selectedOutcome: 'tsumo',
          roundIndex: this._currentRound,
          winner: null,
          han: 0,
          fu: 30,
          yaku: [],
          riichiBets: [],
          dora: 0
        };
        this._currentOutcome = outcomeTsumo;
        break;
      case 'draw':
        const outcomeDraw: AppOutcomeDraw = {
          selectedOutcome: 'draw',
          roundIndex: this._currentRound,
          riichiBets: [],
          tempai: []
        };
        this._currentOutcome = outcomeDraw;
        break;
      case 'abort':
        const outcomeAbort: AppOutcomeAbort = {
          selectedOutcome: 'abort',
          roundIndex: this._currentRound,
          riichiBets: []
        };
        this._currentOutcome = outcomeAbort;
        break;
      case 'chombo':
        const outcomeChombo: AppOutcomeChombo = {
          selectedOutcome: 'chombo',
          roundIndex: this._currentRound,
          loser: null
        };
        this._currentOutcome = outcomeChombo;
        break;
    }
  }
}
