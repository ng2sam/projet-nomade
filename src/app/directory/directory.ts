import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
 import { DirectoryServices } from '../shared/providers';

@Component({
  selector: 'page-directory',
  templateUrl: 'directory.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectoryPage {

  contactsByCategorie:  Observable<any[]>;
  selectedContact: any;

  constructor(public navCtrl: NavController, private _directoryService: DirectoryServices) {
    this.contactsByCategorie = this._directoryService.getContacts();
  }


  ionViewDidLoad() {
    console.log('Hello EventPage Page');
    /*this._directoryService.getContacts()
    .subscribe(
      (data) => this.contactsByCategorie
    );*/

  }

  select(contact) {
      console.log(contact);
      this.selectedContact = contact;
  }

  gotoDetail() {
      // this.router.navigate(['/detail/', this.selectedEvent.id]);
  }
}
