import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Thumbnail pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'thumbnail'
})
@Injectable()
export class Thumbnail {
  
  transform(value: String, args?: String): String {
    // Create suffix '-tn000.png'
    let suffix = '-tn';
    switch(args) {
      case 'small':
        suffix += '160';
        break;
      case 'medium':
        suffix += '320';
        break;
      case 'large':
        suffix += '640';
        break;
      default:
        suffix += '160';
    }
    suffix += '.png';
    // Remove file extension (eg: '.jpg') and add suffix 
    return value.substr(0, value.lastIndexOf('.')) + suffix;
  }
}
