import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Comment provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Comment {
  private token: String;
  private url = 'http://media.mw.metropolia.fi/wbma/comments';
  constructor(public http: Http) {
    this.token = JSON.parse(localStorage.getItem('user')).token;
  }

  // Add a new comment
  addComment = (data) => {
    return this.http.post(this.url + '?token=' + this.token, data);
  }

  // Get list of comments by post id
  getComments = (id) => {
    return this.http.get(this.url + '/file/' + id);
  }
}
