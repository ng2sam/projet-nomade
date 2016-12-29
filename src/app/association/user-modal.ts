import { Component } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';
import { IUser } from '../shared/models';
import { AuthService } from '../shared/providers';
@Component({
  selector: 'modal-user',
  templateUrl: './user-modal.html'
})
export class UserModal {
  private user: IUser = {} as any;
  constructor(public navCtrl: NavController,
    public alert: AlertController,
    public viewCtrl: ViewController,
    private auth: AuthService) {
    this.user = this.auth.getUser();
  }

  ionViewDidLoad() {
    console.log('Hello user Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  selectLangue() {
    let alrt = this.alert.create();
    alrt.setTitle('Choisissez votre langue');

    alrt.addInput({
      type: 'radio',
      label: 'I speak english',
      value: 'en',
      checked: false
    });
    alrt.addInput({
      type: 'radio',
      label: 'Anigu waan hadli Soomaali',
      value: 'so',
      checked: false
    });
    alrt.addInput({
      type: 'radio',
      label: 'أنا أتكلم العربية',
      value: 'ar',
      checked: false
    });
    alrt.addInput({
      type: 'radio',
      label: 'እኔ አማርኛ መናገር',
      value: 'et',
      checked: false
    });
    
    alrt.addButton('Cancel');
    alrt.addButton({
      text: 'OK',
      handler: data => {
        this.user.locale = data;
        this.auth.saveUserProfile(this.user);
      }
    });
    alrt.present();
  }
}
