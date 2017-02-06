import { Outcome, AppOutcome } from '../../interfaces/app';
import { NgZone } from '@angular/core';
import { getHan, getFixedFu } from '../yaku-values';
import { Outcome as OutcomeType, Player } from '../../interfaces/common';
import { YakuId } from '../yaku';
import { RiichiApiService } from '../../services/riichiApi';
import { RemoteError } from '../../services/remoteError';
import { LCurrentGame, LUser, LTimerState, LWinItem, LGameConfig } from '../../interfaces/local';

type AppScreen = 'overview' | 'outcomeSelect' | 'playersSelect'
  | 'yakuSelect' | 'confirmation' | 'newGame' | 'lastResults' | 'login';
type LoadingSet = { games: boolean, overview: boolean };

// functional modules
import { TimerData, initTimer, getTimeRemaining } from './timer';
import { toggleLoser, toggleWinner, getWinningUsers, getLosingUsers } from './winLoseToggles';
import { toggleRiichi, getRiichiUsers } from './riichiToggle';
import { setHan, getHanOf, setFu, getFuOf, getPossibleFu } from './hanFu';
import { setDora, getDoraOf } from './dora';
import { initBlankOutcome } from './initials';
import { hasYaku, addYaku, removeYaku, getRequiredYaku, getSelectedYaku, getAllowedYaku } from './yaku';

// implementation
export class AppState {
  private _currentScreen: AppScreen = 'overview';
  private _currentSessionHash: string = null;
  private _currentOutcome: AppOutcome = null;
  private _currentRound: number = 1;
  private _currentPlayerDisplayName: string = null;
  private _currentPlayerId: number = null;
  private _players: [Player, Player, Player, Player]; // e-s-w-n
  private _mapIdToPlayer: { [key: number]: Player };
  private _riichiOnTable: number = 0;
  private _honba: number = 0;
  private _multironCurrentWinner: number = null;
  private _isLoggedIn: boolean = false;
  private _gameConfig: LGameConfig;
  private _tableIndex: number = null;
  public isIos: boolean = false;

  // preloaders flags
  private _loading: LoadingSet = {
    games: true,
    overview: false
  };

  constructor(private zone: NgZone, private api: RiichiApiService) {
    this._players = null;
    this._mapIdToPlayer = {};
    this.isIos = !!navigator.userAgent.match(/(iPad|iPhone|iPod)/i);
    initTimer();
  }

  isLoading(...what: string[]) {
    return what.reduce((acc, item) => acc || this._loading[item], false);
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
    // TODO: automate promises creation from mixins
    const promises: [Promise<LCurrentGame[]>, Promise<LUser>, Promise<LGameConfig>, Promise<LTimerState>] = [
      this.api.getCurrentGames(),
      this.api.getUserInfo(),
      this.api.getGameConfig(),
      this.api.getTimerState()
    ];
    Promise.all(promises).then(([games, playerInfo, gameConfig, timerState]) => {
      this._currentPlayerDisplayName = playerInfo.displayName;
      this._currentPlayerId = playerInfo.id;
      this._gameConfig = gameConfig;

      if (games.length > 0) {
        // TODO: what if games > 1 ? Now it takes first one
        this._currentSessionHash = games[0].hashcode;
        this._players = games[0].players;
        for (let p of this._players) {
          this._mapIdToPlayer[p.id] = p;
        }

        initTimer(timerState.timeRemaining);
        this.updateOverview();
      } else {
        // no games! Or game ended just now
        this._reset();
      }

      this._loading.games = false;
    }).catch((e) => {
      if (e.code === 401) { // token has rotten
        window.localStorage.removeItem('authToken');
        this._reset();
        this.reinit();
      }
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
        this._tableIndex = overview.table_index;

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
    this._multironCurrentWinner = null;
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
            this._currentScreen = 'yakuSelect';
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
          case 'multiron':
            this._currentScreen = 'yakuSelect';
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

  getWins(): LWinItem[] {
    switch (this._currentOutcome.selectedOutcome) {
      case 'multiron':
        let wins: LWinItem[] = [];
        for (let i in this._currentOutcome.wins) {
          let v = this._currentOutcome.wins[i];
          wins.push({
            winner: v.winner,
            han: v.han,
            fu: v.fu,
            dora: v.dora,
            uradora: 0,
            kandora: 0,
            kanuradora: 0,
            yaku: v.yaku
          });
        }
        return wins;
      default:
        return [];
    }
  }

  getMultiRonCount() {
    switch (this._currentOutcome.selectedOutcome) {
      case 'multiron':
        return this._currentOutcome.multiRon;
      default:
        return 0;
    }
  }

  selectMultiRonUser(playerId: number) {
    if (this._currentOutcome.selectedOutcome !== 'multiron') {
      return;
    }
    this._multironCurrentWinner = playerId;
  }
  getCurrentMultiRonUser = () => this._multironCurrentWinner;
  getEventTitle = () => this._gameConfig && this._gameConfig.eventTitle || 'Loading...';
  getGameConfig = (key) => this._gameConfig && this._gameConfig[key]; // TODO: add keyof: LGameConfig to arg when ts 2.1.5 is shipped
  getTableIndex = () => this._tableIndex;
  playerName = () => this._currentPlayerDisplayName;
  currentScreen = () => this._currentScreen;
  getOutcome = () => this._currentOutcome && this._currentOutcome.selectedOutcome;
  getHashcode = () => this._currentSessionHash;
  toggleWinner = (p: Player) => toggleWinner(p, this._currentOutcome);
  toggleLoser = (p: Player) => toggleLoser(p, this._currentOutcome);
  toggleRiichi = (p: Player) => toggleRiichi(p, this._currentOutcome, (y: YakuId) => this.removeYaku(y));
  getWinningUsers = () => getWinningUsers(this._currentOutcome, this._mapIdToPlayer);
  getLosingUsers = () => getLosingUsers(this._currentOutcome, this._mapIdToPlayer);
  getRiichiUsers = () => getRiichiUsers(this._currentOutcome, this._mapIdToPlayer);
  setHan = (han: number) => setHan(han, this._currentOutcome, this._multironCurrentWinner);
  setFu = (fu: number) => setFu(fu, this._currentOutcome, this._multironCurrentWinner);
  getHan = () => getHanOf(this._multironCurrentWinner, this._currentOutcome);
  getHanOf = (user: number) => getHanOf(user, this._currentOutcome);
  getFu = () => getFuOf(this._multironCurrentWinner, this._currentOutcome);
  getFuOf = (user: number) => getFuOf(user, this._currentOutcome);
  getPossibleFu = () => getPossibleFu(this._currentOutcome, this._multironCurrentWinner);
  setDora = (dora: number) => setDora(dora, this._currentOutcome, this._multironCurrentWinner);
  getDora = () => getDoraOf(this._multironCurrentWinner, this._currentOutcome);
  getDoraOf = (user: number) => getDoraOf(user, this._currentOutcome);
  getUradora = () => 0; // TODO
  getKandora = () => 0; // TODO
  getKanuradora = () => 0; // TODO 
  getPlayers = (): Player[] => this._players;
  getRiichi = () => this._riichiOnTable;
  getHonba = () => this._honba;
  getCurrentRound = () => this._currentRound;
  getCurrentPlayerId = () => this._currentPlayerId;
  initBlankOutcome = (outcome: OutcomeType) => this._currentOutcome = initBlankOutcome(this._currentRound, outcome);
  hasYaku = (id: YakuId) => hasYaku(this._currentOutcome, id, this._multironCurrentWinner);
  getRequiredYaku = () => getRequiredYaku(this._currentOutcome, this._multironCurrentWinner);
  getSelectedYaku = () => getSelectedYaku(this._currentOutcome, this._multironCurrentWinner);
  addYaku = (id: YakuId, bypassChecks: boolean = false): void => addYaku(this._currentOutcome, id, this._multironCurrentWinner, bypassChecks);
  removeYaku = (id: YakuId): void => removeYaku(this._currentOutcome, id, this._multironCurrentWinner);
  getAllowedYaku = (): YakuId[] => getAllowedYaku(this._currentOutcome, this._multironCurrentWinner);
  getTimeRemaining = () => getTimeRemaining();
}
