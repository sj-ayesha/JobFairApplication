import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobsPopupPageRoutingModule } from './jobs-popup-routing.module';

import { JobsPopupPage } from './jobs-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobsPopupPageRoutingModule
  ],
  declarations: [JobsPopupPage]
})
export class JobsPopupPageModule {}
