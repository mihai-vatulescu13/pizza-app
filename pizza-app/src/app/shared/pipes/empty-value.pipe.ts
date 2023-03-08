import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyValue',
})
export class EmptyValuePipe implements PipeTransform {
  transform(
    value: null | undefined | string | number
  ): null | undefined | string | number {
    if (value === '' || value === null || value === undefined) {
      return '-';
    }
    return value;
  }
}
