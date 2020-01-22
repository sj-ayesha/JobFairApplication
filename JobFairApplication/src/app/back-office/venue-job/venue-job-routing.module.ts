import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VenueJobPage } from './venue-job.page';

const routes: Routes = [
  {
    path: '',
    component: VenueJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VenueJobPageRoutingModule {}
