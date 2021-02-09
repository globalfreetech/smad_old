import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavouriteadsPage } from './favouriteads.page';

const routes: Routes = [
  {
    path: '',
    component: FavouriteadsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouriteadsPageRoutingModule {}
