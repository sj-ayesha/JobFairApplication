import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

// import { NavComponent } from '../../components/nav/nav.component';
// import { FooterComponent } from '../../components/footer/footer.component';
import { ListCandidateJobComponent } from '../../components/list-candidate-job/list-candidate-job.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    // NavComponent,
    // FooterComponent,
    ListCandidateJobComponent
  ]
})
export class HomePageModule {}
