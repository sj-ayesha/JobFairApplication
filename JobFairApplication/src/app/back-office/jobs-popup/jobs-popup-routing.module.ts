import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsPopupPage } from './jobs-popup.page';

const routes: Routes = [
  {
    path: '',
    component: JobsPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsPopupPageRoutingModule {}
