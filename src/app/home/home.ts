import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'; 
import { Observable } from 'rxjs/rx';

@Component({
  selector: 'page-home',
  templateUrl: './home.html'
})
export class HomePage {

    eventsMenu:  Observable<any>; //Observable<IEvent[]>;
    selectedEventMenu: string;

    constructor(public navCtrl: NavController) {
                  
    }

  ionViewDidLoad() {
    console.log('Hello Home Page');
   

  }


  select(event) {
      console.log(event);
      this.selectedEventMenu = event;
  }

  gotoDetail() {
      //this.router.navigate(['/detail/', this.selectedEvent.id]);
  }
}
