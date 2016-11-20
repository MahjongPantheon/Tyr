import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Yaku } from '../../interfaces/common';
import { yakuGroups, yakumanGroups, yakuRareGroups } from './yaku-lists';
import {
  getAllowedYaku,
  addYakuToList
} from '../../primitives/yaku-compat';
import { throttle, keys, pickBy } from 'lodash';

@Component({
  selector: 'yaku-select',
  templateUrl: 'template.html',
  styleUrls: ['style.css']
})
export class YakuSelectComponent {
  yakuList: { anchor: string; groups: Yaku[][] }[];
  selectedYaku: { [key: number]: boolean } = {};
  disabledYaku: { [key: number]: boolean } = {};

  constructor() {
    this.yakuList = [
      { anchor: 'simple', groups: yakuGroups },
      { anchor: 'rare', groups: yakuRareGroups },
      { anchor: 'yakuman', groups: yakumanGroups }
    ];
  }

  yakuSelect(evt) {
    this.selectedYaku[evt.id] = !this.selectedYaku[evt.id];
    this._disableIncompatibleYaku();
  }

  _disableIncompatibleYaku() {
    const selected = keys(pickBy(this.selectedYaku)).map((el) => parseInt(el, 10));
    const allowedYaku = getAllowedYaku(selected);

    this.disabledYaku = {};
    for (let yGroup of this.yakuList) {
      for (let yRow of yGroup.groups) {
        for (let yaku of yRow) {
          if (allowedYaku.indexOf(yaku.id) === -1 && selected.indexOf(yaku.id) === -1) {
            this.disabledYaku[yaku.id] = true;
          }
        }
      }
    }
  }

  // -------------------------------
  // ---- View & scroll related ----
  // -------------------------------
  @ViewChild('scroller') scroller: ElementRef;
  @ViewChildren('scrlink') links: QueryList<ElementRef>;
  private _simpleLink: HTMLAnchorElement;
  private _rareLink: HTMLAnchorElement;
  private _yakumanLink: HTMLAnchorElement;
  selectedSimple: boolean = true;
  selectedRare: boolean = false;
  selectedYakuman: boolean = false;

  updateAfterScroll() {
    throttle(() => this._updateAfterScroll(), 16)();
  }

  private _makeLinks() {
    if (this._simpleLink) {
      return;
    }

    for (let link of this.links.toArray()) {
      switch (link.nativeElement.name) {
        case 'simple':
          this._simpleLink = link.nativeElement;
          break;
        case 'rare':
          this._rareLink = link.nativeElement;
          break;
        case 'yakuman':
          this._yakumanLink = link.nativeElement;
          break;
      }
    }
  }

  private _updateAfterScroll() {
    this._makeLinks();

    if (this.scroller.nativeElement.scrollTop - this._simpleLink.offsetTop < 500) { // highest edge case
      this.selectedRare = this.selectedYakuman = false;
      this.selectedSimple = true;
    } else if (this._yakumanLink.offsetTop - this.scroller.nativeElement.scrollTop < 150) { // lowest edge case
      this.selectedRare = this.selectedSimple = false;
      this.selectedYakuman = true;
    } else { // middle case
      this.selectedSimple = this.selectedYakuman = false;
      this.selectedRare = true;
    }
  }

  showSimple() {
    this._makeLinks();
    this.scroller.nativeElement.scrollTop = this._simpleLink.offsetTop;
  }

  showRare() {
    this._makeLinks();
    this.scroller.nativeElement.scrollTop = this._rareLink.offsetTop;
  }

  showYakuman() {
    this._makeLinks();
    this.scroller.nativeElement.scrollTop = this._yakumanLink.offsetTop;
  }
}

