import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateAddProfilePage } from './candidate-add-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CandidateAddProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateAddProfilePageRoutingModule {}
