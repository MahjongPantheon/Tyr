import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../interfaces/common';
import { AppState } from '../../primitives/appstate';

@Component({
  selector: 'user-item',
  templateUrl: 'template.html',
  styleUrls: ['style.css']
})

export class UserItemComponent {
  @Input() state: AppState;
  @Input() userData: Player;
  @Input() seat: string;

  @Output() onEvent = new EventEmitter<[Player, 'win' | 'lose' | 'riichi']>();

  // helpers
  showWinButton = () => -1 !== ['ron', 'multiron', 'tsumo', 'draw']
    .indexOf(this.state.getOutcome());

  showLoseButton = () => -1 !== ['ron', 'multiron', 'chombo']
    .indexOf(this.state.getOutcome());

  showRiichiButton = () => -1 !== ['ron', 'multiron', 'tsumo', 'abort', 'draw']
    .indexOf(this.state.getOutcome());

  winPressed = () => -1 !== this.state.getWinningUsers()
    .indexOf(this.userData);

  losePressed = () => -1 !== this.state.getLosingUsers()
    .indexOf(this.userData);

  riichiPressed = () => -1 !== this.state.getRiichiUsers()
    .indexOf(this.userData);

  winDisabled = () => {
    if (this.state.getOutcome() === 'draw') {
      return false;
    }
    if (this.state.getOutcome() === 'multiron') {
      // TODO: disable if this player is loser?
    }

    // for ron/tsumo winner is only one
    return (
      this.state.getWinningUsers().length > 0
      && -1 === this.state.getWinningUsers().indexOf(this.userData)
    ) || -1 !== this.state.getLosingUsers().indexOf(this.userData); // and it should not be current loser
  }

  // for ron/multiron/chombo - loser is only one
  loseDisabled = () => {
    return (
      this.state.getLosingUsers().length > 0
      && -1 === this.state.getLosingUsers().indexOf(this.userData)
    ) || -1 !== this.state.getWinningUsers().indexOf(this.userData); // and it should not be current winner
  }

  // riichi can't be disabled


  // event handlers
  winClick = () => this.onEvent.emit([this.userData, 'win']);
  loseClick = () => this.onEvent.emit([this.userData, 'lose']);
  riichiClick = () => this.onEvent.emit([this.userData, 'riichi']);
}

