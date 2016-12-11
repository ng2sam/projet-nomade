import { NgModule } from '@angular/core';
import { SharedModule} from '../shared/shared.module';
import { IonicModule } from 'ionic-angular';
import { HomePage } from './home';
import { MenuPage } from './pages/menu/menu';

const pages: Array<any> = [
  HomePage,
  MenuPage
];

@NgModule({
  imports: [
    SharedModule,
    IonicModule.forRoot(HomePage),
    IonicModule.forRoot(MenuPage),
  ],
  declarations: [...pages],
  providers: [],
  entryComponents: [...pages],
  exports: [
      ...pages
  ]
})
export class HomeModule {
}