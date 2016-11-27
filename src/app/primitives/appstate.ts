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
import { ApplicationRef } from '@angular/core';
import {
  Outcome as OutcomeType,
  Yaku,
  Player
} from '../interfaces/common';

type AppScreen = 'overview' | 'outcomeSelect' | 'playersSelect' | 'yakuSelect' | 'confirmation';

export class AppState {
  private _currentScreen: AppScreen = 'overview';

  private _currentOutcome: AppOutcome = null;
  private _currentRound: number = 1;
  private _players: [Player, Player, Player, Player]; // e-s-w-n
  private _riichiOnTable: number = 0;
  private _honba: number = 0;
  private _timeRemaining: string = '00:00';

  private _currentPlayerId: number = 1;

  constructor(public appRef: ApplicationRef) {

  }

  currentScreen() {
    return this._currentScreen;
  }

  getOutcome() {
    return this._currentOutcome && this._currentOutcome.selectedOutcome;
  }

  setHan(han) {

  }

  setFu(fu) {

  }

  getHan() { return 0; } // TODO: 
  getFu() { return 30; } // TODO: 
  getPlayers(): Player[] { // TODO: 
    return [
      { id: 1, alias: '', displayName: 'User1', score: 23000 },
      { id: 2, alias: '', displayName: 'User2', score: 24000 },
      { id: 3, alias: '', displayName: 'User3', score: 26000 },
      { id: 4, alias: '', displayName: 'User4', score: 27000 }
    ];
  }
  getRiichi() { // TODO: 
    return 1;
  }
  getHonba() { // TODO: 
    return 0;
  }
  getCurrentRound() {
    return this._currentRound;
  }
  getTimeRemaining() {
    return this._timeRemaining;
  }
  getCurrentPlayerId() {
    return this._currentPlayerId;
  }

  getTournamentTitle() {
    return 'Быстрый сброс-2017';
  }

  nextScreen() { // TODO: повесить на историю для управления хотя бы переходами по экранам
    switch (this._currentScreen) {
      case 'overview':
        this._currentScreen = 'outcomeSelect';
        break;
      case 'outcomeSelect':
        this._currentScreen = 'playersSelect';
        break;
      default: ;
    }

    // TODO: вроде и без этого работает, убрать если в прод-версии тоже ок
    //    this.appRef.tick(); // force recalc & rerender
  }

  prevScreen() {
    switch (this._currentScreen) {
      case 'outcomeSelect':
        this._currentScreen = 'overview';
        break;
      case 'playersSelect':
        this._currentScreen = 'outcomeSelect';
        break;
      default: ;
    }
  }

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
        this._currentOutcome = outcomeMultiRon;
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
