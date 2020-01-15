import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VenueBoPage } from './venue-bo.page';

const routes: Routes = [
  {
    path: '',
    component: VenueBoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VenueBoPageRoutingModule {}
