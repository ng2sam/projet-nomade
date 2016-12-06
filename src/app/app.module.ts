import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { TranslateService, TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import {provideStore, StoreModule} from '@ngrx/store';
import { MyApp } from './app.component';
import { AboutPage, ContactPage, HomePage, TabsPage, EventPage  } from '../pages';
import { EventService  } from '../providers';
import { EventActions } from '../actions';  
import { EventsReducer } from '../reducers';  

const pages:Array<any> = [
  AboutPage,
  ContactPage,
  HomePage,
  TabsPage,
  EventPage
];
const pipes:Array<any> = [];

const components:Array<any> = [];
const ionicAppConfig:Object = {
  tabsPlacement: 'bottom',
  mode: 'md'
};
const providers:Array<any> = [TranslateService, EventService];

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}


@NgModule({
  declarations: [MyApp, ...pages, ...components, ...pipes],
  imports: [
    IonicModule.forRoot(MyApp, ionicAppConfig),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    StoreModule.provideStore({ events: EventsReducer })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, ...pages],
  providers: [{provide: ErrorHandler,  useClass: IonicErrorHandler}, ...providers]
})
export class AppModule {}
