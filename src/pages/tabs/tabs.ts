import { SearchPage } from './../search/search';
import { UserPage } from './../user/user';
import { LogoutPage } from './../logout/logout';
import { UploadPage } from './../upload/upload';
import { Component } from '@angular/core';

import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = SearchPage;
  tab3Root: any = UploadPage;
  tab4Root: any = UserPage;
  tab5Root: any = LogoutPage;
  private username: String;
  constructor() {
    this.username = JSON.parse(localStorage.getItem('user')).username;
  }
}
