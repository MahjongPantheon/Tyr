import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'yakuman' })
export class YakumanPipe implements PipeTransform {
  transform(value: string | number): string | number {
    const v = parseInt(value.toString(), 10);
    if (v < 0) {
      return (v < -1 ? Math.abs(v) : '') + '☠';
    }
    return value;
  }
}
