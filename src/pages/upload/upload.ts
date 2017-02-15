import { TabsPage } from './../tabs/tabs';
import { Media } from './../../providers/media';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Upload page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: Media) {}

  ionViewWillEnter() {
    console.log('Upload');
  }

  upload = (evt, value) => {
    // Get file from event
    const fileElement = evt.target.querySelector('input[type=file]');
    // Create form data
    const formData = new FormData();
    // Add corresponding parameters
    formData.append('file', fileElement.files[0]);
    formData.append('title', value.title);
    formData.append('description', value.description);
    // Upload file
    this.mediaProvider.upload(formData).subscribe(
      (res) => {
        // Navigate to home page after finished
        this.navCtrl.push(TabsPage);
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
