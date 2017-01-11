import {NgModule} from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SharedModule} from '../shared/shared.module';
import { DashboardPage } from './dashboard';
import { DashboardAdminPage, DashboardUserPage } from './pages';
import { TextAvatar } from '../../components/text-avatar/text-avatar';
const pages: Array<any> = [
 DashboardAdminPage,
 DashboardUserPage,
 DashboardPage
];

@NgModule({
  imports: [
    SharedModule,
        IonicModule.forRoot(DashboardPage),
  ],
  declarations: [...pages],
  providers: [],
  entryComponents: [...pages],
  exports: [
      ...pages
  ]
})
export class DashBoardModule {
}