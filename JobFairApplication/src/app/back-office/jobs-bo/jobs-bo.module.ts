import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobsBoPageRoutingModule } from './jobs-bo-routing.module';

import { JobsBoPage } from './jobs-bo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobsBoPageRoutingModule
  ],
  declarations: [JobsBoPage]
})
export class JobsBoPageModule {}
