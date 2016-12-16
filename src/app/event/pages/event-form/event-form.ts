import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IEvent } from '../../../shared/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-event-form',
  templateUrl: 'event-form.html'
})
export class EventFormPage implements OnInit {
  _event;
  @Input() public form: FormGroup;
  @Input() set event(value) {
    this._event = Object.assign({}, value);
    if (value) {
      this.form.patchValue(this._event);
    }

    console.log("valueForm", value);
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
         name: ['', [Validators.minLength(3), Validators.required]]
     });
  }

  onSubmit({ value, valid }: { value: IEvent, valid: boolean }){
    console.log("submit");
    console.log(value, valid);
    if(valid){
      this._event.name = value.name;
      this.save.emit(this._event);
    }
    //this._event.name = this.form.controls['name':''];
   // this.save.emit(this._event);

  }


}
