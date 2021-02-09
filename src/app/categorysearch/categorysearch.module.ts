import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorysearchPageRoutingModule } from './categorysearch-routing.module';

import { CategorysearchPage } from './categorysearch.page';
import { PipesModule } from './../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorysearchPageRoutingModule,
    PipesModule
  ],
  // declarations: [CategorysearchPage]
})
export class CategorysearchPageModule {}
