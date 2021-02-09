import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import {PTimer} from './PTimer';
import { Router } from '@angular/router';
import { GetDataService } from './../Services/get-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EventsService } from './../Services/events.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

@Component({
  selector: 'app-mp',
  templateUrl: './mp.page.html',
  styleUrls: ['./mp.page.scss'],
})
export class MpPage implements OnInit {
  addetails;
 private timeInSeconds: number;
 public timer: PTimer;
 inp;
 inp1;
 out;
 smuserid;
 pointsearned;
 title;
 subtitle;
 timerrun;
 testRadioOpen;
 testRadioResult;
 videoFileSafe;
 mobileno;
 premium;
 smtoken;
 lat;
 lang;
 alertMessage;
 ttl;
 msg;
 mapurl;
 mapurlSafe;
 lnk: string;
 stoptime = 0;

  constructor(private dom: DomSanitizer,
              private DataService: GetDataService,
              private router: Router,
              private photoViewer: PhotoViewer,
              private callNumber: CallNumber,
              public alertController: AlertController,
              public events: EventsService,
              public loadingController: LoadingController) {
                this.mobileno = localStorage.getItem('mobileno');
                this.smtoken = localStorage.getItem('smtoken');
                this.smuserid = localStorage.getItem('smuserid');
                this.addetails = history.state.addetails;
                console.log(this.addetails);
                this.timerrun = history.state.timerrun;
                this.initTimer();
                this.timerrun = 0;
                this.videoFileSafe = this.dom.bypassSecurityTrustResourceUrl(this.addetails.videoFile);
                // tslint:disable-next-line: max-line-length
                this.mapurl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD9Yln70_6N16CRLRsbTIi_xhParnLQCo4&q=' + this.addetails.lat + ',' + this.addetails.lang;
                this.mapurlSafe = this.dom.bypassSecurityTrustResourceUrl(this.mapurl);
              }
              initTimer() {
                if (!this.timeInSeconds) { this.timeInSeconds = this.addetails.points; }

                this.timer = {
                time: this.timeInSeconds,
                runTimer: false,
                hasStarted: false,
                hasFinished: false,
                timeRemaining: this.timeInSeconds
                } as PTimer;
                this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.timeRemaining);
                this.startTimer();
                }
                getSecondsAsDigitalClock(inputSeconds: number) {
                  const secnum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
                  const seconds = secnum;
                  let secondsString = '';
                  secondsString = seconds.toString();
                  return secondsString;
                 }
                 startTimer() {
                  this.timer.hasStarted = true;
                  this.timer.runTimer = true;
                  this.timerTick();
                 }
                 timerTick() {
                  setTimeout(() => {

                 if (!this.timer.runTimer) { return; }
                 this.timer.timeRemaining--;
                 this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.timeRemaining);
                 if (this.timer.timeRemaining > 0 && this.stoptime === 0) {
                  this.timerTick();
                  } else {
                  this.timer.hasFinished = true;

                  if (this.addetails.points > 0 && this.stoptime === 0) {
                    this.pointsearned = this.addetails.points;
                    this.addetails.points = 0;
                    this.inp = {
                 reqid: 40975006,
                 adsId: this.addetails.adsId,
                 smuserid: this.smuserid,
                 description: 'CM Points earned for Reading Ad',
                 mobileno: this.mobileno,
                 smtoken: this.smtoken
                 };
                    this.httpserv();
                 }
                  }
                  }, 1000);
                 }
                 fullimage(item) {
                  this.photoViewer.show(item, '', {share: false});

                }
                public openWithCordovaBrowser() {
                this.lnk = this.addetails.website;
                this.openbrowser(this.lnk);
              }
              pauseTimer() {
                this.timer.runTimer = false;
                }
                async call() {
                  this.pauseTimer();
                  const alert = await this.alertController.create({
                    header: 'Radio',
                    inputs: [
                      {
                        name: 'radio1',
                        type: 'radio',
                        label: 'Phone1',
                        value: this.addetails.advMobile,
                        checked: true
                      },
                    ],
                    buttons: [
                      {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                          console.log('Confirm Cancel');
                        }
                      }, {
                        text: 'CALL',
                        handler: data => {
                          this.testRadioOpen = false;
                          this.testRadioResult = data;
                          console.log(this.testRadioResult);
                        // call
                          this.callNumber.callNumber(this.testRadioResult, false)
                    .then(() => console.log('Launched dialer!', this.testRadioResult))
                    .catch(() => console.log('Error launching dialer', this.testRadioResult));
                        }
                      }
                    ]
                  });
                  await alert.present();
                }
                navigatetoenqpage(): void {
                  this.router.navigate(['enquiry'], {state: {bookingId: this.addetails.bookingId, businessId: 2}});
                }
                favchange(newfav) {
                  this.inp1 = {
                reqid: 40975007,
                adsId: this.addetails.bookingId,
                smuserid: this.smuserid,
                fav_sts: newfav,
                businessId: 2
                };
                  console.log(this.inp1);
                  this.httpserv1(newfav);
                }
                async httpserv() {
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
                  console.log(this.inp);
                  this.DataService.getDetails(this.inp)
             .subscribe (data => {
            this.out = data;
            console.log(this.out);
            if (this.out.Success === '1') {
              const data1 = {
                adsId: this.addetails.adsId
            };
              console.log(data1);
              this.events.publish('pointevent', {frm: 'mp', data1});
              this.title = 'Success';
              this.subtitle = 'Congratulations!!! You have earned ' + this.pointsearned + ' SMAD Cash on this Advertisement.';
          } else {
            if (this.out.Failure === '2') {
          this.title = 'Failure';
          this.subtitle = 'You have already earned SMAD Cash on this Advertisement.';
            } else {
          this.title = 'Failure';
          this.subtitle = 'Technical error.';
            }
          }


            this.presentAlert(this.title, this.subtitle);
            loading.dismiss();
           }, error => {
            loading.dismiss();
            alert('http err');
           });

                }
                async httpserv1(newfav) {
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
                  this.DataService.getDetails(this.inp1)
              .subscribe (res => {
                console.log(res);
                this.addetails.fav_sts = newfav;
                const data1 = {
                  adsId: this.addetails.adsId,
                  fav_sts: this.addetails.fav_sts
              };
                console.log(data1);
                this.events.publish('favevent', {frm: 'mp', data1});
                loading.dismiss();
              }, error => {
                loading.dismiss();
                alert('http err');
              });

                }
                async presentAlert(hdr, subhdr) {
                  const alert = await this.alertController.create({
                  header: hdr,
                  subHeader: subhdr,
                  buttons: ['OK']
                  });
                  await alert.present();
                  }
                  async openbrowser(lnk){
                    await Browser.open({ url: lnk});
                  }
                  backpress(){
                    this.stoptime = 1;
                  }

  ngOnInit() {
  }

}
