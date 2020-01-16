import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VenueBoPageRoutingModule } from './venue-bo-routing.module';

import { VenueBoPage } from './venue-bo.page';
import { AddVenuePopupComponent } from '../../components/add-venue-popup/add-venue-popup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VenueBoPageRoutingModule,
    ReactiveFormsModule,
  ],
  entryComponents: [AddVenuePopupComponent],
  declarations: [VenueBoPage, AddVenuePopupComponent]
})
export class VenueBoPageModule {}
