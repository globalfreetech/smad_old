import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MpaperPageRoutingModule } from './mpaper-routing.module';

import { MpaperPage } from './mpaper.page';
import { CategorysearchPage } from './../categorysearch/categorysearch.page';
import { PipesModule } from './../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MpaperPageRoutingModule,
    PipesModule
  ],
  declarations: [MpaperPage, CategorysearchPage],
  entryComponents: [CategorysearchPage],
  exports: [CategorysearchPage, PipesModule]
})
export class MpaperPageModule {}
