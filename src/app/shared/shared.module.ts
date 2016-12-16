import { NgModule, ErrorHandler  } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { Http } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateService, TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EventServices, DirectoryServices } from './providers';
import { EventActions } from './actions';
import { EventEffects } from './effects';
import { EventsReducer, EventReducer } from './reducer';


const providers: Array<any> = [TranslateService, EventActions, EventServices, DirectoryServices];


export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
     EffectsModule.runAfterBootstrap(EventEffects),
     StoreModule.provideStore({ events: EventsReducer, event: EventReducer }),
     StoreDevtoolsModule.instrumentOnlyWithExtension(),
     ReactiveFormsModule
  ],
  declarations: [],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, ...providers],
  exports: [TranslateModule, EffectsModule, StoreModule, StoreDevtoolsModule]
})
export class SharedModule {
}