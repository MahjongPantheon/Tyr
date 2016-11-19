import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Yaku } from '../../interfaces/common';
import { yakuGroups, yakumanGroups, yakuRareGroups } from '../../primitives/yaku';
import { throttle } from 'lodash';

@Component({
  selector: 'yaku-select',
  templateUrl: 'app/screens/yaku-select/template.html',
  styleUrls: ['app/screens/yaku-select/style.css']
})
export class YakuSelectComponent {
  @ViewChild('scroller') scroller: ElementRef;
  @ViewChildren('scrlink') links: QueryList<ElementRef>;
  yakuList: { anchor: string; groups: Yaku[][] }[];
  selectedYaku: { [key: number]: boolean } = {};
  private _simpleLink: HTMLAnchorElement;
  private _rareLink: HTMLAnchorElement;
  private _yakumanLink: HTMLAnchorElement;
  selectedSimple: boolean = true;
  selectedRare: boolean = false;
  selectedYakuman: boolean = false;

  constructor() {
    this.yakuList = [
      { anchor: 'simple', groups: yakuGroups },
      { anchor: 'rare', groups: yakuRareGroups },
      { anchor: 'yakuman', groups: yakumanGroups }
    ];
  }

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
    if (Math.abs(this.scroller.nativeElement.scrollTop - this._simpleLink.offsetTop) < 50) {
      this.selectedRare = this.selectedYakuman = false;
      this.selectedSimple = true;
    }
    if (Math.abs(this.scroller.nativeElement.scrollTop - this._rareLink.offsetTop) < 50) {
      this.selectedSimple = this.selectedYakuman = false;
      this.selectedRare = true;
    }
    if (Math.abs(this.scroller.nativeElement.scrollTop - this._yakumanLink.offsetTop) < 50) {
      this.selectedRare = this.selectedSimple = false;
      this.selectedYakuman = true;
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

  yakuSelect(evt) {
    this.selectedYaku[evt.id] = !this.selectedYaku[evt.id];
  }
}

