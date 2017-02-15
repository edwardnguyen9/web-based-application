import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Favourite provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Favourite {
  private url = 'http://media.mw.metropolia.fi/wbma/favourites/';
  private token;
  constructor(public http: Http) {
    this.token = JSON.parse(localStorage.getItem('user')).token;
  }

  // Get list of likes from an image
  getFavourites = (id) => {
    return this.http.get(this.url + 'file/' + id);
  }

  // Like
  addFavourite = (id) => {
    const data = { 'file_id': id };
    return this.http.post(this.url + '?token=' + this.token, data);
  }

  // Unlike
  removeFavourite = (id) => {
    return this.http.delete(this.url + 'file/' + id + '?token=' + this.token);
  }
}
