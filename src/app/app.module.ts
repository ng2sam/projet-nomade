import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { SharedModule } from './shared';
import { HomeModule } from './home';
import { EventModule } from './event';
import { AssociationModule } from './association';
import { DirectoryModule } from './directory';
import { DashBoardModule } from './dashboard';

const ionicAppConfig: Object = {
  tabsPlacement: 'bottom',
  mode: 'md',
  scrollAssist: false,
  autoFocusAssist: false
};


@NgModule({
  declarations: [MyApp],

  imports: [
    IonicModule.forRoot(MyApp, ionicAppConfig),
    SharedModule,
    HomeModule,
    DirectoryModule,
    EventModule,
    AssociationModule,
    DashBoardModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp]
})
export class AppModule { }
