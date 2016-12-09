import './polyfills.ts';

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler, } from 'ionic-angular';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form } from 'ionic-angular';
import { TranslateService, TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { MyApp } from './app/app.component';
// import { AboutPage, ContactPage, HomePage, TabsPage, EventPage, EventListPage } from './pages';

import { EventService  } from './providers';
import { EventActions } from './actions';  
import { EventsReducer } from './reducers';  
import { EventEffects  } from './effects';  
import { ConfigMock } from './mocks';


const providers:Array<any> = [TranslateService, EventService, EventActions];
export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}


// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function () {};


Promise.all([
  System.import('@angular/core/testing'),
  System.import('@angular/platform-browser-dynamic/testing')
])
  // First, initialize the Angular testing environment.
  .then(([testing, testingBrowser]) => {
    testing.getTestBed().initTestEnvironment(
      testingBrowser.BrowserDynamicTestingModule,
      testingBrowser.platformBrowserDynamicTesting()
    );
  })
  // Then we find all the tests.
  .then(() => require.context('./', true, /\.spec\.ts/))
  // And load the modules.
  .then(context => context.keys().map(context))
  // Finally, start Karma to run the tests.
  .then(__karma__.start, __karma__.error);



// utility class tesbed module config



export class TestUtils {

  public static beforeEachCompiler(components: Array<any>): Promise<{fixture: any, instance: any}> {
    return TestUtils.configureIonicTestingModule(components)
      .compileComponents().then(() => {
        let fixture: any = TestBed.createComponent(components[0]);
        return {
          fixture: fixture,
          instance: fixture.componentInstance,
        };
      });
  }

  public static configureIonicTestingModule(components: Array<any>): typeof TestBed {
    return TestBed.configureTestingModule({
      declarations: [
        //MyApp, ...components, ...pages
        ...components
      ],
      providers: [
       {provide: Config, useClass: ConfigMock},
         /*{provide: ErrorHandler,  useClass: IonicErrorHandler},*/
        App, Platform, Form, Keyboard, MenuController, NavController,
         ...providers/*, 
        {provide: EventService, useClass: ClickersServiceMock},*/
      ],
      imports: [
        IonicModule,
        EffectsModule.runAfterBootstrap(EventEffects),
        StoreModule.provideStore({ events: EventsReducer }),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
          }),
      ],
});
  }

}