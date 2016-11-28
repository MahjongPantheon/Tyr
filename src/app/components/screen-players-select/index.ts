import { Component, Input } from '@angular/core';
import { Outcome, Player } from '../../interfaces/common';
import { AppState } from '../../primitives/appstate';

@Component({
  selector: 'screen-players-select',
  templateUrl: 'template.html',
  styleUrls: ['style.css']
})
export class PlayersSelectScreen {
  @Input() state: AppState;
  outcome() {
    return this.state.getOutcome();
  }

  self: Player;
  shimocha: Player;
  toimen: Player;
  kamicha: Player;

  seatSelf: string;
  seatShimocha: string;
  seatToimen: string;
  seatKamicha: string;

  ngOnInit() {
    let players: Player[] = [].concat(this.state.getPlayers());
    let seating = ['東', '南', '西', '北'];

    const current = this.state.getCurrentPlayerId();

    for (let i = 0; i < 4; i++) {
      if (players[i].id === current) {
        break;
      }

      players = players.slice(1).concat(players[0]);
      seating = seating.slice(1).concat(seating[0]);
    }

    this.self = players[0];
    this.shimocha = players[1];
    this.toimen = players[2];
    this.kamicha = players[3];

    this.seatSelf = seating[0];
    this.seatShimocha = seating[1];
    this.seatToimen = seating[2];
    this.seatKamicha = seating[3];
  }

  handle([player, what]: [Player, 'win' | 'lose' | 'riichi']) {
    switch (what) {
      case 'win':
        this.state.toggleWinner(player);
        break;
      case 'lose':
        this.state.toggleLoser(player);
        break;
      case 'riichi':
        this.state.toggleRiichi(player);
        break;
    }
  }

  nextScreen() {
    this.state.nextScreen();
  }

  mayGoNext() {
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
  }
}

