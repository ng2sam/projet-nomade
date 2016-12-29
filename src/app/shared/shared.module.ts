import { NgModule, ErrorHandler  } from '@angular/core';
import { IonicErrorHandler  } from 'ionic-angular';
import { Http } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { TranslateService, TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { TextAvatar } from '../../components/text-avatar/text-avatar';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EventServices, DirectoryServices, AuthService, AssociationServices } from './providers';
import { EventActions, AssociationActions } from './actions';
import { EventEffects, AssociationEffects } from './effects';
import { EventsReducer, EventReducer, AssociationReducer, AssociationsReducer  } from './reducer';





export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
let storage: Storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}
const providers: Array<any> = [
  TranslateService,
  EventActions,
  AssociationActions,
  EventServices,
  AssociationServices,
  DirectoryServices,
  Storage,
  AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
  ];
@NgModule({
  imports: [
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
     EffectsModule.run(EventEffects),
     EffectsModule.run(AssociationEffects),
     StoreModule.provideStore({ 
       events: EventsReducer, event: EventReducer, 
       association: AssociationReducer, associations : AssociationsReducer }),
     StoreDevtoolsModule.instrumentOnlyWithExtension(),
     ReactiveFormsModule
  ],
  declarations: [TextAvatar],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, ...providers],
  exports: [TranslateModule, EffectsModule, StoreModule, StoreDevtoolsModule, TextAvatar]
})
export class SharedModule {
}