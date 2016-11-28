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

  isScreen(...screens: string[]): boolean {
    return screens.indexOf(this.state.currentScreen()) !== -1;
  }

  mayGoNext(screen): boolean {
    switch (screen) {
      case 'yakuSelect':
        return this.state.getHan() != 0;
      case 'playersSelect':
        switch (this.state.getOutcome()) {
          case 'ron':
            return this.state.getWinningUsers().length === 1
              && this.state.getLosingUsers().length === 1;
          case 'tsumo':
            return this.state.getWinningUsers().length === 1;
          case 'draw':
          case 'abort':
            return true;
          case 'multiron':
            return this.state.getWinningUsers().length >= 1
              && this.state.getLosingUsers().length === 1;
          case 'chombo':
            return this.state.getLosingUsers().length === 1;
        }
        break;
      default:
        return true;
    }
  }

  tournamentTitle(): string {
    return this.state.getTournamentTitle();
  }

  prevScreen() {
    this.state.prevScreen();
  }

  nextScreen() {
    this.state.nextScreen();
  }

  onFuSelect(fu) {

  }
}
