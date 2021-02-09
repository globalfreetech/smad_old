import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MpPage } from './mp.page';

const routes: Routes = [
  {
    path: '',
    component: MpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MpPageRoutingModule {}
