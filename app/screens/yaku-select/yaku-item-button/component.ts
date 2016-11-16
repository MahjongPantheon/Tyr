import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Yaku } from '../../../interfaces/common';

@Component({
  selector: 'yaku-item-button',
  template: `
    <button (click)="yakuClick()" [class.pressed]="pressed">{{yaku.name}}</button>
  `,
  styleUrls: ['app/screens/yaku-select/yaku-item-button/style.css']
})
export class YakuItemButtonComponent {
  @Input() yaku: Yaku;
  @Input() pressed: boolean;
  @Output() onClick = new EventEmitter<Yaku>();
  yakuClick() {
    this.onClick.emit(this.yaku);
  }
}
