import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportFilesPageRoutingModule } from './export-files-routing.module';

import { ExportFilesPage } from './export-files.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportFilesPageRoutingModule
  ],
  declarations: [ExportFilesPage]
})
export class ExportFilesPageModule {}
