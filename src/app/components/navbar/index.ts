import { Component, Input } from '@angular/core';
import { AppState } from '../../primitives/appstate';

@Component({
  selector: 'nav-bar',
  templateUrl: './template.html',
  styleUrls: ['./style.css']
})
export class NavBarComponent {
  @Input() state: AppState;
  private fuOptions = [/*20, 25, */30, 40, 50, 60, 70, 80, 90, 100, 110];
  private selectedFu = 30;

  outcome() {
    switch (this.state.getOutcome()) {
      case 'ron':
      case 'multiron':
        return 'Ron';
      case 'tsumo':
        return 'Tsumo';
      case 'draw':
        return 'Draw';
      case 'abort':
        return 'Abort';
      case 'chombo':
        return 'Chombo';
      default:
        return '';
    }
  }

  showHanFu() {
    return ['ron', 'multiron', 'tsumo']
      .indexOf(this.state.getOutcome()) !== -1;
  }

  han(): number {
    return this.state.getHan();
  }

  overrideFu(): number {
    return this.state.getFu();
  }

  isStartScreen(): boolean {
    return ['overview', 'outcomeSelect', 'playersSelect']
      .indexOf(this.state.currentScreen()) !== -1;
  }

  tournamentTitle(): string {
    return this.state.getTournamentTitle();
  }

  showOnlyOutcome() {
    return this.state.currentScreen() === 'playersSelect';
  }

  prevScreen() {
    this.state.prevScreen();
  }

  onFuSelect(fu) {

  }
}
