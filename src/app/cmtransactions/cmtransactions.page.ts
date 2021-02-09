import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { GetDataService } from './../Services/get-data.service';

@Component({
  selector: 'app-cmtransactions',
  templateUrl: './cmtransactions.page.html',
  styleUrls: ['./cmtransactions.page.scss'],
})
export class CmtransactionsPage implements OnInit {items;
  filtereditems;
  mobileno;
  pointsbalance;
  inp;
  smuserid;
  smtoken;
  notitype = '0';
  datain;
  custid;
  out;
  todo;
  msg;
    title: string;
    subtitle: string;
    pointsredeem;
    redeem = 1;
    inptest;


  constructor(private DataService: GetDataService,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.mobileno = localStorage.getItem('mobileno');
    this.smuserid = localStorage.getItem('smuserid');
    this.smtoken = localStorage.getItem('smtoken');
    this.custid = localStorage.getItem('custid');
    this.pgload();
  }
  pgload() {
    this.inp = {
      reqid: 40975017,
      smuserid: this.smuserid,
      mobileno: this.mobileno,
      smtoken: this.smtoken
      };
    console.log('16-', this.inp);
    this.httpserv();
  }
  filterPointItems(type) {
    if (type === '0') {
      this.filtereditems = this.items;
    }
    if (type === '1') {
      this.filtereditems = this.items.filter((item) => {
        return item.subscriberTo === this.smuserid;
    });
    }
    if (type === '2') {
      this.filtereditems = this.items.filter((item) => {
        return item.subscriberFrom === this.smuserid;
    });
    }
    this.notitype = type;
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
                      console.log(res);
                      this.datain = res;
                      this.items = this.datain.transactions;
                      this.filtereditems = this.items;
                      this.pointsbalance = this.datain.pointsbalance;

                      loading.dismiss();
  }, error => {
    loading.dismiss();
    alert('http err');
                    });

  }

}
