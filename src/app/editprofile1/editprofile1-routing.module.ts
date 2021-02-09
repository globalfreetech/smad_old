import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Editprofile1Page } from './editprofile1.page';

const routes: Routes = [
  {
    path: '',
    component: Editprofile1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Editprofile1PageRoutingModule {}
