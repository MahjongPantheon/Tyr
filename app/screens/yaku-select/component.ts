import { Component } from '@angular/core';
import { Yaku } from '../../interfaces/common';
import { yakuGroups, yakumanGroups, yakuRareGroups } from '../../primitives/yaku';

@Component({
  selector: 'yaku-select',
  templateUrl: 'app/screens/yaku-select/template.html',
  styleUrls: ['app/screens/yaku-select/style.css']
})
export class YakuSelectComponent {
  showYakumans: boolean = false;
  showSimpleYaku: boolean = true;
  showRareYaku: boolean = false;
  yakuList: Yaku[][] = yakuGroups;
  yakuRareList: Yaku[][] = yakuRareGroups;
  yakumanList: Yaku[][] = yakumanGroups;
  selectedYaku: { [key: number]: boolean } = {};

  showSimple() {
    this.showRareYaku = this.showYakumans = false;
    this.showSimpleYaku = true;
  }

  showRare() {
    this.showSimpleYaku = this.showYakumans = false;
    this.showRareYaku = true;
  }

  showYakuman() {
    this.showRareYaku = this.showSimpleYaku= false;
    this.showYakumans = true;
  }

  yakuSelect(evt) {
    this.selectedYaku[evt.id] = !this.selectedYaku[evt.id];
  }
}

