import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VenueJobPageRoutingModule } from './venue-job-routing.module';

import { VenueJobPage } from './venue-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VenueJobPageRoutingModule
  ],
  declarations: [VenueJobPage]
})
export class VenueJobPageModule {}
