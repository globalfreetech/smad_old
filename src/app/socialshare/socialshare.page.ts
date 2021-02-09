import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-socialshare',
  templateUrl: './socialshare.page.html',
  styleUrls: ['./socialshare.page.scss'],
})
export class SocialsharePage implements OnInit {
  msg;
  mobileno;

  constructor(private socialSharing: SocialSharing) {
  }
  ngOnInit() {
    this.mobileno = localStorage.getItem('mobileno');
    this.msg = 'Hi, Use your mobile number to signup and use my number ' + this.mobileno + ' in referral to get 100 Free CashMash points. Click https://play.google.com/store/apps/details?id=in.skillbiz.cashmash to download the CashMash app for Android or https://itunes.apple.com/in/app/cashmash/id1300776393 for Apple ios.';
  }
  whatsappShare() {
    this.socialSharing.shareViaWhatsApp(this.msg)
      .then(() => {
        // alert("Success");
      },
      () => {
         alert('failed');
      });
  }

  twitterShare() {
    this.socialSharing.shareViaTwitter(this.msg)
    .then(() => {
        // alert("Success");
      },
      () => {
         alert('failed');
      });
  }

  facebookShare() {
    this.socialSharing.shareViaFacebook(this.msg)
    .then(() => {
        // alert("Success");
      },
      () => {
         alert('failed');
      });
  }

  otherShare() {
    this.socialSharing.share(this.msg)
    .then(() => {
        // alert("Success");
      },
      () => {
         alert('failed');
      });

  }

}
