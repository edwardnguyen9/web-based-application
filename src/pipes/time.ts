import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Time pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'time'
})
@Injectable()
export class Time {

  transform(value: String) {
    let result: String = '';
    const scale = {
      year: Number.parseInt(value.substring(0, 4)),
      month: Number.parseInt(value.substring(5, 7)) - 1,
      day: Number.parseInt(value.substring(8, 10)),
      hour: Number.parseInt(value.substring(11, 13)),
      minute: Number.parseInt(value.substring(14, 16)),
      second: Number.parseInt(value.substring(17, 19))
    }
    const date = new Date();
    const data = {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth(),
      day: date.getUTCDate(),
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes(),
      second: date.getUTCSeconds()
    }
    if (this.toggleDay(data, scale) > 1 || (this.toggleDay(data, scale) === 1
      && (data.hour > scale.hour || (data.hour === scale.hour
      && (data.minute > scale.minute || (data.minute === scale.minute
      && data.second >= scale.second)))))) {
      result = value.substring(8, 10) + '/' + value.substring(5, 7) + '/' + value.substring(0, 4);
    } else {
      const seconds = ((data.hour - scale.hour + 24) % 24) * 3600 + (data.minute - scale.minute) * 60 + data.second - scale.second;
      if (seconds / 3600 > 2) { result = (seconds - seconds % 3600) / 3600 + ' hours ago'; }
      else if (seconds / 3600 >= 1) { result = 'An hour ago'; }
      else if (seconds % 3600 / 60 > 2) { result = (seconds - seconds % 60) % 3600 / 60 + ' minutes ago'; }
      else if (seconds % 3600 / 60 >= 1) { result = 'About a minute ago'; }
      else result = 'Less than a minute ago';
    }
    return result;
  }

  toggleDay = (data, scale) => {
    return this.dayOfTheYear(data.year, data.month, data.day) - this.dayOfTheYear(scale.year, scale.month, scale.day);
  }

  dayOfTheYear = (y, m, d) => {
    let day = d;
    switch (m) {
      case 11: day += 30;
      case 10: day += 31;
      case 9: day += 30;
      case 8: day += 31;
      case 7: day += 31;
      case 6: day += 30;
      case 5: day += 31;
      case 4: day += 30;
      case 3: day += 31;
      case 2: day += (y % 400 === 0) ? 29 : (y % 100 === 0) ? 28 : (y % 4 === 0) ? 29 : 28;
      case 1: day += 31;
    }
    return day;
  }
}
