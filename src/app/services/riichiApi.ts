import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { RemoteError } from './remoteError';
import {
  RRound,
  RRoundRon, RRoundTsumo, RRoundDraw, RRoundAbort, RRoundChombo,
  RTimerState, RGameConfig, RSessionOverview, RCurrentGames,
  RUserInfo, RAllPlayersInEvent, RLastResults,
  RAddRoundDryRun
} from '../interfaces/remote';
import {
  LCurrentGame,
  LUser,
  LUserWithScore,
  LTimerState,
  LGameConfig
} from '../interfaces/local';
import {
  currentGamesFormatter,
  formatRoundToRemote,
  userInfoFormatter,
  userListFormatter,
  lastResultsFormatter,
  timerFormatter,
  gameConfigFormatter
} from './formatters';
import { AppState } from '../primitives/appstate';
import 'rxjs/add/operator/toPromise';

const API_URL = 'http://api.furiten.ru/';

@Injectable()
export class RiichiApiService {
  private _authToken: string = null;
  constructor(private http: Http) { }
  setCredentials(token: string) {
    this._authToken = token;
  }

  // TODO: formatters

  // returns game hashcode
  startGame(playerIds: number[]) {
    return this._jsonRpcRequest<string>('startGameT', playerIds);
  }

  getGameConfig() {
    return this._jsonRpcRequest<RGameConfig>('getGameConfigT')
      .then<LGameConfig>(gameConfigFormatter);
  }

  getTimerState() {
    return this._jsonRpcRequest<RTimerState>('getTimerStateT')
      .then<LTimerState>(timerFormatter);
  }

  getLastResults() {
    return this._jsonRpcRequest<RLastResults>('getLastResultsT')
      .then<LUserWithScore[]>(lastResultsFormatter);
  }

  getAllPlayers() {
    return this._jsonRpcRequest<RAllPlayersInEvent>('getAllPlayersT')
      .then<LUser[]>(userListFormatter);
  }

  getGameOverview(sessionHashcode: string) {
    return this._jsonRpcRequest<RSessionOverview>('getGameOverview', sessionHashcode);
  }

  getCurrentGames(): Promise<LCurrentGame[]> {
    return this._jsonRpcRequest<RCurrentGames>('getCurrentGamesT')
      .then<LCurrentGame[]>(currentGamesFormatter);
  }

  getUserInfo() {
    return this._jsonRpcRequest<RUserInfo>('getPlayerT')
      .then<LUser>(userInfoFormatter);
  }

  confirmRegistration(pin: string) {
    return this._jsonRpcRequest<string>('registerPlayer', pin);
  }

  getChangesOverview(state: AppState) {
    const gameHashcode: string = state.getHashcode();
    const roundData = formatRoundToRemote(state);
    return this._jsonRpcRequest<RAddRoundDryRun>('addRound', gameHashcode, roundData, true);
  }

  getLastRound() {
    return this._jsonRpcRequest<RAddRoundDryRun>('getLastRoundT');
  }

  addRound(state: AppState) {
    const gameHashcode: string = state.getHashcode();
    const roundData = formatRoundToRemote(state);
    return this._jsonRpcRequest<boolean>('addRound', gameHashcode, roundData, false);
  }

  /////////////////////////////////////////////////////////////////////////////////////

  private _jsonRpcRequest<RET_TYPE>(methodName: string, ...params: any[]): Promise<RET_TYPE> {
    const commonHeaders = new Headers({
      'Content-type': 'application/json',
      'X-Auth-Token': this._authToken
    });
    const jsonRpcBody = {
      jsonrpc: "2.0",
      method: methodName,
      params: params,
      id: Math.round(1000000 * Math.random()) // TODO: bind request to response?
    };

    return this.http
      .post(API_URL, jsonRpcBody, { headers: commonHeaders })
      .toPromise()
      .then<RET_TYPE>((response) => {
        const json = response.json();
        if (json.error) {
          throw new RemoteError(json.error.message, json.error.code);
        }

        return json.result; // TODO: runtime checks of object structure
      });
  }
}
