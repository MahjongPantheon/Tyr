import { Component } from '@angular/core';
import { AppState } from './primitives/appstate';
import { Outcome } from './interfaces/common';

@Component({
  selector: 'riichi-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private state: AppState = new AppState();

  selectOutcome(type: Outcome) {

  }

  updateHandValue([han, fu]) {
    this.state.setHan(han);
    this.state.setFu(fu); // TODO: what about overriding?
  }

  updateFu(fu) {
    this.state.setFu(fu);
  }
}
