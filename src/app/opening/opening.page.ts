import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { GetDataService } from './../Services/get-data.service';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-opening',
  templateUrl: './opening.page.html',
  styleUrls: ['./opening.page.scss'],
})
export class OpeningPage implements OnInit {
  mobileno: string;
  inp;
  smtoken;
  out;
  blk: number;
  constructor(private router: Router,
              private DataService: GetDataService,
              public loadingController: LoadingController) { }

  ngOnInit() {
//  // Request permission to use push notifications
//     // iOS will prompt user and return if they granted permission or not
//     // Android will just grant without prompting
//     PushNotifications.requestPermission().then(result => {
//       if (result.granted) {
//         // Register with Apple / Google to receive push via APNS/FCM
//         PushNotifications.register();
//       } else {
//         // Show some error
//       }
//     });

// // On success, we should be able to receive notifications
//     PushNotifications.addListener(
//       'registration',
//       (token: PushNotificationToken) => {
//            localStorage.setItem('fbregid', token.value);
//            alert('Push registration success, token: ' + token.value);
//       },
//     );
// // Some issue with our setup and push will not work
//     PushNotifications.addListener('registrationError', (error: any) => {
//       alert('Error on registration: ' + JSON.stringify(error));
//     });
// // Show us the notification payload if the app is open on our device
//     PushNotifications.addListener(
//       'pushNotificationReceived',
//       (notification: PushNotification) => {
//         alert('Push received: ' + JSON.stringify(notification));
//       },
//     );
//     // Method called when tapping on a notification
//     PushNotifications.addListener(
//       'pushNotificationActionPerformed',
//       (notification: PushNotificationActionPerformed) => {
//         alert('Push action performed: ' + JSON.stringify(notification));
//       },
//     );
   localStorage.setItem('mobileno', '9324142404'); // to be removeddddddddddd
   localStorage.setItem('deviceid', '9d6add0a7bd8925c'); // to be removeddddddddddd
   localStorage.setItem('smuserid', '3'); // to be removeddddddddddd
   this.mobileno = localStorage.getItem('mobileno');
   if (this.mobileno) {
    this.smtoken = localStorage.getItem('smtoken');
    this.inp = {
      reqid: 40975003,
      smtoken: this.smtoken,
      appversion: '1.0.0'
};
    console.log(this.inp);
    this.httpservs();
   }else{
     this.router.navigate(['/registration'], {replaceUrl: true});
   }

  }
  async httpservs() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
  message: `
      <div class="custom-spinner-box">
      <img src="assets/images/CashMash-AppLogo.png"class="spinnerimg">
    </div>
    `,
    cssClass: 'custom-loader'
    });
    await loading.present();
    this.DataService.getDetails(this.inp)
    .subscribe (res => {
      console.log(res);
      this.out = res;
      console.log(this.out);
      localStorage.setItem('smtoken', this.out.newsmtoken);
      localStorage.setItem('custid', this.out.custid);
      localStorage.setItem('userdetails', this.out);
      loading.dismiss();
      this.blk = +this.out.block;
      // if (this.blk === 0) {
      this.router.navigate(['/mpaper'], {replaceUrl: true});
                      // }else {
                      //   alert('User Blocked');
                      // }
    }, error => {
      loading.dismiss();
      alert('http err');
    });

  }

}
