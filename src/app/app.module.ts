import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { TranslateService, TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MyApp } from './app.component';
import { AboutPage, ContactPage, HomePage, TabsPage, EventPage, EventListPage } from '../pages';
import { EventService  } from '../providers';
import { EventActions } from '../actions';  
import { EventsReducer } from '../reducers';  
import { EventEffects  } from '../effects';  

const pages:Array<any> = [
  AboutPage,
  ContactPage,
  HomePage,
  TabsPage,
  EventPage,
  EventListPage
];
const pipes:Array<any> = [];

const components:Array<any> = [];
const ionicAppConfig:Object = {
  tabsPlacement: 'bottom',
  mode: 'md'
};
const providers:Array<any> = [TranslateService, EventService, EventActions];

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
    EffectsModule.runAfterBootstrap(EventEffects),
    StoreModule.provideStore({ events: EventsReducer }),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, ...pages],
  providers: [{provide: ErrorHandler,  useClass: IonicErrorHandler}, ...providers]
})
export class AppModule {}
