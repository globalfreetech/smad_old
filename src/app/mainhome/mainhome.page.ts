import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { LoadingController } from '@ionic/angular';
import { GetDataService } from './../Services/get-data.service';
import { DomSanitizer } from '@angular/platform-browser';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.page.html',
  styleUrls: ['./mainhome.page.scss'],
})
export class MainhomePage implements OnInit {
  mobileno: string;
  inp;
  smtoken: string;
  deviceid: string;
  smuserid: string;
  latitude: number;
  longitude: number;
  out;
  items;
  areaselect: any;
  public areaUrl: any;
  safeUrl;
  constructor(private DataService: GetDataService,
              public loadingController: LoadingController,
              private dom: DomSanitizer) {
               }

  ngOnInit() {
    this.mobileno = localStorage.getItem('mobileno');
    this.smtoken = localStorage.getItem('smtoken');
    this.deviceid = localStorage.getItem('deviceid');
    this.smuserid = localStorage.getItem('smuserid');
    this.getLocation();
    this.areaUrl = 'https://crm.smadmag.com/smad_mag_read/smad_mag_read.php?lat=' + this.latitude + '&lang=' + this.longitude;
    this.safeUrl = this.dom.bypassSecurityTrustResourceUrl(this.areaUrl);
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
      this.items = this.out.arealist;
      localStorage.setItem('smtoken', this.out.newsmtoken);
      this.areaselect = this.items[0];
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
    this.inp = {
      reqid: 4097502,
      smtoken: this.smtoken,
      lat: this.latitude,
      lang: this.longitude
};
    console.log(this.inp);
    this.httpservs();
  }

}
