import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { LoadingController } from '@ionic/angular';
import { GetDataService } from './../Services/get-data.service';

const { Browser } = Plugins;

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  mobileno: string;
  inp;
  smtoken: string;
  deviceid: string;
  smuserid: string;
  constructor(private activatedRoute: ActivatedRoute,
              private DataService: GetDataService,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.mobileno = localStorage.getItem('mobileno');
    this.smtoken = localStorage.getItem('smtoken');
    this.deviceid = localStorage.getItem('deviceid');
    this.smuserid = localStorage.getItem('smuserid');
    this.openBrowser();
    this.inp = {
      reqid: 4097502,
      deviceid: this.mobileno
      };
    console.log(this.inp);
    this.httpservs();
  }
  async openBrowser() {
    // await Browser.open({ url: 'http://smadmag.com/navsari/' });
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
      loading.dismiss();
    }, error => {
      loading.dismiss();
      alert('http err');
    });

  }

}
