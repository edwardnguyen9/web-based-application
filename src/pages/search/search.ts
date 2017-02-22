import { PostPage } from './../post/post';
import { UserPage } from './../user/user';
import { Search } from './../../providers/search';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  private search;
  private byTitles: any = [];
  // private byDescriptions: any = [];
  private userList: any = [];
  private users: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private searchProvider: Search) {}

  ionViewWilldEnter() {
    this.search = 'title';
    this.searchProvider.searchForUser().subscribe(
      (res) => {
        this.userList = res.json();
      }
    )
  }

  getItem = (evt) => {
    const data: String = evt.target.value;
    console.log(data);
    this.getByTitle(data);
    // this.getByDescription(data);
    this.getUser(data);
  }

  getUser = (data) => {
    if (data !== '') {
      this.users = this.userList.filter((user) => {
        return user.username.includes(data);
      });
    } else this.users = [];
  }
  // Get media by title
  getByTitle = (data) => {
    this.searchProvider.searchByTitle(data).subscribe(
      (res) => {
        this.byTitles = res.json();
      }
    );
  }
  // Get media by description
  // getByDescription = (data) => {
  //   this.searchProvider.searchByDescription(data).subscribe(
  //     (res) => {
  //       this.byDescriptions = res.json();
  //     }
  //   );
  // }

  // Navigate to user
  toUser = (id) => {
    this.navCtrl.push(UserPage, { user_id: id });
  }
  // Navigate to post
  toPost = (id) => {
    this.navCtrl.push(PostPage, { post_id: id });
  }
}
