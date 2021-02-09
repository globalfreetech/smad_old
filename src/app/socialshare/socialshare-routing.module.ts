import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialsharePage } from './socialshare.page';

const routes: Routes = [
  {
    path: '',
    component: SocialsharePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialsharePageRoutingModule {}
