import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsBoPage } from './jobs-bo.page';

const routes: Routes = [
  {
    path: '',
    component: JobsBoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsBoPageRoutingModule {}
