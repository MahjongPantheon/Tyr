import { Component } from '@angular/core';

@Component({
  selector: 'riichi-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  updateHandValue([han, fu]) {
    // update value in nav bar TODO
  }
}
