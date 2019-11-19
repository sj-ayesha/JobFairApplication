import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidateAddProfilePageRoutingModule } from './candidate-add-profile-routing.module';

import { CandidateAddProfilePage } from './candidate-add-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CandidateAddProfilePageRoutingModule
  ],
  declarations: [CandidateAddProfilePage]
})
export class CandidateAddProfilePageModule {}
