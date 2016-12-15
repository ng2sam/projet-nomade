import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';



@Injectable()
export class DirectoryServices {
    API_URL:string;
    constructor(private _http: Http, platform: Platform) {
        if(platform.is('android') || platform.is('ios')){
           this.API_URL = 'data/directory.json';
        }else {
            this.API_URL = '/assets/data/directory.json';
        }
        
     }
     
    getContacts(): Observable<any[]> {
        return this._http.get(this.API_URL)
        .map(res => {console.log(res.json()); return res.json()})
        .catch((this.handleError));
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
