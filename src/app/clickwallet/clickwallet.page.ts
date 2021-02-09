import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { GetDataService } from './../Services/get-data.service';

@Component({
  selector: 'app-clickwallet',
  templateUrl: './clickwallet.page.html',
  styleUrls: ['./clickwallet.page.scss'],
})
export class ClickwalletPage implements OnInit {
  smtoken: any;
  custid: any;
  mobileno: any;
  deviceid: any;
  inp;
  datain;
  clickbalance: any;
  clickrecharge: any;
  clickdesigns: any;
  clickviews: any;
  items;
  filtereditems;
  notitype = 0;

  constructor(private DataService: GetDataService,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.mobileno = localStorage.getItem('mobileno');
    this.smtoken = localStorage.getItem('smtoken');
    this.custid = localStorage.getItem('custid');
    console.log(this.custid);
    this.inp = {
      reqid: 40975014,
      custid: this.custid,
      mobileno: this.mobileno,
      smtoken: this.smtoken
      };
    console.log('14 click wallet-', this.inp);
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
    .subscribe (res => {
      this.datain = res;
      this.clickbalance = this.datain.click_balance;
      this.clickrecharge = this.datain.click_recharge;
      this.clickdesigns = this.datain.click_designs;
      this.clickviews = this.datain.click_views;
      this.items = this.datain.transactions;
      this.filtereditems = this.items;
      console.log('14 click wallet-', this.datain);
      loading.dismiss();
    }, error => {
      loading.dismiss();
      alert('http err');
    });
  }
  filterItems(type) {
    if (type === '0') {
      this.filtereditems = this.items;
    }
    if (type === '1') {
      this.filtereditems = this.items.filter((item) => {
        return item.clicks > '0';
    });
    }
    if (type === '2') {
      this.filtereditems = this.items.filter((item) => {
        return item.clicks < '0';
    });
    }
    this.notitype = type;
  }

}
