import { Component, Input } from '@angular/core';
import { Yaku, Player } from '../../interfaces/common';
import { YakuId, yakuMap, sortByViewPriority } from '../../primitives/yaku';
import { AppState } from '../../primitives/appstate';
import { RAddRoundDryRun } from '../../interfaces/remote';
import { RiichiApiService } from '../../services/riichiApi';

type PaymentInfo = {
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

  topLeftPayment?: PaymentInfo;
  topRightPayment?: PaymentInfo;
  topBottomPayment?: PaymentInfo;
  bottomLeftPayment?: PaymentInfo;
  bottomRightPayment?: PaymentInfo;
  leftRightPayment?: PaymentInfo;
  noPayments: boolean = true;

  ngOnInit() {
    let seating = ['東', '南', '西', '北'];
    let players: Player[] = [].concat(this.state.getPlayers());
    const current = this.state.getCurrentPlayerId();

    for (var roundOffset = 0; roundOffset < 4; roundOffset++) {
      if (players[roundOffset].id === current) {
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
  }

  _getPayment(player1: Player, player2: Player) {
    const directPayment12 = this.overview.payments.direct[player2.id + '<-' + player1.id] || 0;
    const directPayment21 = this.overview.payments.direct[player1.id + '<-' + player2.id] || 0;
    const riichiPayment12 = this.overview.payments.riichi[player2.id + '<-' + player1.id] || 0;
    const riichiPayment21 = this.overview.payments.riichi[player1.id + '<-' + player2.id] || 0;

    let direction;
    if (directPayment12 + riichiPayment12 > 0) {
      return {
        backward: false,
        title: [directPayment12, riichiPayment12 > 0 ? 'R' : 0]
          .filter(e => !!e)
          .join(' + ')
      };
    } else if (directPayment21 + riichiPayment21 > 0) {
      return {
        backward: true,
        title: [directPayment21, riichiPayment21 > 0 ? 'R' : 0]
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
