import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'page-event-form',
  templateUrl: 'event-form.html'
})
export class EventFormPage implements OnInit {
  _event;
  @Input() public form: FormGroup;
  @Input() set event(value) {
    this._event = Object.assign({}, value);
    if(value){
       this.form.patchValue(this._event);
    }
   
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
   /* this.form = this.fb.group({
      name: this.fb.group({
        name: ['', Validators.minLength(3)]
      })
    });*/
   }


}
