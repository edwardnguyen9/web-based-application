import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Media provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Media {
  private url = 'http://media.mw.metropolia.fi/wbma/media';
  private token;
  constructor(public http: Http) {
    this.token = JSON.parse(localStorage.getItem('user')).token;
  }

  // Get media
  getMedia = (num?: any) => { // Number of items as parameter
    const temp = (num === undefined)? '' : ("?limit=" + num);
    return this.http.get(this.url + temp);
  }
  // Get media by user 
  getMediaByUser = (id?: String) => {
    const temp = (id === undefined)? ('/user?token=' + this.token) : ('/user/' + id);
    return this.http.get(this.url + temp);
  }

  // Upload a file
  upload = (data) => {
    return this.http.post(this.url + '?token=' + this.token, data);
  }

  // Get file details
  getDetails = (id: String) => {
    return this.http.get(this.url + '/' + id);
  }
}
