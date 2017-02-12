import { Component, Input } from '@angular/core';
import { AppState } from '../../primitives/appstate';
import { RiichiApiService } from '../../services/riichiApi';
import { LUser } from '../../interfaces/local';
import { rand } from '../../helpers/rand';

const defaultPlayer: LUser = {
  displayName: '--- ? ---',
  id: -1,
  tenhouId: null,
  ident: null,
  alias: null
};

@Component({
  selector: 'screen-new-game',
  templateUrl: 'template.html',
  styleUrls: ['style.css']
})
export class NewGameScreen {
  @Input() state: AppState;
  @Input() api: RiichiApiService;
  private _loading: boolean = false;

  // These are indexes in _players array
  toimen: number = 0;
  shimocha: number = 0;
  kamicha: number = 0;
  self: number = 0; // Self is always considered east!

  players: LUser[] = [defaultPlayer];
  ngOnInit() {
    this.api.getAllPlayers()
      .then((players) => {
        this.players = [defaultPlayer].concat(
          players.sort((a, b) => {
            if (a == b) {
              return 0;
            }
            return (a.displayName < b.displayName ? -1 : 1);
          })
        );
      });
  }

  playersValid(): boolean {
    if (!this.toimen || !this.shimocha || !this.kamicha || !this.self) {
      return false;
    }

    if (this.toimen === this.kamicha
      || this.toimen === this.shimocha
      || this.toimen === this.self
      || this.kamicha === this.shimocha
      || this.kamicha === this.self
      || this.shimocha === this.self
    ) {
      return false;
    }

    return true;
  }

  /**
   * randomize seating
   */
  randomize() {
    let randomized = rand([
      this.toimen, this.kamicha,
      this.self, this.shimocha
    ]);

    this.toimen = randomized[0];
    this.kamicha = randomized[1];
    this.self = randomized[2];
    this.shimocha = randomized[3];
  }

  startGame() {
    if (!this.playersValid()) {
      return;
    }

    this._loading = true;
    this.api.startGame([
      this.players[this.self].id,
      this.players[this.shimocha].id,
      this.players[this.toimen].id,
      this.players[this.kamicha].id
    ]).then(() => {
      this.state._reset();
      this.state.updateCurrentGames();
    });
  }
}

