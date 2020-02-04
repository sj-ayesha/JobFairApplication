import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkillsBoPage } from './skills-bo.page';

const routes: Routes = [
  {
    path: '',
    component: SkillsBoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillsBoPageRoutingModule {}
