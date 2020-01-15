import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VenueBoPageRoutingModule } from './venue-bo-routing.module';

import { VenueBoPage } from './venue-bo.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VenueBoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VenueBoPage]
})
export class VenueBoPageModule {}
