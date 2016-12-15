import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DirectoryPage } from './directory';
import { DirectoryDetailPage, DirectoryListPage, MapPage } from './pages';
import { DirectoryFilter } from './pipes';

const pages: Array<any> = [
  DirectoryPage,
  DirectoryDetailPage,
  DirectoryListPage,
  MapPage
];
 const pipes: Array<any> = [DirectoryFilter]

@NgModule({
  imports: [
    /*SharedModule,*/
    IonicModule.forRoot(DirectoryPage),
    /*IonicModule.forRoot(DirectoryListPage),
    IonicModule.forRoot(MapPage),
    IonicModule.forRoot(DirectoryDetailPage),*/
  ],
  declarations: [...pages, ...pipes],
  providers: [],
  entryComponents: [...pages],
  exports: [
    ...pages
  ]
})
export class DirectoryModule {
}
