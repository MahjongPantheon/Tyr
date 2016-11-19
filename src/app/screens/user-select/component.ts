import { Component } from '@angular/core';
import { Outcome } from '../../interfaces/common';

@Component({
  selector: 'user-select',
  templateUrl: 'template.html',
  styleUrls: ['style.css']
})
export class UserSelectComponent {
  public outcome: Outcome = 'ron';
}

