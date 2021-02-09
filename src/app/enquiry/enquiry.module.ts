import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnquiryPageRoutingModule } from './enquiry-routing.module';

import { EnquiryPage } from './enquiry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnquiryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EnquiryPage]
})
export class EnquiryPageModule {}
