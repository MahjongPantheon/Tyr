import { Component, Input } from '@angular/core';
import { AppState } from '../../primitives/appstate';

@Component({
  selector: 'screen-outcome-select',
  templateUrl: 'template.html',
  styleUrls: ['style.css']
})
export class OutcomeSelectScreen {
  @Input() state: AppState;

  get abortsAllowed() {
    return this.state.getGameConfig('withAbortives');
  }

  get multironAllowed() {
    return !this.state.getGameConfig('withAtamahane');
  }

  select(outcome) {
    this.state.initBlankOutcome(outcome);
    this.state.nextScreen();
  }
}

