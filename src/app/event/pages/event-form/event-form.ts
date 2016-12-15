import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'page-event-form',
  templateUrl: 'event-form.html'
})
export class EventFormPage {
  _event;
  form: FormGroup;
  @Input() set event(value) {
    this._event = Object.assign({}, value);
    console.log("valueForm",  value);
  }
  // get a appliquer partout
  get event() {
    return this._event;
  }


  @Output() back = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor(public navCtrl: NavController, private fb: FormBuilder) {

   }

   ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.group({
        name: [this._event[0].name, Validators.minLength(3)]
      })
    });
   }


}
