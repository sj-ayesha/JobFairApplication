import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportFilesPage } from './export-files.page';

const routes: Routes = [
  {
    path: '',
    component: ExportFilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportFilesPageRoutingModule {}
