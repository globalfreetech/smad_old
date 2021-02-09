import { Component, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ModalController, AlertController, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { GetDataService } from './../Services/get-data.service';
import { EventsService } from './../Services/events.service';
import { Router } from '@angular/router';
import { CategorysearchPage } from './../categorysearch/categorysearch.page';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-mpaper',
  templateUrl: './mpaper.page.html',
  styleUrls: ['./mpaper.page.scss'],
})
export class MpaperPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  mobileno;
  smuserid;
  lat: number;
  long: number;
  transferMsg: any;
  smtoken: any;
  inp;
  datain;
  success;
  items;
  filtereditems;
  areaid;
  areaname;
  pageno = 0;
intro = 0;
animateItems = [];
infinitescr = 1;
categorydata = [];
categorydata1 = [];
pointtype = 0;
favcolor = 'disabled';
pointcolor = 'disabled';
categoryNameRecd = 'Category';
categoryIdRecd;
datafmmpfav;
  datafmmppoint;

  constructor(private DataService: GetDataService,
              public alertController: AlertController,
              public modalController: ModalController,
              public loadingController: LoadingController,
              private router: Router,
              public events: EventsService) { }

  ngOnInit() {
    this.mobileno = localStorage.getItem('mobileno');
    this.smtoken = localStorage.getItem('smtoken');
    this.smuserid = localStorage.getItem('smuserid');
    this.intro = history.state.intro;
    this.transferMsg = history.state.transferMsg;
    if (this.transferMsg) {
      this.presentAlert('Success!!', this.transferMsg);
        }
    this.transferMsg = '';
    const options = {
        enableHighAccuracy: true
        };
    this.getLocation();
  }
  async getLocation() {
    // const position = await Geolocation.getCurrentPosition();
    // this.lat = position.coords.latitude;
    // this.long = position.coords.longitude;
    this.lat = 19.267040;
    this.long = 72.876617;
    console.log( this.lat + '...' + this.long);
    this.inp = {
      reqid: 40975005,
      smuserid: this.smuserid,
      lat: this.lat,
      long: this.long,
      premium: 0,
      mobileno: this.mobileno,
      smtoken: this.smtoken
      };
    console.log('16 All-', this.inp);
    this.httpserv();
  }
  async presentAlert(hdr, subhdr) {
    const alert = await this.alertController.create({
    header: hdr,
    subHeader: subhdr,
    buttons: ['OK']
    });
    await alert.present();
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
        console.log('16out-', this.datain);
        this.success = + this.datain.Success;
        if (this.success === 1) {
          this.items = this.datain.ads;
          this.filtereditems = this.datain.ads;
          this.getcategories();
          this.animtitms();
        }
        console.log(this.datain.Success );
        if ((this.success === 1 || this.success === 0)) {
          this.areaid = this.datain.areaid;
          this.areaname = this.datain.areaname;
        } else {
          this.areaid = 0;
          this.areaname = 0;
        }
        loading.dismiss();
      }, error => {
        loading.dismiss();
        alert('http err');
      });
    }
    animtitms() {
      for (let i = this.pageno * 18; i < this.pageno * 18 + 18; i++) {
        if (this.animateItems.length === this.filtereditems.length) { this.infinitescr = 0; break; }
        this.animateItems.push(this.filtereditems[i]);
        if (this.animateItems.length === this.filtereditems.length) { this.infinitescr = 0; break; }
      }
    }
    getcategories() {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.items.length; i++) {
          this.categorydata1.push(this.items[i].categoryName);
          this.categorydata = this.remove_duplicates(this.categorydata1);
      }
    }
    remove_duplicates(arr) {
      const obj = {};
      const retarr = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < arr.length; i++) {
          obj[arr[i]] = true;
      }
      // tslint:disable-next-line: forin
      for (const key in obj) {
          retarr.push(key);
      }
      return retarr;
  }
  navigatetopage1(pageName, item): void {
    this.router.navigate([pageName], {state: {addetails: item, timerrun: 1}});
  }
  stopBubbling(evt) {
    evt.stopPropagation();
    evt.cancelBubble = true;
  }
  doInfinite(infiniteScroll) {
    setTimeout(() => {
        this.pageno = this.pageno + 1;
        this.animtitms();
        console.log('Done');
        infiniteScroll.target.complete();
    }, 500);
  }
  adenquiry(): void {
    this.router.navigate(['enquiry'], {state: {bookingId: 0, businessId: 0}});
  }
  filterPointItems(type) {
    if (type === 0) {
      this.pointtype = 1;
      this.pointcolor = 'secondary'; } else {
        this.pointtype = 0;
        this.pointcolor = 'disabled'; }
    this.commonfilter();
  }
  commonfilter() {
    if (this.pointtype === 0) {
      console.log(this.categoryNameRecd);
      this.filtereditems = this.items; }
    if (this.pointtype === 1) {
      console.log('0-1');
      this.filtereditems = this.items.filter((item) => {
        return item.points > 0;
    }); }
    if (this.categoryNameRecd !== 'Category') {
      this.filtereditems = this.filtereditems.filter((item) => {
        return (item.categoryName === this.categoryNameRecd);
    }); }
    this.animateItems = [];
    this.pageno = 0;
    this.infinitescr = 1;
    this.animtitms();
  }
  async filterCategory() {
    const modal = await this.modalController.create({
      component: CategorysearchPage,
      componentProps: {
        categorydata: this.categorydata, categoryNameRecd: this.categoryNameRecd
      }
    });
    modal.onDidDismiss().then((d: any) => this.handleModalDismiss(d));
    return await modal.present();
  }
  handleModalDismiss(d) {
    this.categoryNameRecd = d.data.categoryNameRecd;
    this.commonfilter();
  }
  ionViewDidEnter() {
    this.events.subscribe('favevent', (data) => {
      console.log('favevent');
      console.log(data);
      this.datafmmpfav = data;
      if (this.datafmmpfav.frm === 'mp') {
        this.items.find(item => item.adsId === this.datafmmpfav.data1.adsId).fav_sts = this.datafmmpfav.data1.fav_sts;
        this.filtereditems.find(item => item.adsId === this.datafmmpfav.data1.adsId).fav_sts = this.datafmmpfav.data1.fav_sts;
      }
    });
    this.events.subscribe('pointevent', (data) => {
      console.log('favevent');
      console.log(data);
      this.datafmmppoint = data;
      if (this.datafmmppoint.frm === 'mp') {
        this.items.find(item => item.adsId === this.datafmmppoint.data1.adsId).points = 0;
        this.filtereditems.find(item => item.adsId === this.datafmmppoint.data1.adsId).points = 0;
      }
    });
  }

}
