import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OpenAlertService {

  constructor(public alertController: AlertController,
              public loadingController: LoadingController) { }
async presentAlert(hdr, subhdr) {
const alert = await this.alertController.create({
header: hdr,
subHeader: subhdr,
buttons: ['OK']
});
await alert.present();
}
}
