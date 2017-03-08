import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'defaultsTo' })
export class DefaultsToPipe implements PipeTransform {
  transform(value: string | number | undefined, defaultValue: string): string | number {
    return value || defaultValue;
  }
}
