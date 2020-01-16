import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VenuePopupPageRoutingModule } from './venue-popup-routing.module';

import { VenuePopupPage } from './venue-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VenuePopupPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VenuePopupPage]
})
export class VenuePopupPageModule {}
