import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fn',
})
export class FnPipe implements PipeTransform {

  transform(value: unknown, fn: Function): string {
    return fn(value);
  }

}
