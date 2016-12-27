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
import { NgZone } from '@angular/core';
import { getAllowedYaku, addYakuToList } from './yaku-compat';
import { getHan, getFixedFu } from './yaku-values';
import {
  Outcome as OutcomeType,
  Yaku,
  Player
} from '../interfaces/common';
import { YakuId } from './yaku';
import { RiichiApiService } from '../services/riichiApi';
import { RemoteError } from '../services/remoteError';
import {
  LCurrentGame,
  LUser,
  LTimerState
} from '../interfaces/local';

type AppScreen = 'overview' | 'outcomeSelect' | 'playersSelect'
  | 'yakuSelect' | 'confirmation' | 'newGame' | 'lastResults' | 'login';

type LoadingSet = {
  games: boolean,
  overview: boolean
};

export class AppState {
  private _currentScreen: AppScreen = 'overview';

  private _currentPlayerDisplayName: string = null;
  private _currentSessionHash: string = null;

  private _currentPlayerId: number = null;
  private _currentOutcome: AppOutcome = null;
  private _currentRound: number = 1;
  private _players: [Player, Player, Player, Player]; // e-s-w-n
  private _mapIdToPlayer: { [key: number]: Player };
  private _riichiOnTable: number = 0;
  private _honba: number = 0;
  private _timeRemaining: number = 0;

  private _isLoggedIn: boolean = false;

  // preloaders flags
  private _loading: LoadingSet = {
    games: true,
    overview: false
  };
  isLoading(...what: string[]) {
    return what.reduce((acc, item) => acc || this._loading[item], false);
  }

  constructor(private zone: NgZone, private api: RiichiApiService) {
    this._players = null;
    this._mapIdToPlayer = {};

    let timer = setInterval(() => {
      this.decrementTimer();
      if (!this._timeRemaining) {
        clearInterval(timer);
      }
    }, 1000);
  }

  init() {
    this.reinit();
    // initial push to make some history to return to
    window.history.pushState({}, '');
    window.onpopstate = (e: PopStateEvent): any => {
      this.zone.run(() => {
        // Any history pop we do as BACK event!
        this.prevScreen();
        // Then make another dummy history item
        window.history.pushState({}, '');
      });
    };
  }

  reinit() {
    this.api.setCredentials(window.localStorage.getItem('authToken'));
    this._isLoggedIn = !!window.localStorage.getItem('authToken');
    if (!this._isLoggedIn || window.location.pathname === '/__reset') {
      this._currentScreen = 'login';
    } else {
      this._currentScreen = 'overview';
      this.updateCurrentGames();
    }
  }

  updateCurrentGames() {
    this._loading.games = true;
    const promises: [Promise<LCurrentGame[]>, Promise<LUser>, Promise<LTimerState>] = [
      this.api.getCurrentGames(),
      this.api.getUserInfo(),
      this.api.getTimerState()
    ];
    Promise.all(promises).then(([games, playerInfo, timerState]) => {
      this._currentPlayerDisplayName = playerInfo.displayName;
      this._currentPlayerId = playerInfo.id;
      if (games.length > 0) {
        // TODO: what if games > 1 ? Now it takes first one
        this._currentSessionHash = games[0].hashcode;
        this._players = games[0].players;
        for (let p of this._players) {
          this._mapIdToPlayer[p.id] = p;
        }

        this._timeRemaining = timerState.timeRemaining;
        this.updateOverview();
      }

      this._loading.games = false;
    });
  }

  updateOverview(onReady: (finished?: boolean) => void = (finished) => { }) {
    if (!this._currentSessionHash) {
      return;
    }
    this._loading.overview = true;
    this.api.getGameOverview(this._currentSessionHash)
      .then((overview) => {
        if (overview.state.finished) {
          this._reset();
          this._loading.overview = false;
          this._currentScreen = 'lastResults';
          onReady(true);
          return;
        }

        this._currentRound = overview.state.round;
        this._riichiOnTable = overview.state.riichi;
        this._honba = overview.state.honba;
        this._players.forEach((player) => player.score = overview.state.scores[player.id]);

        // explicitly change reference to trigger rerender
        this._players = [this._players[0], this._players[1], this._players[2], this._players[3]];
        this._loading.overview = false;
        onReady();
      })
      .catch((error: RemoteError) => {
        this._loading.overview = false;
        if (error.code === 404) { // TODO on backend
          this._reset();
          onReady(true);
        } else {
          onReady();
        }
      });
  }

  _reset() {
    this._currentScreen = 'overview';
    this._currentRound = 1;
    this._currentOutcome = null;
    this._players = null;
    this._mapIdToPlayer = {};
    this._riichiOnTable = 0;
    this._honba = 0;
    this._currentSessionHash = null;
  }

  playerName() {
    return this._currentPlayerDisplayName;
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

  setDora(dora: number) {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'tsumo':
        this._currentOutcome.dora = dora;
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
        // Don't send fu to the server for limit hands
        let fu: number = this._currentOutcome.fu;
        let han: number = this.getHan() + this.getDora();
        if (han >= 5) {
          fu = 0;
        }
        return fu;
      case 'multiron':
      // TODO
      default:
        return 0;
    }
  }

  getDora() {
    switch (this._currentOutcome.selectedOutcome) {
      case 'ron':
      case 'tsumo':
        return this._currentOutcome.dora;
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
  decrementTimer() {
    this._timeRemaining--;
  }
  getCurrentPlayerId() {
    return this._currentPlayerId;
  }
  getTournamentTitle() {
    return 'Быстрый сброс-2017';
  }

  newGame() {
    switch (this._currentScreen) {
      case 'overview':
        this._currentScreen = 'newGame';
        break;
      default: ;
    }
  }

  showLastResults() {
    switch (this._currentScreen) {
      case 'overview':
        this._currentScreen = 'lastResults';
        break;
      default: ;
    }
  }

  nextScreen() {
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
      case 'lastResults':
      case 'confirmation':
        this._currentScreen = 'overview';
        break;
      default: ;
    }
  }

  prevScreen() {
    switch (this._currentScreen) {
      case 'outcomeSelect':
      case 'newGame':
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
