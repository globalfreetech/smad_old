import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClickwalletPageRoutingModule } from './clickwallet-routing.module';

import { ClickwalletPage } from './clickwallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClickwalletPageRoutingModule
  ],
  declarations: [ClickwalletPage]
})
export class ClickwalletPageModule {}
