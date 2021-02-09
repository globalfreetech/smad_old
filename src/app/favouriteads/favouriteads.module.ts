import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouriteadsPageRoutingModule } from './favouriteads-routing.module';

import { FavouriteadsPage } from './favouriteads.page';
import { CategorysearchPage } from './../categorysearch/categorysearch.page';
import { PipesModule } from './../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouriteadsPageRoutingModule,
    PipesModule
  ],
  declarations: [FavouriteadsPage, CategorysearchPage],
  entryComponents: [CategorysearchPage],
  exports: [CategorysearchPage, PipesModule]
})
export class FavouriteadsPageModule {}
