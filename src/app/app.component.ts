import { Component, ApplicationRef } from '@angular/core';
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
    private api: RiichiApiService
  ) {
    this.state = new AppState(
      this.appRef,
      this.api
    );

    // TODO: do smth with it
    window.__state = this.state; // for great debug
    window.localStorage.setItem('eventId', '2');

    const userIdent = window.location.pathname.split('/')[1];
    if (userIdent) {
      this.api.getUserByIdent(userIdent)
        .then((id) => {
          window.localStorage.setItem('userId', parseInt(id.toString(), 10).toString());
          this.state.init();
        })
        .catch((err) => {
          window.localStorage.setItem('userId', '-1');
          this.state.init();
        });
    }
  }
}
