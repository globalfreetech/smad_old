import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MpPageRoutingModule } from './mp-routing.module';

import { MpPage } from './mp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MpPageRoutingModule
  ],
  declarations: [MpPage]
})
export class MpPageModule {}
