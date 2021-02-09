import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AlertController, Platform, LoadingController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { GetDataService } from './../Services/get-data.service';

const { Device, Geolocation } = Plugins;

declare var SMSReceive: any;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  @ViewChild('ngOtpInput', { static: false }) ngOtpInputRef: any;
  otpAlert: HTMLIonAlertElement;
  verificationID: any;
  enteredOTP: any;
  mobile: any = null;
  refmobile: any = null;
  isRequestToOtp = false;
  msg = '';
  auth: any;
  mobileno: string;
  inp;
  out;
  fbregid: string;
  latitude: any;
  longitude: any;

  constructor(
    public alertController: AlertController,
    private firebaseAuthentication: FirebaseAuthentication,
    private router: Router,
    private platform: Platform,
    private ngZone: NgZone,
    private DataService: GetDataService,
    public loadingController: LoadingController) {}

  ngOnInit() {
  }
  ionViewWillLeave() {
    console.log('HELO');
    this.auth.unsubscribe();
    if (this.ngOtpInputRef) { this.ngOtpInputRef.setValue(null); }
    this.mobile = null;
    this.refmobile = null;
    this.isRequestToOtp = false;
  }
  start(mobile, refmobile) {
    this.msg = '';
    console.log(mobile);
    if (mobile.toString().length > 10) {
      this.msg = 'Number is greater than 10';
      return;
    } else if (mobile.toString().length < 10) {
      this.msg = 'Number is less than 10';
      return;
    }
    // phone verification
    const mob = '+' + '91' + mobile;
    this.refmobile = refmobile;

    console.log(mob);
    this.auth = this.firebaseAuthentication.onAuthStateChanged().subscribe((user) => {
      if (user) {
        console.log(user);
        if (this.ngOtpInputRef) { this.ngOtpInputRef.setValue(null); }
        this.mobile = null;
        this.isRequestToOtp = false;
        localStorage.setItem('mobileno', user.phoneNumber.slice(3));
        this.Service1();
      }
    });
    this.isRequestToOtp = true;
    this.firebaseAuthentication.verifyPhoneNumber(mob, 3000).then((verificationID) => {
      console.log('vID: ' + verificationID);
      this.verificationID = verificationID;
    }).catch((error) => {
      console.log('verifyPhone error ' + error);
    });
    SMSReceive.startWatch(
      () => {
        document.addEventListener('onSMSArrive', (e: any) => {
          const IncomingSMS = e.data;
          this.processSMS(IncomingSMS);
        });
      },
      () => { console.log('watch start failed'); }
    );
  }
  stop() {
    SMSReceive.stopWatch(
      () => { console.log('watch stopped'); },
      () => { console.log('watch stop failed'); }
    );
  }

  processSMS(data) {
    // Check SMS for a specific string sequence to identify it is you SMS
    // Design your SMS in a way so you can identify the OTP quickly i.e. first 6 letters
    // In this case, I am keeping the first 6 letters as OTP
    const message = data.body;
    console.log('SMS RECEIVED', message);
    if (message) {
      this.ngOtpInputRef.setValue(data.body.slice(0, 6));
      this.stop();
    }
  }
  verifyOTP() {
    console.log('ENTERED OTP', this.enteredOTP);
    this.firebaseAuthentication.signInWithVerificationId(this.verificationID, this.enteredOTP).then((user) => {
      console.log('USER===========', user);
    }).catch((error) => {
      alert('verification failed');
    });
  }

  onOtpChange(e) {
    console.log(e);
    this.enteredOTP = e;
  }
  async presentVerifiedAlert() {
    const alert = await this.alertController.create({
      header: 'OTP Verified',
      message: 'Phone no. verified successfully',
      buttons: ['OK']
    });

    await alert.present();
  }
  async Service1() {
    const info = await Device.getInfo();
    console.log(info);
    localStorage.setItem('deviceid', info.uuid);
    this.mobileno = localStorage.getItem('mobileno');
    this.fbregid = localStorage.getItem('fbregid');
    this.getLocation();
    this.inp = {
      reqid: 4097501,
      deviceid: info.uuid,
              mobileno: this.mobileno,
              model: info.model,
              devicename: info.name,
              operatingSystem: info.operatingSystem,
              platform: info.platform,
              manufacturer: info.manufacturer,
              osVersion: info.osVersion,
              isVirtual: info.isVirtual,
              regid: this.fbregid,
              regtype: 'FCM',
              referalmobile: this.refmobile,
              lat: this.latitude,
              lang: this.longitude
      };
    console.log(this.inp);
    this.httpservs();
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
      localStorage.setItem('smuserid', this.out.userid);
      localStorage.setItem('smtoken', this.out.smtoken);
      this.ngZone.run(() => {
        this.router.navigateByUrl('/mpaper');
      });
      loading.dismiss();
    }, error => {
      loading.dismiss();
      alert('http err');
    });

  }
  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log( this.latitude + '...' + this.longitude);
  }

}
