import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TranslateService } from 'ng2-translate/ng2-translate';
import { AuthService } from './shared/providers';
import { HomePage } from './home';
import { DirectoryPage } from './directory';
import { EventPage } from './event';
import { MapPage } from './directory/pages'; 
import { AssociationPage } from './association'; 

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage = HomePage;
  @ViewChild('appNav') nav: NavController

  constructor(platform: Platform, public translate: TranslateService, private auth: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available. 
      this.translationConfig(); 
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //refresh token sur app strt
      //auth.startupTokenRefresh();
      Splashscreen.hide();
    });
  }

  translationConfig() {
    this.translate.setDefaultLang('fr');
    let userLang = navigator.language.split('-')[0];
    if(this.auth.userLang !== ''){
       userLang = this.auth.userLang;
    }
userLang = /(fr|en|so|et|ar)/gi.test(userLang) ? userLang : 'fr';
    console.log(userLang);
    
    this.auth.setStoreLang(userLang);
    this.translate.use(userLang);
  }

   ngOnInit() {
   }
}
