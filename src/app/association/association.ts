import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Store } from '@ngrx/store';
import { AssociationActions } from '../shared/actions';
import { IAssociation, IUser } from '../shared/models';
import { AppState, AuthService, AssociationServices } from '../shared/providers';
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
    logged: Observable<any>;
    isLogged: boolean;// = Observable.of(false);
    loading: boolean = false;
    user: IUser = {} as any;
    selectedAssociation: IAssociation;

    constructor(public navCtrl: NavController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        private _associationActions: AssociationActions,
        private store: Store<AppState>,
        public auth: AuthService,
        public _assocService: AssociationServices) {
        this.associations = this.store.select('associations');
        // this.error = this.store.select('error');
        /* this.error = Observable.of(this._assocService.error).subscribe(
         data=>data
         );
         this.error.subscribe(
             (data) => console.log(data)
         );*/


    }

    ionViewDidLoad() {
        this.store.dispatch(this._associationActions.loadAssociations());
        this.auth.authenticatedObservable()
            .subscribe(
            (data) => {
                this.isLogged = <boolean>data;
                console.log("DDD", data);
            }
            );
        this.logged = Observable
            .fromEvent(this.auth.lock, 'authenticated')
            .do((authResult: any) => {
                this.auth.authenticatedObservable()
                    .subscribe(
                    (data) => {
                        this.isLogged = <boolean>data;
                        console.log("DDD", data);
                    }
                    );
                this.presentToast("Vous êtes authentifié, pressez le boutton rafraichire");
            });
        this.logged.subscribe();
        if (this.auth.getUser()._id) {
            this.auth.setUserProfile(this.auth.getUser()._id)
                .map(
                (data) => this.auth.setDataToProfile(data)
                ).subscribe((data) => this.user = data);
        }


    }



    close() {
        console.log("closed");
        this.addingAssociation = false;
    }

    refresh() {
        console.log("refresh");
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

    presentToast(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 4000
        });
        //  this.isLogged = Observable.of(true);

        /*CREER OBSERVER Observable
        return new Observable(observer => { */
        console.log("thisLogged", this.isLogged);
        this.auth.setUserProfile(this.auth.getUser()._id)
            .map(
            (data) => this.auth.setDataToProfile(data)
            ).subscribe((data) => this.user = data);

        this.isLogged = true;
        toast.present();
    }
}
