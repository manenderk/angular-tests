import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToArray'
})
export class NumberToArrayPipe implements PipeTransform {
  transform(value: number): any {
    const iterable = {} as Iterable<any>;
    iterable[Symbol.iterator] = function*() {
      let n = 0;
      while (n < value) {
        yield ++n;
      }
    };
    return iterable;
  }
}
