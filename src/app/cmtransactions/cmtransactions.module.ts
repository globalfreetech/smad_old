import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CmtransactionsPageRoutingModule } from './cmtransactions-routing.module';

import { CmtransactionsPage } from './cmtransactions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CmtransactionsPageRoutingModule
  ],
  declarations: [CmtransactionsPage]
})
export class CmtransactionsPageModule {}
