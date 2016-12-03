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
import { getAllowedYaku, addYakuToList } from './yaku-compat';
import { getHan, getFixedFu } from './yaku-values';
import {
  Outcome as OutcomeType,
  Yaku,
  Player
} from '../interfaces/common';
import { YakuId } from './yaku';
import { RiichiApiService } from '../services/riichiApi';

type AppScreen = 'overview' | 'outcomeSelect' | 'playersSelect' | 'yakuSelect' | 'confirmation';

export class AppState {
  private _currentScreen: AppScreen = 'overview';

  private _currentEventId: number = null;
  private _currentPlayerId: number = null;
  private _currentSessionHash: string = null;

  private _currentOutcome: AppOutcome = null;
  private _currentRound: number = 1;
  private _players: [Player, Player, Player, Player]; // e-s-w-n
  private _mapIdToPlayer: { [key: number]: Player };
  private _riichiOnTable: number = 0;
  private _honba: number = 0;
  private _timeRemaining: string = '00:00';

  constructor(public appRef: ApplicationRef, private api: RiichiApiService) {
    let userid = window.localStorage.getItem('userId');
    let eventid = window.localStorage.getItem('eventId');
    this._currentPlayerId = userid && parseInt(userid, 10);
    this._currentEventId = eventid && parseInt(eventid, 10);

    this._players = null;
    this._mapIdToPlayer = {};
  }

  init() {
    this.api.getCurrentGames(this._currentPlayerId, this._currentEventId)
      .then((games) => {
        // TODO: what if games > 1 ?
        this._currentSessionHash = games[0].hashcode;
        this._players = games[0].players;
        for (let p of this._players) {
          this._mapIdToPlayer[p.id] = p;
        }
        this.updateOverview();
      });
  }

  updateOverview() {
    if (!this._currentSessionHash) {
      return;
    }

    this.api.getGameOverview(this._currentSessionHash)
      .then((overview) => {
        this._currentRound = overview.state.round;
        this._riichiOnTable = overview.state.riichi;
        this._honba = overview.state.honba;
        this._players.forEach((player) => player.score = overview.state.scores[player.id]);

        // explicitly change reference to trigger rerender
        this._players = [this._players[0], this._players[1], this._players[2], this._players[3]];
      });
  }

  currentScreen() {
    return this._currentScreen;
  }

  getOutcome() {
    return this._currentOutcome && this._currentOutcome.selectedOutcome;
  }

  getHashcode() {
    return this._currentSessionHash;
  }

  toggleWinner(p: Player) {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'tsumo':
        this._currentOutcome.winner =
          this._currentOutcome.winner === p.id ? null : p.id;
        break;
      case 'multiron':
        // TODO: add win, etc
        break;
      case 'draw':
        const pIdx = this._currentOutcome.tempai.indexOf(p.id);
        if (pIdx === -1) {
          this._currentOutcome.tempai.push(p.id);
        } else {
          this._currentOutcome.tempai.splice(pIdx, 1);
        }
        break;
      default:
        throw new Error('No winners exist on this outcome');
    }
  }

  toggleLoser(p: Player) {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'multiron':
      case 'chombo':
        this._currentOutcome.loser =
          this._currentOutcome.loser === p.id ? null : p.id;
        break;
      default:
        throw new Error('No losers exist on this outcome');
    }
  }

  toggleRiichi(p: Player) {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'tsumo':
      case 'abort':
      case 'draw':
        const pIdx = this._currentOutcome.riichiBets.indexOf(p.id);
        if (pIdx === -1) {
          this._currentOutcome.riichiBets.push(p.id);
        } else {
          this._currentOutcome.riichiBets.splice(pIdx, 1);
        }
        break;
      case 'multiron':
        // TODO: how?
        break;
      default:
        throw new Error('No winners exist on this outcome');
    }
  }

  getWinningUsers(): Player[] {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'tsumo':
        return this._currentOutcome.winner
          ? [this._mapIdToPlayer[this._currentOutcome.winner]]
          : [];
      case 'multiron':
        return this._currentOutcome.wins.map((win) => this._mapIdToPlayer[win.winner]);
      case 'draw':
        return this._currentOutcome.tempai.map((t) => this._mapIdToPlayer[t]);
      default:
        return [];
    }
  }

  getLosingUsers(): Player[] {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'multiron':
      case 'chombo':
        return this._currentOutcome.loser
          ? [this._mapIdToPlayer[this._currentOutcome.loser]]
          : [];
      default:
        return [];
    }
  }

  getRiichiUsers(): Player[] {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'tsumo':
      case 'draw':
      case 'abort':
        return this._currentOutcome.riichiBets.map((r) => this._mapIdToPlayer[r]);
      case 'multiron':
        return this._currentOutcome.wins.reduce(
          (acc, win) => acc.concat(
            win.riichiBets.map(
              (r) => this._mapIdToPlayer[r]
            )
          ), []);
      default:
        return [];
    }
  }

  setHan(han: number) {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'tsumo':
        this._currentOutcome.han = han;
        break;
      case 'multiron':
        // TODO
        break;
      default:
        throw new Error('No yaku may exist on this outcome');
    }
  }

  setFu(fu: number) {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'tsumo':
        this._currentOutcome.fu = fu;
        break;
      case 'multiron':
        // TODO
        break;
      default:
        throw new Error('No yaku may exist on this outcome');
    }
  }

  getHan() {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'tsumo':
        return this._currentOutcome.han;
      case 'multiron':
      // TODO
      default:
        return 0;
    }
  }

  getFu() {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'tsumo':
        return this._currentOutcome.fu;
      case 'multiron':
      // TODO
      default:
        return 0;
    }
  }

  getPossibleFu() {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'tsumo':
        return this._currentOutcome.possibleFu;
      case 'multiron':
      // TODO
      default:
        return [];
    }
  }

  getPlayers(): Player[] {
    return this._players;
  }
  getRiichi() {
    return this._riichiOnTable;
  }
  getHonba() {
    return this._honba;
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
      case 'playersSelect':
        switch (this._currentOutcome.selectedOutcome) {
          case 'ron':
          case 'tsumo':
            this._currentScreen = 'yakuSelect';
            break;
          case 'multiron':
            this._currentScreen = 'yakuSelect'; // TODO this is only first of several yaku-select-screens
            break;
          case 'draw':
          case 'abort':
          case 'chombo':
            this._currentScreen = 'confirmation';
            break;
          default: ;
        }
        break;
      case 'yakuSelect':
        this._currentScreen = 'confirmation';
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
      case 'yakuSelect':
        this._currentScreen = 'playersSelect';
        break;
      case 'confirmation':
        switch (this._currentOutcome.selectedOutcome) {
          case 'ron':
          case 'tsumo':
            this._currentScreen = 'yakuSelect';
            break;
          case 'multiron':
            // TODO
            break;
          case 'draw':
          case 'abort':
          case 'chombo':
            this._currentScreen = 'playersSelect';
            break;
          default: ;
        }
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
          possibleFu: getFixedFu([]),
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
          possibleFu: getFixedFu([]),
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

  hasYaku(id: YakuId) {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'tsumo':
        return -1 !== this._currentOutcome.yaku.indexOf(id);
      case 'multiron':
      // TODO
      default:
        return false;
    }
  }

  getSelectedYaku(): YakuId[] {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'tsumo':
        return [].concat(this._currentOutcome.yaku);
      case 'multiron':
      // TODO
      default:
        return [];
    }
  }

  addYaku(id: YakuId): void {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'tsumo':
        this._currentOutcome.yaku = addYakuToList(id, this._currentOutcome.yaku);
        this._currentOutcome.han = getHan(this._currentOutcome.yaku);
        this._currentOutcome.possibleFu = getFixedFu(this._currentOutcome.yaku);
        if (-1 === this._currentOutcome.possibleFu.indexOf(this._currentOutcome.fu)) {
          this._currentOutcome.fu = this._currentOutcome.possibleFu[0];
        }
        break;
      case 'multiron':
        // TODO
        break;
      default:
        throw new Error('No yaku may exist on this outcome');
    }
  }

  removeYaku(id: YakuId): void {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'tsumo':
        const pIdx = this._currentOutcome.yaku.indexOf(id);
        if (pIdx !== -1) {
          this._currentOutcome.yaku.splice(pIdx, 1);
        }
        this._currentOutcome.han = getHan(this._currentOutcome.yaku);
        this._currentOutcome.possibleFu = getFixedFu(this._currentOutcome.yaku);
        if (-1 === this._currentOutcome.possibleFu.indexOf(this._currentOutcome.fu)) {
          this._currentOutcome.fu = this._currentOutcome.possibleFu[0];
        }
        break;
      // TODO: вернуть подавленные яку? или нет?
      case 'multiron':
        // TODO
        break;
      default:
        throw new Error('No yaku may exist on this outcome');
    }
  }

  getAllowedYaku(): YakuId[] {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'tsumo':
        return getAllowedYaku(this._currentOutcome.yaku);
      case 'multiron':
      // TODO
      default:
        return [];
    }
  }
}
