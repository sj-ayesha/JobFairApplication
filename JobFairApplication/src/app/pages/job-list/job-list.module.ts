import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobListPageRoutingModule } from './job-list-routing.module';

import { JobListPage } from './job-list.page';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobListPageRoutingModule, ComponentsModule
  ],
  declarations: [JobListPage]
})
export class JobListPageModule {}
