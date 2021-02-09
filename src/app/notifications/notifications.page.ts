import { Component, OnInit } from '@angular/core';
import { GetDataService } from './../Services/get-data.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  inp;
  inp1;
  smuserid;
  smtoken;
  items;
  filtereditems;
  indx;

  constructor(private DataService: GetDataService,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.smuserid = localStorage.getItem('smuserid');
    this.smtoken = localStorage.getItem('smtoken');
    this.inp = {
      reqid: 40975020,
      smtoken: this.smtoken
    };
    console.log(this.inp);
    this.httpserv();
  }
  delete = (item: any): void => {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.indx = index;

      this.inp1 = {
          reqid: 40975021,
          smtoken: this.smtoken,
          notiid: item.notificationsId
        };
      console.log(this.inp1);
      this.httpserv1(this.indx);
    }
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
                  this.items = data;
                  console.log(this.items);
                  this.filtereditems = this.items;

                  loading.dismiss();
                }, error => {
                  loading.dismiss();
                  alert('http err');
                });

  }
  async httpserv1(indxx) {
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
                      this.items.splice(indxx, 1);
                      this.filtereditems.splice(indxx, 1);
                      loading.dismiss();
                    }, error => {
                      loading.dismiss();
                      alert('http err');
                    });

  }
}
