import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VenuePopupPage } from './venue-popup.page';

const routes: Routes = [
  {
    path: '',
    component: VenuePopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VenuePopupPageRoutingModule {}
