import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { IEvent } from '../../../shared/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/providers';
@Component({
  selector: 'page-event-form',
  templateUrl: 'event-form.html'
})
export class EventFormPage implements OnInit {
  _event;
  storage: Storage = new Storage();
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

  constructor(public navCtrl: NavController, private fb: FormBuilder, private auth: AuthService) {
    this.storage.get('profile').then(profile => {
      let user = JSON.parse(profile);
      console.log(user);
       this.auth.getUserProfile(user);
    }).catch(error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.required]],
      date: [Date.now()],
      description: [''],
      organisatorId:['']
    });
  }

  onSubmit({ value, valid }: { value: IEvent, valid: boolean }) {
   
    console.log(value, valid);
    console.log("_event", this._event);
    if (valid) {
      this._event.name = value.name;
      this._event.date = value.date;
      this._event.description = value.description;
      this._event.organisatorId = "5856873d7a2abf0100a52d0e";
        this.save.emit(this._event);
    }
    //this._event.name = this.form.controls['name':''];
    // this.save.emit(this._event);

  }


}
