import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DirectoryPage } from './directory';
import { DirectoryDetailPage, DirectoryListPage, MapPage } from './pages';

const pages: Array<any> = [
  DirectoryPage,
  DirectoryDetailPage,
  DirectoryListPage,
  MapPage
];

@NgModule({
  imports: [
    /*SharedModule,*/
    IonicModule.forRoot(DirectoryPage),
    IonicModule.forRoot(DirectoryListPage),
    IonicModule.forRoot(MapPage),
    IonicModule.forRoot(DirectoryDetailPage),
  ],
  declarations: [...pages],
  providers: [],
  entryComponents: [...pages],
  exports: [
    ...pages
  ]
})
export class DirectoryModule {
}
