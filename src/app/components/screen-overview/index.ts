import { Component, Input } from '@angular/core';
import { AppState } from '../../primitives/appstate';
import { Player } from '../../interfaces/common';

@Component({
  selector: 'screen-overview',
  templateUrl: 'template.html',
  styleUrls: ['style.css']
})
export class OverviewScreen {
  @Input() state: AppState;
  @Input() players: [Player, Player, Player, Player];
  @Input('loading') _loading: boolean;
  @Input() currentGameHash: string;
  @Input() currentRound: number;

  self: Player;
  shimocha: Player;
  toimen: Player;
  kamicha: Player;

  seatSelf: string;
  seatShimocha: string;
  seatToimen: string;
  seatKamicha: string;

  _diffedBy: string = null;

  getScore(who) {
    let score = this[who].score;
    if (!this._diffedBy) {
      return score;
    }

    if (this._diffedBy && this._diffedBy !== who) {
      score -= this[this._diffedBy].score;
    }
    return (score > 0 && this._diffedBy !== who) ? '+' + score : score;
  }

  get timeRemaining() {
    let min = Math.floor(this.state.getTimeRemaining() / 60);
    let sec = this.state.getTimeRemaining() % 60;
    return min.toString() + ':' + (
      (sec < 10) ? ("0" + sec.toString()) : sec.toString()
    );
  }

  get redZone() {
    return (this.state.getTimeRemaining() < 10 * 60);
  }

  get showNewGame(): boolean {
    return this.state.getGameConfig('autoSeating');
  }

  get showStatButton(): boolean {
    return !!this.state.getGameConfig('eventStatHost');
  }

  newGame() {
    this.state.newGame();
  }

  lastResults() {
    this.state.showLastResults();
  }

  gotoStat() {
    window.open(`http://${this.state.getGameConfig('eventStatHost')}/last/`);
  }

  reloadOverview() {
    this.state.updateCurrentGames();
  }

  playerClick(who: string) {
    if (this._diffedBy === who) {
      this._diffedBy = null;
    } else {
      this._diffedBy = who;
    }
  }

  ngOnChanges() {
    if (!this.players || this.players.length !== 4) {
      return;
    }

    let players: Player[] = [].concat(this.players);
    let seating = ['東', '南', '西', '北'];
    for (let i = 1; i < this.currentRound; i++) {
      seating = [seating.pop()].concat(seating);
    }

    const current = this.state.getCurrentPlayerId();
    for (let i = 0; i < 4; i++) {
      if (players[0].id === current) {
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
}


