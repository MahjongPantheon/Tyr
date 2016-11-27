import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatRound' })
export class FormatRoundPipe implements PipeTransform {
  transform(value: string | number): string | number {
    const v = parseInt(value.toString(), 10);
    if (v > 12) {
      return '北' + (v - 12);
    }
    if (v > 8) {
      return '西' + (v - 8);
    }
    if (v > 4) {
      return '南' + (v - 4);
    }
    return '東' + v;
  }
}
