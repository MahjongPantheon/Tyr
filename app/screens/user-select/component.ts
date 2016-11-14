import { Component } from '@angular/core';
import { Outcome } from '../../interfaces/common';

@Component({
  selector: 'user-select',
  templateUrl: 'app/screens/user-select/template.html',
  styleUrls: ['app/screens/user-select/style.css']
})
export class UserSelectComponent {
  public outcome: Outcome = 'ron';
}

