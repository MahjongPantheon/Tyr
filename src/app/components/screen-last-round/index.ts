import { Component, Input } from '@angular/core';
import { Yaku, Player } from '../../interfaces/common';
import { YakuId, yakuMap, sortByViewPriority } from '../../primitives/yaku';
import { AppState } from '../../primitives/appstate';
import { RAddRoundDryRun } from '../../interfaces/remote';
import { RiichiApiService } from '../../services/riichiApi';
import { RemoteError } from '../../services/remoteError';

@Component({
  selector: 'screen-last-round',
  templateUrl: 'template.html',
  styleUrls: ['style.css']
})
export class LastRoundScreen {
  @Input() state: AppState;
  private _dataReady: boolean;
  private _data: RAddRoundDryRun;
  private confirmed: boolean = false;
  private _error: string = '';

  constructor(private api: RiichiApiService) { }

  ngOnInit() {
    this._error = '';
    this._dataReady = false;
    this.api.getLastRound()
      .then((overview) => {
        if (overview) {
          this._data = overview;
          this._dataReady = true;
        } else {
          this.onerror(null); // TODO: log it
        }
      })
      .catch((e) => this.onerror(e));
  }

  onerror(e) {
    this._dataReady = true;
    this._error = 'Произошла ошибка. Попробуйте еще раз.';
    if (e instanceof RemoteError) {
      if (e.code === 403) {
        this._error = 'Не удалось выполнить действие: авторизация не подтверждена';
      } else {
        this._error = 'Не удалось выполнить действие. Ошибка сервера.';
      }
    }
  }
}
