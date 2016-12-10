import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-icon',
  template: `
    <img 
      src="assets/{{type}}.svg" 
      [style.width]="resize + 'px'" 
      [style.height]="resize + 'px'"
     />
  `
})
export class CustomIconComponent {
  @Input() type: string;
  @Input() resize: number = 28;
}

