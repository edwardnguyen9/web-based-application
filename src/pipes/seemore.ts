import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Seemore pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'seemore'
})
@Injectable()
export class Seemore {

  transform(value: String, length) {
    let res = value;
    if (res.length > length)
      if (res.lastIndexOf(' ') === -1) {
        res = value.substring(0, length) + '...';
      } else {
        let concat = value.lastIndexOf(' ', length);
        res = value.substring(0, (concat > length-15) ? concat : length) + '...';
      }
    return res;
  }
}
