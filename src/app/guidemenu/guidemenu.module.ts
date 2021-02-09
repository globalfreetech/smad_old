import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuidemenuPageRoutingModule } from './guidemenu-routing.module';

import { GuidemenuPage } from './guidemenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuidemenuPageRoutingModule
  ],
  declarations: [GuidemenuPage]
})
export class GuidemenuPageModule {}
