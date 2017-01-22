export class ASTimer {
  _timeRemaining: number;

  // called from constructor
  initTimer() {
    let timer = setInterval(() => {
      this.decrementTimer();
      if (!this._timeRemaining) {
        clearInterval(timer);
      }
    }, 1000);
  }

  getTimeRemaining() {
    return this._timeRemaining;
  }

  decrementTimer() {
    this._timeRemaining--;
  }
}

