import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NavParams, NavController, FabContainer } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AssociationActions } from '../../../shared/actions';
import { IAssociation } from '../../../shared/models';
import { AppState, AuthService } from '../../../shared/providers';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'page-association-detail',
  templateUrl: 'association-detail.html'
})
export class AssociationDetailPage implements OnInit, OnDestroy {

  idAssociation: Subscription;
  association: Observable<any>;
  editMode = false;
  segmentAssociation: string = "segmentDetail";
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl(Date(), [Validators.required]),
    description: new FormControl(''),
    organisator: new FormControl('', [Validators.required]),
    participant: new FormControl('')
  });


 // @Output() close = new AssociationEmitter();

  constructor(private store: Store<AppState>,
    private _associationActions: AssociationActions,
    public params: NavParams,
    public auth: AuthService,
    public nav: NavController) {
    this.association = this.store.select('association');
   /* console.log("this.association", this.association);
    console.log("this.params.get('param')", this.params);*/
  }

  ionViewWillLeave() {
   // this.close.emit(null);
  }

  ngOnInit() {
    this.idAssociation = Observable.of(this.params.get('param'))
      .subscribe(
      (id) => {
        if (id) {
          console.log("id", id);
          this.store.dispatch(this._associationActions.getAssociation(id));
          // this.editMode = true;
        } else {
           console.log("NON ID");
          this.store.dispatch(this._associationActions.resetBlankAssociation(this.auth.getUser()._id));
          this.editMode = true;
          // this.editMode = false;
        }
      }
      , (err) => console.log(err));
  }

  ngOnDestroy() {
    this.idAssociation.unsubscribe();
  }

  goBack(savedAssociation: IAssociation = null) {
    // this.close.emit(savedAssociation);
    console.log("fddsfsdf");
   // this.nav.pop();
    // if (this.editMode) {  }
  }
  

  goEdit(fab: FabContainer) {
    this.editMode = this.editMode ? this.editMode = false : this.editMode = true;
    fab.close();

  }

  save(association) {
    console.log("fdfds", association);
    if (!association._id) {
      this.store.dispatch(this._associationActions.addAssociation(association));
      console.log("association added");
    } else {
      console.log("association updatedd");
      this.store.dispatch(this._associationActions.saveAssociation(association));
    }
    this.goBack(association);
  }

}
