import { Component, Input } from '@angular/core';
import { Yaku, Player } from '../../interfaces/common';
import { YakuId, yakuMap, sortByViewPriority } from '../../primitives/yaku';
import { AppState } from '../../primitives/appstate';

@Component({
  selector: 'screen-confirmation',
  templateUrl: 'template.html',
  styleUrls: ['style.css']
})
export class ConfirmationScreen {
  @Input() state: AppState;

  get yaku(): Yaku[] {
    return sortByViewPriority(
      this.state
        .getSelectedYaku()
        .map((id) => yakuMap[id])
    );
  }

  get outcome(): string {
    return this.state.getOutcome();
  }

  get round(): number {
    return this.state.getCurrentRound();
  }

  get winner(): Player {
    return this.state.getWinningUsers()[0]; // TODO: multiron
  }

  get loser(): Player {
    return this.state.getLosingUsers()[0];
  }

  get han(): number {
    return this.state.getHan();
  }

  get fu(): number {
    return this.state.getFu();
  }

  get tempai(): Player[] {
    return this.state.getWinningUsers();
  }

  get riichi(): Player[] {
    return this.state.getRiichiUsers();
  }
}
