import { Component, Input } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './template.html',
  styleUrls: ['./style.css']
})
export class NavBarComponent {
  private fuOptions = [/*20, 25, */30, 40, 50, 60, 70, 80, 90, 100, 110];
  private selectedFu = 30;
  @Input() han: number = 0;
  @Input() overrideFu: number = -1;
  @Input() isStartScreen: boolean = false;
  @Input() tournamentTitle: string = '';

  onChange(changes) {
    console.log(changes);
  }

  prevScreen() {
    // emit some event for upper app component
  }

  onFuSelect(fu) {

  }
}
