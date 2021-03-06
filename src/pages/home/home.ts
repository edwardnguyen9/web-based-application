import { UserPage } from './../user/user';
import { PostPage } from './../post/post';
import { LoginPage } from './../login/login';
import { Media } from './../../providers/media';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private images: any = [];
  constructor(public navCtrl: NavController, private mediaProvider: Media) {

  }

  ionViewWillEnter() {
    // Check whether user has logged in
    if (this.getStatus()) {
      // Get images from server if true
      this.mediaProvider.getMedia().subscribe(
        (res) => {
          this.images = res.json();
        }
      )
    } else {
      // Redirect to log in page otherwise
      this.navCtrl.push(LoginPage);
    }
  }

  // Navigate to user page
  toUser = (id) => {
    this.navCtrl.push(UserPage, { user_id: id });
  }
  // Navigate to individual post
  toPost = (id) => {
    this.navCtrl.push(PostPage, { post_id: id });
  }

  // Check whether user has logged in
  getStatus = () => {
    return JSON.parse(localStorage.getItem('user')).logged;
  }
}
