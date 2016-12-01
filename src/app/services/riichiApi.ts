import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

const API_URL = 'http://api.furiten.ru/';

////////// TODO: get it out of here

interface GameConfig {
  allowedYaku: { [key: string]: number };
  startPoints: number;
  withKazoe: boolean;
  withKiriageMangan: boolean;
  withAbortives: boolean;
  withNagashiMangan: boolean;
}

//////////

@Injectable()
export class RiichiApiService {
  constructor(private http: Http) {

  }

  private _commonHeaders = new Headers({ 'Content-type': 'application/json' });

  getGameConfig(eventId: number) {
    return this._jsonRpcRequest<GameConfig>('getGameConfig', eventId);
  }

  getTimerState(eventId: number) {

  }

  addRound(gameHashcode: string, roundData: any /* TODO */) {

  }

  // TODO: extra api methods required for these:

  getSessionOverview(sessionId: number) {
    // data for overview screen:
    // - seating
    // - scores
    // - user info
    // - current game state (riichi, honba, round index)
  }

  getSessionByUser(userId: number): number {
    // get session in which this user participates
  }

  getUserByName(username: string): number {
    // temporary, will be deprecated with auth
    // get user id by entered name/nickname
  }

  getPayments(gameHashcode: string, roundData: any) {
    // same as AddRound, but without save to DB
    // Aim: check payments before saving round.
  }

  /////////////////////////////////////////////////////////////////////////////////////

  private _jsonRpcRequest<RET_TYPE>(methodName: string, ...params: any[]): Promise<RET_TYPE> {
    const jsonRpcBody = {
      jsonrpc: "2.0",
      method: methodName,
      params: params,
      id: Math.round(1000000 * Math.random()) // TODO: bind request to response?
    };

    return this.http
      .post(API_URL, jsonRpcBody, { headers: this._commonHeaders })
      .toPromise()
      .then<RET_TYPE>((response) => {
        const json = response.json();
        if (json.error) {
          throw new Error(json.error);
        }

        return json.result; // TODO: runtime checks of object structure
      });
  }
}
