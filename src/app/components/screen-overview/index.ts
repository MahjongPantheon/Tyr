import { Component, Input } from '@angular/core';
import { AppState } from '../../primitives/appstate';
import { Player } from '../../interfaces/common';
import { RiichiApiService } from '../../services/riichiApi';

@Component({
  selector: 'screen-overview',
  templateUrl: 'template.html',
  styleUrls: ['style.css']
})
export class OverviewScreen {
  @Input() state: AppState;

  self: Player;
  shimocha: Player;
  toimen: Player;
  kamicha: Player;

  seatSelf: string;
  seatShimocha: string;
  seatToimen: string;
  seatKamicha: string;

  playersReady: boolean = false;

  constructor(private api: RiichiApiService) { }

  ngOnInit() {
    this.state.updateOverview();
  }

  private __playersOld;
  ngDoCheck() {
    let players: Player[] = [].concat(this.state.getPlayers());
    if (players.length !== 4 || this.__playersOld === this.state.getPlayers()) {
      return;
    }

    let seating = ['東', '南', '西', '北'];
    for (let i = 1; i < this.state.getCurrentRound(); i++) {
      seating = [seating.pop()].concat(seating);
    }

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

    this.playersReady = true;
    this.__playersOld = this.state.getPlayers();
  }
}


