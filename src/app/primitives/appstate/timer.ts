export interface TimerData {
  timeRemaining: number;
  lastUpdateTimeRemaining: number;
  lastUpdateTimestamp: number;
}

// module-level singleton vars
let timerData: TimerData;
const now = () => Math.round((new Date()).getTime() / 1000);

export function initTimer(timeRemaining?: number) {
  timerData = {
    timeRemaining: timeRemaining || 0,
    lastUpdateTimeRemaining: timeRemaining || 0,
    lastUpdateTimestamp: now()
  };

  let timer = setInterval(() => {
    // Calc delta to support mobile suspending with js timers stopping
    let delta = now() - timerData.lastUpdateTimestamp;
    timerData.timeRemaining = timerData.lastUpdateTimeRemaining - delta;
    if (timerData.timeRemaining <= 0) {
      timerData.timeRemaining = 0;
      clearInterval(timer);
    }
  }, 1000);
}

export function getTimeRemaining() {
  return timerData.timeRemaining;
}
