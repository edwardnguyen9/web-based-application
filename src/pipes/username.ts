import { Http } from '@angular/http';
import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Username pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'username'
})
@Injectable()
export class Username {
  // List of users
  private userList: any = [];
  constructor(private http: Http) {
    // Get token from local storage
    const token = JSON.parse(localStorage.getItem('user')).token;
    // Get list of users
    this.http.get('http://media.mw.metropolia.fi/wbma/users?token=' + token).subscribe(
      (res) => {
        this.userList = res.json();
        localStorage.setItem('userList',JSON.stringify(this.userList));
      }
    )
  }

  transform(value, args?: String): String {
    if (args === 'old') this.userList = JSON.parse(localStorage.getItem('userList'));
    // Go through list of users
    for (let i = 0; i < this.userList.length; i++) {
      // Compare input value to each user id
      if (this.userList[i].user_id === value)
        // Return the username of correct id
        return this.userList[i].username;
    }
  }
}
