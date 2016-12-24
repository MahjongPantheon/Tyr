import { Component, NgZone, ApplicationRef } from '@angular/core';
import { AppState } from './primitives/appstate';
import { Outcome } from './interfaces/common';
import { RiichiApiService } from './services/riichiApi';

@Component({
  selector: 'riichi-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private state: AppState;
  constructor(
    private appRef: ApplicationRef,
    private zone: NgZone,
    private api: RiichiApiService
  ) {
    this.state = new AppState(
      this.zone,
      this.api
    );

    window.__state = this.state; // for great debug
    this.state.init();
  }
}
