import { Component, Input } from '@angular/core';
import { Outcome } from '../../interfaces/common';

@Component({
  selector: 'user-item',
  templateUrl: 'template.html',
  styleUrls: ['style.css']
})

export class UserItemComponent {
  @Input() outcomeType: Outcome;
  wonPressed: boolean = false;
  lostPressed: boolean = false;
  riichiPressed: boolean = false;

  // helpers
  showWonButton() {
    return -1 !== ['ron', 'doubleron', 'tsumo', 'draw'].indexOf(this.outcomeType);
  }
  showLostButton() {
    return -1 !== ['ron', 'doubleron', 'chombo', 'draw'].indexOf(this.outcomeType);
  }
  showRiichiButton() {
    return -1 !== ['ron', 'doubleron', 'tsumo', 'abort', 'draw'].indexOf(this.outcomeType);
  }

  // event handlers
  wonClick() {
    this.wonPressed = !this.wonPressed;
  }
  lostClick() {
    this.lostPressed = !this.lostPressed;
  }
  riichiClick() {
    this.riichiPressed = !this.riichiPressed;
  }
}

