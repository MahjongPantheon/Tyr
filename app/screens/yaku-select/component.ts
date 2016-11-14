import { Component } from '@angular/core';
import { Yaku } from '../../interfaces/common';
import { yakuList } from '../../primitives/yaku';

@Component({
  selector: 'yaku-select',
  templateUrl: 'app/screens/yaku-select/template.html',
  styleUrls: ['app/screens/yaku-select/style.css']
})
export class YakuSelectComponent {
  showYakumans: boolean = false;
  yakuList: Yaku[] = [];

  constructor() {
    this.updateList();
  }

  toggleYakumans() {
    this.showYakumans = !this.showYakumans;
    this.updateList();
  }

  updateList() {
    this.yakuList = yakuList
      .filter((y: Yaku) => y.yakuman === this.showYakumans);
  }

  yakuSelect(evt) {
    console.log(evt);
  }
}

