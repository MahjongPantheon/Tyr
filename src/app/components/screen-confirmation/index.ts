import { Component, Input } from '@angular/core';
import { Yaku, Player } from '../../interfaces/common';
import { YakuId, yakuMap, sortByViewPriority } from '../../primitives/yaku';
import { AppState } from '../../primitives/appstate';
import { RAddRoundDryRun } from '../../interfaces/remote';
import { RiichiApiService } from '../../services/riichiApi';
import { RemoteError } from '../../services/remoteError';

@Component({
  selector: 'screen-confirmation',
  templateUrl: 'template.html',
  styleUrls: ['style.css']
})
export class ConfirmationScreen {
  @Input() state: AppState;
  private _dataReady: boolean;
  private _data: RAddRoundDryRun;
  private confirmed: boolean = false;
  private _error: string = '';

  constructor(private api: RiichiApiService) { }

  ngOnInit() {
    this._error = '';
    this._dataReady = false;
    this.api.getChangesOverview(this.state)
      .then((overview) => {
        this._data = overview;
        this._dataReady = true;
      })
      .catch((e) => this.onerror(e));
  }

  confirm() {
    this._dataReady = false;
    this.api.addRound(this.state)
      .then(() => this.okay())
      .catch((e) => this.onerror(e));
  }

  onerror(e) {
    this._dataReady = true;
    this._error = 'Произошла ошибка при добавлении раунда. Попробуйте еще раз.';
    if (e instanceof RemoteError) {
      if (e.code === 403) {
        this._error = 'Не удалось выполнить действие: авторизация не подтверждена';
      } else {
        this._error = 'Не удалось выполнить действие. Возможно данный раунд уже был внесен кем-то еще?';
      }
    }
  }

  okay() {
    this._dataReady = false;
    // when finished, appstate goes to overview screen automatically, no need to go to next
    this.state.updateOverview((finished) => finished ? null : this.state.nextScreen());
  }
}
