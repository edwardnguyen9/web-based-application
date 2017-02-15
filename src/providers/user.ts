import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class User {
  logged: boolean = false;
  private user: any = {};
  private url: String = 'http://media.mw.metropolia.fi/wbma/';
  constructor(public http: Http) {
    
  }

  // Manipulate variable
  setUser = (user) => {
    this.user = user;
  }
  getUser = () => {
    return this.user;
  }
  clearUser = () => {
    this.user = {};
  }

  // Log in
  logIn = () => {
    return this.http.post(this.url + 'login', this.user);
  }
  
  // Register
  register = () => {
    return this.http.post(this.url + 'users', this.user);
  }
}
