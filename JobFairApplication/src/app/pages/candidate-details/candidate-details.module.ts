import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidateDetailsPageRoutingModule } from './candidate-details-routing.module';

import { CandidateDetailsPage } from './candidate-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CandidateDetailsPageRoutingModule
  ],
  declarations: [CandidateDetailsPage]
})
export class CandidateDetailsPageModule {}
