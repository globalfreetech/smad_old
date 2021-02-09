import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { GetDataService } from './../Services/get-data.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Plugins } from '@capacitor/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';

const { Geolocation } = Plugins;
const { Browser } = Plugins;

@Component({
  selector: 'app-myads',
  templateUrl: './myads.page.html',
  styleUrls: ['./myads.page.scss'],
})
export class MyadsPage implements OnInit {
  smtoken: any;
  smuserid: any;
  mobileno: any;
  inp;
  items;
  ttl;
 msg;
 txt;
 inp4;
  premium: number;
  inp2;
  out1;
  title: string;
  subtitle: string;
  lat;
  lang;
  inp5;
  out2;
  alertMessage: string;
  out4;
  success: number;
  datain;
  adupload: any;
  addesign: any;
  clickbalance: any;
  inp1;
  stageitems;
  out;
  inp3;
  out3;
lnk: string;

  constructor(private DataService: GetDataService,
              public loadingController: LoadingController,
              public alertController: AlertController,
              private callNumber: CallNumber,
              private router: Router,
              private photoViewer: PhotoViewer) { }

  ngOnInit() {
    this.mobileno = localStorage.getItem('mobileno');
    this.smtoken = localStorage.getItem('smtoken');
    this.smuserid = localStorage.getItem('smuserid');
    this.pgload();
  }
  pgload() {
    this.inp = {
      reqid: 40975010,
      smuserid: this.smuserid,
      mobileno: this.mobileno,
      smtoken: this.smtoken
      };
    console.log('10 my ads-', this.inp);
    this.httpserv();
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
    this.DataService.getDetails(this.inp)
    .subscribe (data => {
      this.datain = data;
      this.success = + this.datain.Success;
      if (this.success === 1) {
        this.items = this.datain.ads;
        this.stageitems = this.datain.stagename;
        this.adupload = this.datain.ad_upload;
        this.addesign = this.datain.ad_design;
        this.clickbalance = this.datain.click_balance;
      }
      console.log(this.datain.Success );
      console.log('10out-', this.items);
      loading.dismiss();
    }, error => {
      loading.dismiss();
      alert('http err');
    });

  }
  fullimage(item) {
    this.photoViewer.show(item, '', {share: false});

  }
  async presentConfirm(type, adid) {
    console.log(type);
    if (type === 1) {
  this.ttl = 'Pause Ad';
  this.msg = 'You are about to pause your ad. You can cancel it by pressing Play later.';
    }
    if (type === 2) {
      this.ttl = 'Play Ad';
      this.msg = 'You are about to resume your ad.';
        }
    if (type === 3) {
              this.ttl = 'Update location';
              this.msg = 'You are about to update location in your Ad. Proceed only if you are at your Business location.';
                }
    const alert = await this.alertController.create({
                  header: this.ttl,
                  message: this.msg,
                  buttons: [
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                      }
                    }, {
                      text: 'Proceed',
                      handler: () => {
                        console.log('Confirm Okay');
                        if (type === 1) {
                          this.pauseresumead(3, adid);
                            }
                        if (type === 2) {
                              this.pauseresumead(1, adid);
                                }
                        if (type === 3) {
                                      this.updatelocation(adid);
                                        }
                      }
                    }
                  ]
                });
    await alert.present();
  }
  async presentConfirm1(adid, premum, bookid) {
  this.ttl = 'Change Design';
  this.msg = 'You are about to request for design change.' + '<br>' +
  'Self Design - ' + this.adupload + ' Clicks will be deducted for Uploading Design provided by you.' + '<br>' +
  'New Design by CashMash - ' + this.addesign + ' Clicks will be deducted for New Designing by CashMash Designer.';
  const alert = await this.alertController.create({
                  header: this.ttl,
                  message: this.msg,
                  buttons: [
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                      }
                    }, {
                      text: 'Self Design',
                      handler: () => {
                        console.log('Confirm Okay');
                        this.reqNewDesign(adid, premum, bookid, 1, this.adupload);
                      }
                    }, {
                      text: 'New Design by CashMash',
                      handler: () => {
                        console.log('Confirm Okay');
                        this.reqNewDesign(adid, premum, bookid, 0, this.addesign);
                      }
                    }
                  ]
                });
  await alert.present();
  }
  pauseresumead(type, adid) {


    this.inp4 = {
      reqid: 40975011,
      mobileno: this.mobileno,
      adsId: adid,
      active: type,
      smtoken: this.smtoken
      };
    console.log('p', this.inp4);
    this.httpserv4(type, adid);
  }
  reqNewDesign(adid, premum, bookid, type, clickdeduct) {
    console.log(this.clickbalance);
    console.log(clickdeduct);
    if (+this.clickbalance >= +clickdeduct) {
    if (premum === 'noimage') {
this.premium = 0;
    } else {
      this.premium = 1;
    }
    this.inp2 = {
    reqid: 40975012,
    mobileno: this.mobileno,
    adsId: adid,
    bookingId: bookid,
    type: this.premium,
    selfdesign: type,
    clkstobededucted: clickdeduct * (-1),
    smtoken: this.smtoken
    };
    console.log(this.inp2);
    this.httpserv2(adid);
  } else {
    this.presentAlert('Insufficient Balance', 'Minimum Click Balance required to execute the request is ' + clickdeduct);
  }
}
async updatelocation(adid) {
const options = {
enableHighAccuracy: true
};
const position = await Geolocation.getCurrentPosition();
this.lat = position.coords.latitude;
this.lang = position.coords.longitude;

this.inp5 = {
  reqid: 40975013,
  mobileno: this.mobileno,
  smtoken: this.smtoken,
  adsId: adid,
  lat: this.lat,
  lang: this.lang,
  type: 'ads'
};
console.log(this.inp5);
this.httpserv5(adid);
}
async httpserv2(adid) {
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
  this.DataService.getDetails(this.inp2)
.subscribe (res => {
  this.out1 = res;
  console.log(res);
  if (this.out1.success === 1) {
    this.pgload();
    // this.clickbalance = this.out1.click_balance;
    // console.log(this.clickbalance);
    // this.items.find(item => item.adsId === adid).new_adsId = this.out1.new_adsId;
    this.title = 'New Design request placed Successfully';
    // tslint:disable-next-line: max-line-length
    this.subtitle = 'Updated Click Balance is ' + this.clickbalance;
    } else {
      if (this.out1.success === 0) {
    this.title = 'Failure';
    this.subtitle = 'You do not have sufficient Click Balance. Please contact CashMash Advisor';
      } else {
        if (this.out1.success === -1) {
          this.title = 'Failure';
          this.subtitle = 'Duplicate Request. Please contact CashMash Advisor';
            }
      }
    }
  this.presentAlert(this.title, this.subtitle);
  loading.dismiss();
}, error => {
  loading.dismiss();
  alert('http err');
});

}
async httpserv4(type, adid) {
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
  this.DataService.getDetails(this.inp4)
  .subscribe (data => {
    console.log(data);
    // this.items.find(item => item.adsId === adid).active = type;
    this.out4 = data;
    this.pgload();
    if (type === 3) {
      this.title = 'AD Pause';
      } else {
      this.title = 'AD Resume';
      }
    if (this.out4.success === 1) {
      this.subtitle = 'Successful';
      } else {
      this.subtitle = 'Failure';
      }

    this.presentAlert(this.title, this.subtitle);
    loading.dismiss();
  }, error => {
    loading.dismiss();
    alert('http err');
  });

}
async httpserv5(adid) {
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
  this.DataService.getDetails(this.inp5)
    .subscribe (data => {
      console.log(data);
      this.out2 = data;
      // result
      if (this.out2.Success === '1') {
        this.pgload();
        // this.items.find(item => item.adsId === adid).lat = this.lat;
        // this.items.find(item => item.adsId === adid).lang = this.lang;
        this.alertMessage = 'Location updated Successfully';
  } else {
    if (this.out2.Success === '1') {
      // tslint:disable-next-line: max-line-length
      this.alertMessage = 'Error in Location Update..Please restart app and try again. If problem persists, contact CashMash Advisor.';
  } else {
    this.alertMessage = 'device error... contact CashMash Advisor';
  }
  }
      this.presentAlert('Update Location', this.alertMessage);
      loading.dismiss();
}, error => {
loading.dismiss();
alert('http err');
    });
}

async approve(type, item) {
  if (type === 5) {
      this.ttl = 'Ad Approval!!!';
      this.msg = 'Once approved, Ad will be published immediately and no further changes will be possible.';
      this.txt = 'Proceed to Approve';
    }
  if (type === 4) {
      this.ttl = 'Ad Changes';
      this.msg = 'Request more changes in Ad? Please add your comments on changes if not done..';
      this.txt = 'Proceed to request changes';
    }
  const alert = await this.alertController.create({
      header: this.ttl,
      message: this.msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.txt,
          handler: () => {
            this.approveok(type, item);
          }
        }
      ]
    });
  await alert.present();
}
approveok(type, item) {
  this.inp1 = {
    reqid: 40975015,
    mobileno: this.mobileno,
    bookingId: item.bookingId,
    adsId: item.adsId,
    stageId: type,
    smtoken: this.smtoken
    };
  console.log('35-', this.inp1);
  this.httpserv1(type);
}
async httpserv1(type) {
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
      .subscribe (data => {
        this.out = data;
        console.log(data);
        if (this.out.success === 1) {
          if (type === 5) {
            this.alertMessage = 'Successfully removed old Ad & Published New Ad Approved by you.';
          }
          if (type === 4) {
            this.alertMessage = 'Change request placed successfully. CashMash designer will contact you.';
            }
          this.presentAlert('Approval status', this.alertMessage);
          this.pgload();
        } else {
          this.presentAlert('Approval Error', '');
        }
        loading.dismiss();
}, error => {
loading.dismiss();
alert('http err');
    });
}
async presentConfirm2(bookid) {
  this.ttl = 'Change Ad Timing';
  this.msg = 'You are about to request for Ad timing change.' + '<br>' +
   'Clicks will be deducted as per Ad Timing.';
  const alert = await this.alertController.create({
                  header: this.ttl,
                  message: this.msg,
                  buttons: [
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                      }
                    }, {
                      text: '15 seconds = 1 Click',
                      handler: () => {
                        console.log('Confirm Okay');
                        this.reqNewTiming(bookid, 15);
                      }
                    }, {
                      text: '30 seconds = 2 Clicks',
                      handler: () => {
                        console.log('Confirm Okay');
                        this.reqNewTiming(bookid, 30);
                      }
                    }, {
                      text: '45 seconds = 3 Clicks',
                      handler: () => {
                        console.log('Confirm Okay');
                        this.reqNewTiming(bookid, 45);
                      }
                    }, {
                      text: '60 seconds = 4 Clicks',
                      handler: () => {
                        console.log('Confirm Okay');
                        this.reqNewTiming(bookid, 60);
                      }
                    }
                  ]
                });
  await alert.present();
  }
  reqNewTiming(bookid, tme) {
    this.inp3 = {
    reqid: 40975016,
    mobileno: this.mobileno,
    bookingId: bookid,
    timee: tme,
    smtoken: this.smtoken
    };
    console.log(this.inp3);
    this.httpserv3(tme);
  }
  async httpserv3(tme) {
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
    this.DataService.getDetails(this.inp3)
  .subscribe (res => {
    this.out3 = res;
    console.log(res);
    if (this.out3.success === 1) {
      this.pgload();
      this.title = 'Ad timing Changed Successfully';
      this.subtitle = 'Updated Time is ' + tme;
      } else {
      this.title = 'Failure';
      this.subtitle = 'Ad time not changed.';
      }
    this.presentAlert(this.title, this.subtitle);
    loading.dismiss();
  }, error => {
    loading.dismiss();
    alert('http err');
  });

  }
  public async openWithCordovaBrowser() {
    // tslint:disable-next-line: max-line-length
    this.lnk = 'https://cm.skillbizonline.net/form_ad_booking_serv/form_ad_booking_serv.php?cmapi=' + this.smtoken + '&mobileno=' + this.mobileno + '&smuserid=' + this.smuserid;
    await Browser.open({ url: this.lnk });
  }
  async presentAlert(hdr, subhdr) {
    const alert = await this.alertController.create({
    header: hdr,
    subHeader: subhdr,
    buttons: ['OK']
    });
    await alert.present();
    }

}
