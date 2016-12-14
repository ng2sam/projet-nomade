import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-event-form',
  templateUrl: 'event-form.html',
changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventFormPage {
  _event;
  @Input() set event(value) {
    this._event = Object.assign({}, value);
    console.log("valueForm",  this._event);
  }
  get event() {
    return this._event;
  }

  @Output() back = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor(public navCtrl: NavController) { }


}
