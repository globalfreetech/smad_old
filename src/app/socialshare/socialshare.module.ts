import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialsharePageRoutingModule } from './socialshare-routing.module';

import { SocialsharePage } from './socialshare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocialsharePageRoutingModule
  ],
  declarations: [SocialsharePage]
})
export class SocialsharePageModule {}
