import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Yaku } from '../../interfaces/common';

@Component({
  selector: 'yaku-item-button',
  template: `
    <button 
      (click)="yakuClick()"
      [class.special]="yaku.id < 0"      
      [class.pressed]="pressed"
      [disabled]="disabled"
      >{{yaku.name}}</button>
  `,
  styleUrls: ['style.css']
})
export class YakuItemButtonComponent {
  @Input() yaku: Yaku;
  @Input() pressed: boolean;
  @Input() disabled: boolean;
  @Output() onClick = new EventEmitter<Yaku>();
  yakuClick() {
    this.onClick.emit(this.yaku);
  }
}
