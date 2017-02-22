import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Search provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Search {
  private url = 'http://media.mw.metropolia.fi/wbma/';
  private token: String;
  constructor(public http: Http) {
    this.token = JSON.parse(localStorage.getItem('user')).token;
  }

  // Search media by title
  searchByTitle = (value) => {
    const data = { "title": value };
    return this.http.post(this.url + 'media/search?token=' + this.token, data);
  }
  // Search media by description
  searchByDescription = (value) => {
    const data = { "description": value };
    return this.http.post(this.url + 'media/search?token=' + this.token, data);
  }
  // Search for user
  searchForUser = () => {
    return this.http.get(this.url + 'users?token=' + this.token);
  }
}
