import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {
  RRound,
  RRoundRon, RRoundTsumo, RRoundDraw, RRoundAbort, RRoundChombo,
  RTimerState, RGameConfig, RSessionOverview, RCurrentGames,
  RAddRoundDryRun
} from '../interfaces/remote';
import {
  LCurrentGame
} from '../interfaces/local';
import {
  currentGamesFormatter,
  formatRoundToRemote
} from './formatters';
import { AppState } from '../primitives/appstate';
import 'rxjs/add/operator/toPromise';

const API_URL = 'http://api.furiten.ru/';


@Injectable()
export class RiichiApiService {
  constructor(private http: Http) { }

  // TODO: formatters

  // returns game hashcode
  startGame(eventId: number, playerIds: number[]) {
    return this._jsonRpcRequest<string>('startGame', eventId, playerIds);
  }

  getGameConfig(eventId: number) {
    return this._jsonRpcRequest<RGameConfig>('getGameConfig', eventId);
  }

  getTimerState(eventId: number) {
    return this._jsonRpcRequest<RTimerState>('getTimerState', eventId);
  }

  getGameOverview(sessionHashcode: string) {
    return this._jsonRpcRequest<RSessionOverview>('getGameOverview', sessionHashcode);
  }

  getCurrentGames(userId: number, eventId: number): Promise<LCurrentGame[]> {
    return this._jsonRpcRequest<RCurrentGames>('getCurrentGames', userId, eventId)
      .then<LCurrentGame[]>(currentGamesFormatter);
  }

  getUserByIdent(ident: string) {
    // temporary, should be deprecated with auth
    return this._jsonRpcRequest<number>('getPlayerIdByIdent', ident);
  }

  getChangesOverview(state: AppState) {
    const gameHashcode: string = state.getHashcode();
    const roundData = formatRoundToRemote(state);
    return this._jsonRpcRequest<RAddRoundDryRun>('addRound', gameHashcode, roundData, true);
  }

  addRound(state: AppState) {
    const gameHashcode: string = state.getHashcode();
    const roundData = formatRoundToRemote(state);
    return this._jsonRpcRequest<boolean>('addRound', gameHashcode, roundData, false);
  }

  /////////////////////////////////////////////////////////////////////////////////////

  private _jsonRpcRequest<RET_TYPE>(methodName: string, ...params: any[]): Promise<RET_TYPE> {
    const commonHeaders = new Headers({ 'Content-type': 'application/json' });
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
          throw new Error('[REMOTE ' + json.error.code + ']: ' + json.error.message);
        }

        return json.result; // TODO: runtime checks of object structure
      });
  }
}
