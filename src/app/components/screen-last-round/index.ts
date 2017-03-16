/*
 * Tyr - Allows online game recording in japanese (riichi) mahjong sessions
 * Copyright (C) 2016 Oleg Klimenko aka ctizen <me@ctizen.net>
 *
 * This file is part of Tyr.
 *
 * Tyr is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Tyr is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Tyr.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, Input } from '@angular/core';
import { Yaku, Player } from '../../interfaces/common';
import { YakuId, yakuMap, sortByViewPriority } from '../../primitives/yaku';
import { AppState } from '../../primitives/appstate';
import { RRoundPaymentsInfo } from '../../interfaces/remote';
import { RiichiApiService } from '../../services/riichiApi';
import { RemoteError } from '../../services/remoteError';

// TODO: допилить для мульти-рона

@Component({
  selector: 'screen-last-round',
  templateUrl: 'template.html',
  styleUrls: ['style.css']
})
export class LastRoundScreen {
  @Input() state: AppState;
  private _dataReady: boolean;
  private _data: RRoundPaymentsInfo;
  private confirmed: boolean = false;
  private _error: string = '';

  constructor(private api: RiichiApiService) { }

  ngOnInit() {
    this._error = '';
    this._dataReady = false;
    this.api.getLastRound()
      .then((overview) => {
        if (overview) {
          this._data = overview;
          this._dataReady = true;
        } else {
          this.onerror(null); // TODO: log it
        }
      })
      .catch((e) => this.onerror(e));
  }

  getWinnerName() {
    return this.state.getPlayers().reduce((acc, curr) => {
      if (acc) {
        return acc;
      }

      if (curr.id === this._data.winner) {
        return curr.displayName;
      }
    }, null);
  }

  getOutcomeName() {
    switch (this._data.outcome) {
      case 'ron': return 'Рон';
      case 'tsumo': return 'Цумо';
      case 'draw': return 'Ничья';
      case 'abort': return 'Абортивная ничья';
      case 'chombo': return 'Чомбо';
      case 'multiron': return this._data.winner.length === 2 ? 'Дабл-рон' : 'Трипл-рон';
    }
  }

  getYakuList(str: string) {
    const yakuIds: YakuId[] = str.split(',').map((y) => parseInt(y, 10));
    const yakuNames: string[] = yakuIds.map((y) => yakuMap[y].name.toLowerCase());
    return yakuNames.join(', ');
  }

  onerror(e) {
    this._dataReady = true;
    this._error = 'Произошла ошибка. Попробуйте еще раз.';
    if (!e) {
      this._error = `Последняя внесенная раздача не найдена.`;
    } else if (e instanceof RemoteError) {
      if (e.code === 403) {
        this._error = 'Не удалось выполнить действие: авторизация не подтверждена';
      } else {
        this._error = 'Не удалось выполнить действие. Ошибка сервера.';
      }
    }
  }
}
