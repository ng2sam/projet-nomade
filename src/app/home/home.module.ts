import { NgModule } from '@angular/core';
import { SharedModule} from '../shared/shared.module';
import { IonicModule } from 'ionic-angular';
import { HomePage } from './home';
import { MenuPage } from './pages/menu/menu';
import { BlogPage, BlogListPage, BlogDetailPage } from './pages';
import { DirectoryModule} from '../directory';

import { TextAvatar } from '../../components/text-avatar/text-avatar';
const pages: Array<any> = [
  HomePage,
  MenuPage,
  BlogPage,
  BlogListPage,
  BlogDetailPage
];

@NgModule({
  imports: [
    SharedModule,
    DirectoryModule,
    IonicModule.forRoot(HomePage),
    //IonicModule.forRoot(MenuPage),
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