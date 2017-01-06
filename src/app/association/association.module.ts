import {NgModule} from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SharedModule} from '../shared/shared.module';
import { AssociationPage } from './association';
import { UserModal } from './user-modal';
import { AssociationListPage, AssociationDetailPage, AssociationFormPage } from './pages';
import { TextAvatar } from '../../components/text-avatar/text-avatar';
const pages: Array<any> = [
  AssociationPage,
  AssociationListPage,
  UserModal,
  AssociationDetailPage,
  AssociationFormPage
];

@NgModule({
  imports: [
    SharedModule,
        IonicModule.forRoot(AssociationPage),
  ],
  declarations: [...pages],
  providers: [],
  entryComponents: [...pages],
  exports: [
      ...pages
  ]
})
export class AssociationModule {
}