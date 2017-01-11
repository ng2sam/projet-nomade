import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NavParams, NavController, FabContainer } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { EventActions } from '../../../shared/actions';
import { IEvent } from '../../../shared/models';
import { AppState, AuthService } from '../../../shared/providers';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage implements OnInit, OnDestroy {

  idEvent: Subscription;
  event: Observable<any>;
  editMode = false;
  segmentEvent: string = "segmentDetail";
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl(Date(), [Validators.required]),
    description: new FormControl(''),
    eventType: new FormControl(0),
    organisateur: new FormControl('')/*,
    participant: new FormControl('')*/
  });


 // @Output() close = new EventEmitter();

  constructor(private store: Store<AppState>,
    private _eventActions: EventActions,
    public params: NavParams,
    public auth: AuthService,
    public nav: NavController) {
    this.event = this.store.select('event');
   /* console.log("this.event", this.event);
    console.log("this.params.get('param')", this.params);*/
  }

  ionViewWillLeave() {
   // this.close.emit(null);
  }

  ngOnInit() {
    this.idEvent = Observable.of(this.params.get('param'))
      .subscribe(
      (id) => {
        if (id) {
          console.log("id", id);
          this.store.dispatch(this._eventActions.getEvent(id));
          // this.editMode = true;
        } else {
           console.log("NON ID");
          this.store.dispatch(this._eventActions.resetBlankEvent(this.auth.getUser()._id));
          this.editMode = true;
          // this.editMode = false;
        }
      }
      , (err) => console.log(err));
  }

  ngOnDestroy() {
    this.idEvent.unsubscribe();
  }

  goBack(savedEvent: IEvent = null) {
    // this.close.emit(savedEvent);
    console.log("fddsfsdf");
   // this.nav.pop();
    // if (this.editMode) {  }
  }
  

  goEdit(fab: FabContainer) {
    this.editMode = this.editMode ? this.editMode = false : this.editMode = true;
    fab.close();

  }

  save(event) {
    console.log("fdfds", event);
    if (!event._id) {
      this.store.dispatch(this._eventActions.addEvent(event));
      console.log("event added");
    } else {
      console.log("event updatedd");
      this.store.dispatch(this._eventActions.saveEvent(event));
    }
    this.goBack(event);
  }

  close(){
    this.nav.pop();
  }

}
