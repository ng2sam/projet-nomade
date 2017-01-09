import { Storage } from '@ionic/storage';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Http, Response } from '@angular/http';
import { AlertController, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { EventActions } from '../actions';
import { IEvent, IUser } from '../models';
import { AppState } from '../providers';

// Avoid name not found warnings
declare var Auth0: any;
declare var Auth0Lock: any;

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();
    auth0 = new Auth0({
        clientID: 'Y76wLooWM3ZCxO8aMUSooQdwpsYUoc4s', domain: 'ng2sam-1.eu.auth0.com',
        responseType: 'token',
        callbackURL: 'https://ng2sam-1.eu.auth0.com/mobile'
    });
 options = {
  language: 'fr'
};
    lock = new Auth0Lock('Y76wLooWM3ZCxO8aMUSooQdwpsYUoc4s', 'ng2sam-1.eu.auth0.com',this.options, {
        auth: {
            redirect: false,
            params: {
                scope: 'openid offline_access email',
            }
        }
    });
    private storage: Storage = new Storage();
    refreshSubscription: any;
    public user: IUser;
    public idToken: string;
    public userId: string;
    public globalError: string;
    public userLang: string;


    constructor(private _http: AuthHttp, public http: Http,
        private store: Store<AppState>,
        public alrt: AlertController,
        public translate: TranslateService,
        private _eventActions: EventActions,
        public toastCtrl: ToastController) {

        // Check if there is a profile saved in local storage
        this.storage.get('profile').then(profile => {

            let t = profile.idTokenPayload.sub.split("|");
            let splittedId = null;
            splittedId = t[1];

            this.user = {
                _id: splittedId,
                picture: null,
                locale: null,
                mineur: null,
                name: null,
                email: null,
                nonAccompagne: null,
                pays: null
            };
            //console.log(this.user);
            this.setUserProfile(this.user._id)
                .subscribe(
                (data) => this.setDataToProfile(data)
                )

            //this.user = profile;
        }).catch(error => {
            this.globalError = error;
        });

        this.storage.get('id_token').then(token => {
            this.idToken = token;
        });

        this.getStoreLang();


    }
    setToStorage(authResult: any)/*: Observable<any>*/ {

        this.storage.set('id_token', authResult.idToken);
        this.storage.set('refresh_token', authResult.refreshToken);
        this.getProfile(authResult.idToken);
    }
    getProfile(idToken: string): Observable<any> {
        return new Observable(observer => {
            this.lock.getProfile(idToken, (err, profile) => {
                if (err) {
                    observer.error(err);
                }
                else {
                    observer.next(profile);
                    observer.complete();
                }
            });
        });
    }
    public authenticated() {
        return this.authenticatedObservable().subscribe(data => <boolean>data);
    }

   /* public isAuthenticated(value: boolean) {
        return value;
    }*/

    public authenticatedObservable() {
        return Observable.fromPromise(
            this.storage.get('id_token').then(token => token)
        ).map(
            (token) => tokenNotExpired(null, token)
            )
    }

    public login() {
        this.lock.show();
    }



    public logout() {
        this.storage.remove('profile');
        this.storage.remove('id_token');
        this.idToken = null;
        this.storage.remove('refresh_token');
        // Unschedule the token refresh
        this.unscheduleRefresh();
    }
    public scheduleRefresh() {
        // If the user is authenticated, use the token stream
        // provided by angular2-jwt and flatMap the token

        let source = Observable.of(this.idToken).flatMap(
            token => {
                console.log('token here', token);
                // The delay to generate in this case is the difference
                // between the expiry time and the issued at time
                let jwtIat = this.jwtHelper.decodeToken(token).iat;
                let jwtExp = this.jwtHelper.decodeToken(token).exp;
                let iat = new Date(0);
                let exp = new Date(0);

                let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));

                return Observable.interval(delay);
            });

        this.refreshSubscription = source.subscribe(() => {
            this.getNewJwt();
        });
    }

    public startupTokenRefresh() {
        // If the user is authenticated, use the token stream
        // provided by angular2-jwt and flatMap the token
        if (this.authenticated()) {
            let source = Observable.of(this.idToken).flatMap(
                token => {
                    // Get the expiry time to generate
                    // a delay in milliseconds
                    let now: number = new Date().valueOf();
                    let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
                    let exp: Date = new Date(0);
                    exp.setUTCSeconds(jwtExp);
                    let delay: number = exp.valueOf() - now;

                    // Use the delay in a timer to
                    // run the refresh at the proper time
                    return Observable.timer(delay);
                });

            // Once the delay time from above is
            // reached, get a new JWT and schedule
            // additional refreshes
            source.subscribe(() => {
                this.getNewJwt();
                this.scheduleRefresh();
            });
        }
    }

    public unscheduleRefresh() {
        // Unsubscribe fromt the refresh
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }

    public getNewJwt() {
        // Get a new JWT from Auth0 using the refresh token saved
        // in local storage
        this.storage.get('refresh_token').then(token => {
            this.auth0.refreshToken(token, (err, delegationRequest) => {
                if (err) {
                    alert(err);
                }
                this.storage.set('id_token', delegationRequest.id_token);
                this.idToken = delegationRequest.id_token;
            });
        }).catch(error => {
            console.log(error);
        });

    }
    public successLogin(profile: any) {
        let token: string = profile.idToken;
        //auth0 ou google-oauth2
        this.storage.set('profile', profile);
        let t = this.jwtHelper.decodeToken(token);
        let tsub = t.sub.split("|");
        let splittedId = null;
        splittedId = tsub[1];

        this.user = {
            _id: splittedId,
            picture: null,
            locale: null,
            mineur: null,
            name: null,
            email: null,
            nonAccompagne: null,
            pays: null
        };
        //console.log(this.user);
        this.idToken = token;
        this.scheduleRefresh();
        return this.user;



    }

    getUser(): IUser {
        console.log(this.user);
        return this.user;
    }
    // TODO : ngrx
    saveUserProfile(user: IUser) {
        return this._http.put('https://migrant-app.herokuapp.com/users/' + user._id, user)
            .map(res => res.json())
            .subscribe(
            (data) => this.setDataToProfile(data)
            )
    }
    setUserProfile(id) {
        console.log(this.user);
        return this.http.get('https://migrant-app.herokuapp.com/users/' + id)
            .map(res => res.json())

    }
    setDataToProfile(data: any) {
        console.log("dd", data);
        
        this.user.picture = data.picture;
        this.user.locale = data.locale;
        this.user.mineur = data.mineur;
        this.user.nonAccompagne = data.nonAccompagne;
        this.user.name = data.name;
        this.user.email = data.email;
        this.user.pays = data.pays;
        return this.user;
        //onsole.log("SUCCESS", this.user);

    }


    selectLangue() {
        let alrt = this.alrt.create();
        alrt.setTitle('Choisissez votre langue');

        alrt.addInput({
            type: 'radio',
            label: 'I speak english',
            value: 'en',
            checked: false
        });
        alrt.addInput({
            type: 'radio',
            label: 'Anigu waan hadli Soomaali',
            value: 'so',
            checked: false
        });
        alrt.addInput({
            type: 'radio',
            label: 'أنا أتكلم العربية',
            value: 'ar',
            checked: false
        });
        alrt.addInput({
            type: 'radio',
            label: 'እኔ አማርኛ መናገር',
            value: 'et',
            checked: false
        });

        alrt.addButton('Cancel');
        alrt.addButton({
            text: 'OK',
            handler: data => {
                this.storage.set('lang', data);
                this.translate.use(data);
                this.setStoreLang(data);
                console.log(this.userLang);
            }
        });
        alrt.present();
    }

    setStoreLang(lang: string){
        this.storage.set('lang', lang);
        this.userLang = lang;
    }

    getStoreLang(){
 this.storage.get('lang').then(data => this.userLang = data)
    }

    alertToast(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    }

}