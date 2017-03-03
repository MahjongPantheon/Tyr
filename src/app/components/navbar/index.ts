import { Component, Input } from '@angular/core';
import { AppState } from '../../primitives/appstate';

@Component({
  selector: 'nav-bar',
  templateUrl: './template.html',
  styleUrls: ['./style.css']
})
export class NavBarComponent {
  @Input() state: AppState;

  get doraOptions() {
    if (this.state.yakumanInYaku()) {
      return [0];
    }

    if (this.state.getGameConfig('rulesetTitle') === 'jpmlA') {
      // TODO: make withUradora/withKandora config items and use them, not title!
      return [0, 1, 2, 3, 4];
    }

    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  }

  get fuOptions() {
    return this.state.getPossibleFu();
  }

  get selectedFu() {
    return this.state.getFu();
  }

  set selectedFu(fu: any) {
    this.state.setFu(parseInt(fu, 10));
  }

  get selectedDora() {
    return this.state.getDora();
  }

  set selectedDora(dora: any) {
    this.state.setDora(parseInt(dora, 10));
  }

  isMultiron() {
    return this.state.getOutcome() === 'multiron';
  }

  multironTitle() {
    if (this.state.getOutcome() === 'multiron' && this.state.getMultiRonCount() === 3) {
      return 'Трипл-рон';
    }
    if (this.state.getOutcome() === 'multiron' && this.state.getMultiRonCount() === 2) {
      return 'Дабл-рон';
    }
  }

  outcome() {
    switch (this.state.getOutcome()) {
      case 'ron':
        return 'Рон';
      case 'multiron':
        return 'Дабл/трипл рон';
      case 'tsumo':
        return 'Цумо';
      case 'draw':
        return 'Ничья';
      case 'abort':
        return 'Пересдача';
      case 'chombo':
        return 'Чомбо';
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
        switch (this.state.getOutcome()) {
          case 'ron':
          case 'tsumo':
            return this.state.getHan() != 0;
          case 'multiron':
            return this.state.getWinningUsers().reduce((acc, user) => {
              return acc && (this.state.getHanOf(user.id) != 0);
            }, true);
        }
        return false;
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

  scrollDown() {
    document.querySelector('.scroller-wrap').scrollTop = document.querySelector('.scroller-wrap').scrollHeight;
  }

  tournamentTitle(): string {
    return this.state.getEventTitle();
  }

  prevScreen() {
    this.state.prevScreen();
  }

  nextScreen() {
    this.state.nextScreen();
  }

  onFuSelect(fu) {
    // TODO: wat?
  }
}
