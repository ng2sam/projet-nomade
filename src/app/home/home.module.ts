import { NgModule } from '@angular/core';
import { SharedModule} from '../shared/shared.module';
import { IonicModule } from 'ionic-angular';
import { HomePage } from './home';
import { MenuPage } from './pages/menu/menu';
import { EnvironnementPage } from './pages//blog/environnement/environnement';
import { BlogPage } from './pages//blog/blog';
import { ElasticHeader } from '../../components/elastic-header/elastic-header';
import { TextAvatar } from '../../components/text-avatar/text-avatar';
const pages: Array<any> = [
  HomePage,
  MenuPage,
  EnvironnementPage,
  BlogPage
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