import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-categorysearch',
  templateUrl: './categorysearch.page.html',
  styleUrls: ['./categorysearch.page.scss'],
})
export class CategorysearchPage implements OnInit {
  items;
  areaid;
  inp;
  mobileno;
  deviceid;
  categorytype;
  categorydata;
  token;
  itemsget;
  categoryNameRecd;

  constructor(public modalController: ModalController) {
    this.categoryNameRecd = history.state.categoryNameRecd;
    this.categorydata = history.state.itemsget;
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.categorydata = this.itemsget;
    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.categorydata = this.categorydata.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
  popback(categoryNameRecd) {
    const data = {
      categoryNameRecd
  };
    this.modalController.dismiss(data);
  }

ngOnInit() {
}

}
