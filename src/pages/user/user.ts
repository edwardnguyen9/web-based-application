import { PostPage } from './../post/post';
import { Media } from './../../providers/media';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the User page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  private images: any = [];
  private user: String;
  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: Media) {
    this.user = JSON.parse(localStorage.getItem('user')).user_id;
    console.log(this.user);
  }

  ionViewWillEnter() {
    // Get images from server
    this.mediaProvider.getMediaByUser().subscribe(
      (res) => {
        // Sort data from newest to oldest
        this.images = res.json().sort().reverse();
      }
    )
  }

  // Navigate to individual post
  toPost = (id) => {
    this.navCtrl.push(PostPage, { post_id: id });
  }
}
