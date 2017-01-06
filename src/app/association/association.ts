import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Store } from '@ngrx/store';
import { AssociationActions } from '../shared/actions';
import { IAssociation, IUser } from '../shared/models';
import { AppState, AuthService } from '../shared/providers';
import { UserModal } from './user-modal';
import { AssociationDetailPage } from './pages';

@Component({
    selector: 'page-association',
    templateUrl: './association.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssociationPage {

    associations: Observable<any>; // Observable<IAssociation[]>;
    error: Observable<any>;
    addingAssociation: boolean = false;
    logged: boolean = true;
    user: IUser = {} as any;
    selectedAssociation: IAssociation;

    constructor(public navCtrl: NavController,
        public modalCtrl: ModalController,
        private _associationActions: AssociationActions,
        private store: Store<AppState>,
        public auth: AuthService) {
        this.associations = this.store.select('associations');
        this.error = this.store.select('error');
        this.user = this.auth.getUser();

    }

    ionViewDidLoad() {
        this.store.dispatch(this._associationActions.loadAssociations());
        /*this.auth.authenticatedObservable()
         .subscribe(
             (data) => this.logged = data
         ); */
    }



    close() {
        console.log("closed");
        this.addingAssociation = false;
    }

    refresh() {
        this.store.dispatch(this._associationActions.loadAssociations());
        this.store.dispatch(this._associationActions.resetBlankError());
    }

    delete(association) {
        this.store.dispatch(this._associationActions.deleteAssociation(association));
    }

    select($association) {
        console.log($association);
        this.selectedAssociation = $association;
        this.gotoDetail(this.selectedAssociation._id);
    }

    gotoDetail(associationId: string) {
     this.navCtrl.push(AssociationDetailPage, { param: associationId });
    }
    addAssociation() {
         this.navCtrl.push(AssociationDetailPage);
    }
    updateProfile() {
        let modal = this.modalCtrl.create(UserModal);
        modal.onDidDismiss(data => {
           this.user = this.auth.getUser();
        });
        modal.present();
    }
}
