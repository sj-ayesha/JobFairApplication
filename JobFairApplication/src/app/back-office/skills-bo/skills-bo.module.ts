import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkillsBoPageRoutingModule } from './skills-bo-routing.module';

import { SkillsBoPage } from './skills-bo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkillsBoPageRoutingModule
  ],
  declarations: [SkillsBoPage]
})
export class SkillsBoPageModule {}
