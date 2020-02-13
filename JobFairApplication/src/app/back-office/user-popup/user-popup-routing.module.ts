import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPopupPage } from './user-popup.page';

const routes: Routes = [
  {
    path: '',
    component: UserPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPopupPageRoutingModule {}
