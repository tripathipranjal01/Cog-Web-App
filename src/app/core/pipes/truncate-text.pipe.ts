import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncateText' })
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, limit = 15, suffix = ' ...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;

    return value.substring(0, limit) + suffix;
  }
}
