import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPopupPageRoutingModule } from './user-popup-routing.module';

import { UserPopupPage } from './user-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPopupPageRoutingModule
  ],
  declarations: [UserPopupPage]
})
export class UserPopupPageModule {}
