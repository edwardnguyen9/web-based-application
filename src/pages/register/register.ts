import { LoginPage } from './../login/login';
import { User } from './../../providers/user';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: User) {}

  // Navigate to log in page
  toLogin = () => {
    this.navCtrl.push(LoginPage);
  }

  // Register new user
  register = (user: any) => {
    // Set user data
    this.userProvider.setUser(user);
    // Proceed to register
    this.userProvider.register().subscribe(
      () => {
        // Navigate to log in after finished
        this.toLogin();
      }
    );
  }
}
