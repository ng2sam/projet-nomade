import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/rx';
import { AppState } from '../../../shared/providers';
import { IEvent } from '../../../shared/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/providers';
@Component({
  selector: 'page-event-form',
  templateUrl: 'event-form.html'
})
export class EventFormPage implements OnInit {
  private _event;
  private userId: string;
  @Input() public form: FormGroup;
  @Input() set event(value) {
    this._event = Object.assign({}, value);
    if (value) {
      this.form.patchValue(this._event);
    }


  }
  // get a appliquer partout
  get event() {
    return this._event;
  }


  @Output() back = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor(public navCtrl: NavController, private store: Store<AppState>,
     private auth: AuthService) {

       this.userId = this.auth.getUser()._id;
  }

  ngOnInit() {
  }

  close(){
    this.navCtrl.pop();
  }

  onSubmit({ value, valid }: { value: IEvent, valid: boolean }) {
   
    console.log("value",value);
    console.log("_event", this._event);
    if (valid) {
      console.log(this.userId);
      this._event.name = value.name;
      this._event.date = value.date;
      this._event.description = value.description;
      this._event.organisateur = this.userId;
      this._event.eventType =value.eventType;
     // this._event.participants = [this.userId, this.userId]
        this.save.emit(this._event);
        this.close();
    }
    //this._event.name = this.form.controls['name':''];
    // this.save.emit(this._event);

  }


}
