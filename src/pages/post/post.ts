import { UserPage } from './../user/user';
import { Comment } from './../../providers/comment';
import { Favourite } from './../../providers/favourite';
import { Media } from './../../providers/media';
import { User } from './../../providers/user';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Post page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
  private post_id: String;          // Post ID
  private userId: String;           // User ID
  private postDetails: any = {};    // Post data (title, file name, etc.)
  private likes: any = [];          // List of likes
  private comments: any = [];       // List of comments
  private cmt: String = '';
  // Variables to support UI
  private liked: boolean;           // Alter like button
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private user: User, private media: Media, private favourite: Favourite, private comment: Comment) { }

  ionViewWillEnter() {
    this.post_id = this.navParams.get('post_id');
    this.userId = JSON.parse(localStorage.getItem('user')).user_id;
    this.getDetails();
    this.getLikes();
    this.getComments();
  }

  // Go to user page
  toUser = (id) => {
    this.navCtrl.push(UserPage, {user_id: id});
  }

  // Get post title, description, etc.
  getDetails = () => {
    this.media.getDetails(this.post_id).subscribe(
      (res) => {
        console.log(res);
        this.postDetails = res.json();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Like
  like = () => {
    // Prevents sending 2 likes when clicked on image multiple times
    if (!this.liked) {
      // Add like
      this.favourite.addFavourite(this.post_id).subscribe(
        // Update list of likes
        (res) => {
          this.getLikes();
        }
      );
    }
  }
  // Unlike
  unlike = () => {
    // Remove like
    this.favourite.removeFavourite(this.post_id).subscribe(
      // Update list of likes
      (res) => {
        this.getLikes();
      }
    );
  }
  // Get list of likes
  getLikes = () => {
    this.favourite.getFavourites(this.post_id).subscribe(
      (res) => {
        console.log(res);
        // Receive list of likes
        this.likes = res.json();
        // Check whether user has liked the post
        this.liked = false;
        // Go through list of likes
        for (let i = 0; i < this.likes.length; i++)
          // Check whether user id is on it
          if (this.likes[i].user_id === this.userId) {
            // Change like status into true if found
            this.liked = true;
            break;
          }
      }
    )
  }

  // Add a comment
  addComment = () => {
    if (this.cmt !== '') {
      // Get comment from html page
      const data = {
        'file_id': this.post_id,
        'comment': this.cmt
      };
      // Add comment
      this.comment.addComment(data).subscribe(
        (res) => {
          // Reload page
          this.cmt = '';
          this.ionViewWillEnter();
        }
      );
    }
  }
  // Get list of comments
  getComments = () => {
    this.comment.getComments(this.post_id).subscribe(
      (res) => {
        console.log(res);
        // Receive list of comments
        this.comments = res.json();
      }
    )
  }
}
