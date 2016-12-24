import { Component, Input } from '@angular/core';
import { AppState } from '../../primitives/appstate';
import { RiichiApiService } from '../../services/riichiApi';
import { Player } from '../../interfaces/common';

@Component({
  selector: 'screen-login',
  templateUrl: 'template.html',
  styleUrls: ['style.css']
})
export class LoginScreen {
  @Input() state: AppState;
  @Input() api: RiichiApiService;

  private _loading: boolean = false;
  private _error: boolean = false;

  private _pinOrig: string = '';
  private _pinView: string = '';
  private _timer = null;

  submit() {
    this._loading = true;
    this.api.confirmRegistration(this._pinOrig)
      .then((authToken: string) => {
        this._loading = false;
        window.localStorage.setItem('authToken', authToken);
        this.state.reinit();
      })
      .catch(() => {
        this._loading = false;
        this._error = true;
      });
  }

  press(digit: string) {
    this._error = false;
    if (this._pinOrig.length > 10) {
      return;
    }

    this._pinOrig += digit;
    this._pinView = '*'.repeat(this._pinOrig.length - 1) + digit;
    this._hideSomePinView();
  }

  backspace() {
    this._pinOrig = this._pinOrig.slice(0, this._pinOrig.length - 1);
    this._pinView = '*'.repeat(this._pinOrig.length);
  }

  _hideSomePinView() {
    if (this._timer) {
      clearTimeout(this._timer);
    }

    this._timer = setTimeout(() => {
      this._pinView = '*'.repeat(this._pinOrig.length);
    }, 700);
  }
}
