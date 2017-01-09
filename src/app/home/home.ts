import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { AuthService  } from '../shared/providers/';
import { ColorGenerator } from '../../components/text-avatar/colorGenerator.services'
import { IUser  } from '../shared/models/';

@Component({
  selector: 'page-home',
  templateUrl: './home.html'
})
export class HomePage {

    eventsMenu:  Observable<any>; // Observable<IEvent[]>;
    selectedEventMenu: string;
    logged: Observable<any>;
    user: IUser = {} as any;
    isLogged:boolean = false;

    constructor(public navCtrl: NavController, 
    public toastCtrl:ToastController,
    public _col: ColorGenerator,
    public _auth: AuthService) {
    }

  ionViewDidLoad() {
        this._auth.authenticatedObservable()
            .subscribe(
            (data) => {
                this.isLogged = <boolean>data;
                console.log("DDD", data);
            }
            );
        this.logged = Observable
            .fromEvent(this._auth.lock, 'authenticated')
            .do((authResult: any) => {
                this._auth.authenticatedObservable()
                    .subscribe(
                    (data) => {
                        this.isLogged = <boolean>data;
                        console.log("DDD", data);
                    }
                    );
                this.presentToast("Vous êtes authentifié");
            });
        this.logged.subscribe();
        if (this._auth.getUser()._id) {
            this._auth.setUserProfile(this._auth.getUser()._id)
                .map(
                (data) => this._auth.setDataToProfile(data)
                ).subscribe((data) => this.user = data);
        }
  
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
        this._auth.setUserProfile(this._auth.getUser()._id)
            .map(
            (data) => this._auth.setDataToProfile(data)
            ).subscribe((data) => this.user = data);

        this.isLogged = true;
        toast.present();
    }

  select(event) {
      console.log(event);
      this.selectedEventMenu = event;
  }

}
