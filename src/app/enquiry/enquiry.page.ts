import { Component, OnInit } from '@angular/core';
import { GetDataService } from './../Services/get-data.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.page.html',
  styleUrls: ['./enquiry.page.scss'],
})
export class EnquiryPage implements OnInit {
  inp;
inp1;
items;
items1;
bookingId;
msg: string;
ttl: string;
smuserid;
businessId;
todo;

  constructor(private DataService: GetDataService,
              private location: Location,
              public alertController: AlertController,
              private formBuilder: FormBuilder,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.bookingId = history.state.bookingId;
    this.businessId = history.state.businessId;
    console.log('busidin', this.businessId);
    this.todo = this.formBuilder.group({
                  enqtext: (['', Validators.compose([])]),
                  enqtext1: (['', Validators.compose([])])
                });
    this.items = [
      {
        optionName: 'Advertisement'
      },
      {
        optionName: 'Publish My EPaper'
      },
      {
        optionName: 'CashMash Connect'
      },
      {
        optionName: 'Franchisee'
      },
      {
        optionName: 'Publish My Offer'
      },
      {
        optionName: 'Free CashMash connect Society'
      },
      {
        optionName: 'Other'
      }
    ];
  }
  navigateBack(): void {
    this.smuserid = localStorage.getItem('smuserid');
    this.inp1 = {
reqid: 40975008,
bookingId: this.bookingId,
smuserid: this.smuserid,
enqText: '--' + this.todo.value.enqtext + '--' + this.todo.value.enqtext1,
businessId: this.businessId
};
    console.log(this.inp1);
    this.httpserv1();
    this.presentAlert('Success', 'Enquiry Sent Successfully');
    this.location.back();
}
async httpserv1() {
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
console.log(data);
this.items1 = data;

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

}
