import {NgModule} from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { EventPage } from './event';
import { EventDetailPage, EventFormPage, EventListPage } from './pages';
import { TextAvatar } from '../../components/text-avatar/text-avatar';
const pages: Array<any> = [
  EventPage,
  EventListPage,
  EventDetailPage,
  EventFormPage
];

@NgModule({
  imports: [
    /*SharedModule,*/
        IonicModule.forRoot(EventPage),
        /*IonicModule.forRoot(EventListPage),
        IonicModule.forRoot(EventDetailPage),
        IonicModule.forRoot(EventFormPage),*/
    /*EffectsModule.runAfterBootstrap(EventEffects),
    StoreModule.provideStore({ events: EventsReducer })*/
  ],
  declarations: [...pages, TextAvatar],
  providers: [],
  entryComponents: [...pages],
  exports: [
      ...pages
  ]
})
export class EventModule {
}