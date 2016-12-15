import { NgModule } from '@angular/core';
// import { Http } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
// import { TranslateService, TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
/*import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';*/
import { MyApp } from './app.component';
import { SharedModule } from './shared';
import { HomeModule } from './home';
import { EventModule } from './event';
import { DirectoryModule } from './directory';
/*import { AboutPage, ContactPage, HomePage, TabsPage, EventPage, EventListPage } from '../pages';
import { EventService  } from '../providers';
import { EventActions } from '../actions';  
import { EventsReducer } from '../reducers';  
import { EventEffects  } from '../effects';  */

/*const pages:Array<any> = [
  AboutPage,
  ContactPage,
  HomePage,
  TabsPage,
  EventPage,
  EventListPage
];
const pipes:Array<any> = [];

const components: Array<any> = [];*/
const ionicAppConfig: Object = {
  tabsPlacement: 'bottom',
  mode: 'md'
};

/*const providers: Array<any> = [TranslateService];

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}*/


@NgModule({
  declarations: [MyApp/*, ...pages, ...components, ...pipes*/],

  imports: [
    IonicModule.forRoot(MyApp, ionicAppConfig),
    SharedModule,
    HomeModule,
    DirectoryModule,
    EventModule
    // SharedModule,EventModule, /*, TabsModule, EventModule,*/ //seulement les module top-nivo
    /*IonicModule.forRoot(MyApp, ionicAppConfig)
    EffectsModule.runAfterBootstrap(EventEffects),
    StoreModule.provideStore({ events: EventsReducer }),
    StoreDevtoolsModule.instrumentOnlyWithExtension()*/
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp/*, ...pages*/]
})
export class AppModule { }
