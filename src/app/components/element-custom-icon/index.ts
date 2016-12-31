import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { icons } from './icons';

@Component({
  selector: 'custom-icon',
  template: `<i style='display: inline-block'
        [innerHTML]="content"
        [style.width]="resize + 'px'" 
        [style.height]="resize + 'px'"
      ></i>`
})
export class CustomIconComponent {
  @Input() type: string;
  @Input() resize: number = 28;
  content: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.content = this.sanitizer.bypassSecurityTrustHtml(icons[this.type]);
  }
}

