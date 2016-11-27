import { Component, Input } from '@angular/core';
import { Outcome } from '../../interfaces/common';
import { AppState } from '../../primitives/appstate';

@Component({
  selector: 'screen-players-select',
  templateUrl: 'template.html',
  styleUrls: ['style.css']
})
export class PlayersSelectScreen {
  public outcome: Outcome = 'ron';
  @Input() state: AppState;

}

