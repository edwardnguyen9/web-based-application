import { RegisterPage } from './../register/register';
import { TabsPage } from './../tabs/tabs';
import { User } from './../../providers/user';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private user: any = {'username': '', 'password': ''};
  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: User) {}

  ionViewWillEnter() {
    // Check whether user has already logged in
    const logged = JSON.parse(localStorage.getItem('user'));
    if (logged !== null && logged.logged) {
      // Redirect to home page if true
      this.navCtrl.push(TabsPage);
    }
    // Check whether user data already existed
    else if (this.userProvider.getUser().password !== undefined) {
      // Proceed to log in if true
      this.userProvider.logIn().subscribe(
        (res) => {
          // Receive response
          const data = res.json();
          // Save user data to local storage
          this.user = data.user;
          this.user.token = data.token;
          this.user.logged = true;
          localStorage.setItem('user', JSON.stringify(this.user));
          // Clear user data from class memory
          // to prevent auto log in after logging out
          this.userProvider.clearUser();
          // Navigate to home page
          this.navCtrl.push(TabsPage);
        }
      );
    }
  }

  // Navigate to register
  toRegister = () => {
    this.navCtrl.push(RegisterPage);
  }

  // Log in
  logIn = (user: any) => {
    // Set user data
    this.userProvider.setUser(user);
    // Proceed to log in
    this.userProvider.logIn().subscribe(
      (res) => {
        // Receive response
        const data = res.json();
        // Save user data to local storage
        this.user = data.user;
        this.user.token = data.token;
        this.user.logged = true;
        localStorage.setItem('user', JSON.stringify(this.user));
        // Clear user data from class memory
        // to prevent auto log in after logging out
        this.userProvider.clearUser();
        // Navigate to home page
        this.navCtrl.push(TabsPage);
      }
    );
  }
}
