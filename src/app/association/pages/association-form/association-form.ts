import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/rx';
import { AppState } from '../../../shared/providers';
import { IAssociation } from '../../../shared/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/providers';
@Component({
  selector: 'page-association-form',
  templateUrl: 'association-form.html'
})
export class AssociationFormPage implements OnInit {
  private _association : IAssociation;
  private userId: string;
  @Input() public form: FormGroup;
  @Input() set association(value) {
    this._association = Object.assign({}, value);
    if (value) {
      this.form.patchValue(this._association);
    }


  }
  // get a appliquer partout
  get association() {
    return this._association;
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

  onSubmit({ value, valid }: { value: IAssociation, valid: boolean }) {
   
    console.log("value",value);
    console.log("_association", this._association);
    if (valid) {
      console.log(this.userId);
      this._association.name = value.name;
      this._association.description = value.description;
      this._association.manager = this.userId;
      this._association.members = [this.userId, this.userId]
        this.save.emit(this._association);
    }
    //this._association.name = this.form.controls['name':''];
    // this.save.emit(this._association);

  }


}
