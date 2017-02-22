import { SearchPage } from './../pages/search/search';
// Providers
import { Comment } from './../providers/comment';
import { Favourite } from './../providers/favourite';
import { Media } from './../providers/media';
import { User } from './../providers/user';
import { Search } from './../providers/search';
// Pipes
import { Time } from './../pipes/time';
import { Seemore } from './../pipes/seemore';
import { Username } from './../pipes/username';
import { Thumbnail } from './../pipes/thumbnail';
// Pages
import { UserPage } from './../pages/user/user';
import { PostPage } from './../pages/post/post';
import { LogoutPage } from './../pages/logout/logout';
import { UploadPage } from './../pages/upload/upload';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    // Pages
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    LogoutPage,
    PostPage,
    RegisterPage,
    UploadPage,
    UserPage,
    SearchPage,
    // Pipes
    Seemore,
    Thumbnail,
    Time,
    Username
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // Pages
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    LogoutPage,
    PostPage,
    RegisterPage,
    UploadPage,
    UserPage,
    SearchPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // Providers
    User,
    Media,
    Favourite,
    Search,
    Comment
    ]
})
export class AppModule {}
