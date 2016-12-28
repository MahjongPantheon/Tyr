import { Component, Input } from '@angular/core';
import { Player } from '../../interfaces/common';
import { AppState } from '../../primitives/appstate';
import { RAddRoundDryRun } from '../../interfaces/remote';

export type PaymentInfo = {
  backward: boolean;
  title: string;
};

@Component({
  selector: 'confirmation-scheme',
  templateUrl: 'template.svg.html',
  styleUrls: ['style.css']
})
export class ConfirmationSchemeComponent {
  @Input() state: AppState;
  @Input() overview: RAddRoundDryRun;

  get round(): number {
    return this.state.getCurrentRound();
  }

  self: Player;
  shimocha: Player;
  toimen: Player;
  kamicha: Player;
  seatSelf: string;
  seatShimocha: string;
  seatToimen: string;
  seatKamicha: string;

  shimochaChombo: boolean = false;
  toimenChombo: boolean = false;
  kamichaChombo: boolean = false;
  selfChombo: boolean = false;

  shimochaRiichi: boolean = false;
  toimenRiichi: boolean = false;
  kamichaRiichi: boolean = false;
  selfRiichi: boolean = false;

  topLeftPayment?: PaymentInfo;
  topRightPayment?: PaymentInfo;
  topBottomPayment?: PaymentInfo;
  bottomLeftPayment?: PaymentInfo;
  bottomRightPayment?: PaymentInfo;
  leftRightPayment?: PaymentInfo;
  noPayments: boolean = true;

  ngOnInit() {
    let seating = ['東', '南', '西', '北'];
    for (let i = 1; i < this.state.getCurrentRound(); i++) {
      seating = [seating.pop()].concat(seating);
    }

    let players: Player[] = [].concat(this.state.getPlayers());
    const current = this.state.getCurrentPlayerId();

    for (var roundOffset = 0; roundOffset < 4; roundOffset++) {
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

    this.updatePayments(roundOffset);

    // update riichi
    this.state.getRiichiUsers().map((p: Player) => {
      if (this.self.id === p.id) {
        this.selfRiichi = true;
      }
      if (this.toimen.id === p.id) {
        this.toimenRiichi = true;
      }
      if (this.shimocha.id === p.id) {
        this.shimochaRiichi = true;
      }
      if (this.kamicha.id === p.id) {
        this.kamichaRiichi = true;
      }
    });

    // update chombo
    if (this.state.getOutcome() === 'chombo') {
      switch (this.state.getLosingUsers()[0].id) {
        case this.self.id:
          this.selfChombo = true;
          break;
        case this.kamicha.id:
          this.kamichaChombo = true;
          break;
        case this.toimen.id:
          this.toimenChombo = true;
          break;
        case this.shimocha.id:
          this.shimochaChombo = true;
          break;
      }
    }
  }

  _getPayment(player1: Player, player2: Player) {
    const p = this.overview.payments;
    const directPayment12 = p.direct && p.direct[player2.id + '<-' + player1.id] || 0;
    const directPayment21 = p.direct && p.direct[player1.id + '<-' + player2.id] || 0;
    const riichiPayment12 = p.riichi && p.riichi[player2.id + '<-' + player1.id] || 0;
    const riichiPayment21 = p.riichi && p.riichi[player1.id + '<-' + player2.id] || 0;
    const honbaPayment12 = p.honba && p.honba[player2.id + '<-' + player1.id] || 0;
    const honbaPayment21 = p.honba && p.honba[player1.id + '<-' + player2.id] || 0;

    let direction;
    if (directPayment12 + riichiPayment12 > 0) {
      return {
        backward: false,
        title: [directPayment12, honbaPayment12, riichiPayment12 > 0 ? 'R' : 0]
          .filter(e => !!e)
          .join(' + ')
      };
    } else if (directPayment21 + riichiPayment21 > 0) {
      return {
        backward: true,
        title: [directPayment21, honbaPayment21, riichiPayment21 > 0 ? 'R' : 0]
          .filter(e => !!e)
          .join(' + ')
      };
    } else {
      return null;
    }
  }

  updatePayments(offset) {
    this.topLeftPayment = this._getPayment(this.toimen, this.kamicha);
    this.topRightPayment = this._getPayment(this.toimen, this.shimocha);
    this.topBottomPayment = this._getPayment(this.toimen, this.self);
    this.bottomLeftPayment = this._getPayment(this.self, this.kamicha);
    this.bottomRightPayment = this._getPayment(this.self, this.shimocha);
    this.leftRightPayment = this._getPayment(this.kamicha, this.shimocha);
    this.noPayments
      = !this.topLeftPayment
      && !this.topRightPayment
      && !this.topBottomPayment
      && !this.bottomLeftPayment
      && !this.bottomLeftPayment
      && !this.leftRightPayment
      ;
  }
}
