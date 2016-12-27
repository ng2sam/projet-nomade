import { Storage } from '@ionic/storage';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { EventActions, ErrorActions } from '../actions';
import { IEvent } from '../models';
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
    lock = new Auth0Lock('Y76wLooWM3ZCxO8aMUSooQdwpsYUoc4s', 'ng2sam-1.eu.auth0.com', {
        auth: {
            redirect: false,
            params: {
                scope: 'openid offline_access email',
            }
        }
    });
    private storage: Storage = new Storage();
    refreshSubscription: any;
    public user: any;
    public idToken: string;
    public userId: string;

    constructor(private authHttp: AuthHttp,
        private store: Store<AppState>,
        private _eventActions: EventActions,
        private _errActions: ErrorActions) {

        // Check if there is a profile saved in local storage
        this.storage.get('profile').then(profile => {
            this.user = profile;
        }).catch(error => {
            console.log(error);
        });

        this.storage.get('id_token').then(token => {
            this.idToken = token;
        });


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

    public isAuthenticated(value: boolean) {
        return value;
    }

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
        this.storage.set('id_user', t.sub);
        this.userId = t.sub;

        this.idToken = token;
        //this.store.dispatch(this._eventActions.loadEvents());
        //this.store.dispatch(this._errActions.loadError());
        // this.scheduleRefresh();
        this.lock.hide();
    }

    getUserId(): string {
        /*return Observable.fromPromise(
             this.storage.get('id_user').then(idUser => {
                 console.log("idUser", idUser);
                 return idUser;
             }).catch(error => console.log("get id_user", error))).map((idUser) => idUser)
         //.catch(error=>console.log("get id_user",error));*/
        return <string>this.user.idTokenPayload.sub;
    }
}