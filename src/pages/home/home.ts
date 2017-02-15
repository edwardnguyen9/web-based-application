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
      // Load home page if true
      this.mediaProvider.getMedia().subscribe(
        (res) => {
          this.images = res.json();
          console.log(this.images);
        }
      )
    } else {
      // Redirect to log in page otherwise
      this.navCtrl.push(LoginPage);
    }
  }

  // Navigate to individual post from home page
  toPost = (id) => {
    this.navCtrl.push(PostPage,{ post_id: id });
  }

  // Check whether user has logged in
  getStatus = () => {
    return JSON.parse(localStorage.getItem('user')).logged;
  }
}
