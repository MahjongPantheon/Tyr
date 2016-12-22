import { Component, Input } from '@angular/core';
import { AppState } from '../../primitives/appstate';
import { RiichiApiService } from '../../services/riichiApi';
import { Player } from '../../interfaces/common';

@Component({
  selector: 'screen-last-results',
  templateUrl: 'template.html',
  styleUrls: ['style.css']
})
export class LastResultsScreen {
  @Input() state: AppState;
  @Input() api: RiichiApiService;

  private _loading: boolean = true;

  self: Player;
  shimocha: Player;
  toimen: Player;
  kamicha: Player;

  ngOnInit() {
    this.api.getLastResults(
      this.state.getCurrentPlayerId(),
      this.state.getEventId()
    ).then((results) => {
      this.self = results[0];
      this.shimocha = results[1];
      this.toimen = results[2];
      this.kamicha = results[3];
      this._loading = false;
    });
  }

  nextScreen() {
    this.state.nextScreen();
  }
}
