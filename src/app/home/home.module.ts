import { NgModule } from '@angular/core';
import { SharedModule} from '../shared/shared.module';
import { IonicModule } from 'ionic-angular';
import { HomePage } from './home';
import { MenuPage } from './pages/menu/menu';
import { EnvironnementPage } from './pages/environnement/environnement';
import { ElasticHeader } from '../../components/elastic-header/elastic-header';

const pages: Array<any> = [
  HomePage,
  MenuPage,
  EnvironnementPage
];

@NgModule({
  imports: [
    SharedModule,
    IonicModule.forRoot(HomePage),
    //IonicModule.forRoot(MenuPage),
  ],
  declarations: [...pages,   ElasticHeader],
  providers: [],
  entryComponents: [...pages],
  exports: [
      ...pages
  ]
})
export class HomeModule {
}