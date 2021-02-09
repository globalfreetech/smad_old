import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Editprofile1PageRoutingModule } from './editprofile1-routing.module';

import { Editprofile1Page } from './editprofile1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Editprofile1PageRoutingModule
  ],
  declarations: [Editprofile1Page]
})
export class Editprofile1PageModule {}
