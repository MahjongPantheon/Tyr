import { Component, Input } from '@angular/core';
import { Yaku, Player } from '../../interfaces/common';
import { YakuId, yakuMap, sortByViewPriority } from '../../primitives/yaku';
import { AppState } from '../../primitives/appstate';
import { RAddRoundDryRun } from '../../interfaces/remote';
import { RiichiApiService } from '../../services/riichiApi';

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

  constructor(private api: RiichiApiService) { }

  ngOnInit() {
    this._dataReady = false;
    this.api.getChangesOverview(this.state).then((overview) => {
      this._data = overview;
      this._dataReady = true;
    });
  }

  confirm() {
    this.api.addRound(this.state).then(() => {
      this.state.nextScreen();
    });
  }
}
