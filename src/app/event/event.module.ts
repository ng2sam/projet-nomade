import {NgModule} from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { EventPage } from './event';
import { EventListPage } from './pages/event-list/event-list';
import { EventDetailPage } from './pages/event-detail/event-detail';

const pages: Array<any> = [
  EventPage,
  EventListPage,
  EventDetailPage
];

@NgModule({
  imports: [
    /*SharedModule,*/
        IonicModule.forRoot(EventPage),
        IonicModule.forRoot(EventListPage),
    /*EffectsModule.runAfterBootstrap(EventEffects),
    StoreModule.provideStore({ events: EventsReducer })*/
  ],
  declarations: [...pages],
  providers: [],
  entryComponents: [...pages],
  exports: [
      ...pages
  ]
})
export class EventModule {
}