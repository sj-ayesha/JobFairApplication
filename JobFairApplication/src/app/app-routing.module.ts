import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'job-list',
    loadChildren: () => import('./pages/job-list/job-list.module').then( m => m.JobListPageModule)
  },
  {
    path: 'job-list/:jobQueryParam',
    loadChildren: () => import('./pages/job-list/job-list.module').then( m => m.JobListPageModule)
  },
  {
    path: 'candidate-list',
    loadChildren: () => import('./pages/candidate-list/candidate-list.module').then( m => m.CandidateListPageModule)
  },
  {
    path: 'candidate-details',
    loadChildren: () => import('./pages/candidate-details/candidate-details.module').then( m => m.CandidateDetailsPageModule)
  },
  {
    path: 'candidate-details/:candidateId',
    loadChildren: () => import('./pages/candidate-details/candidate-details.module').then( m => m.CandidateDetailsPageModule)
  },
  {
    path: 'candidate-add-profile',
    loadChildren: () => import('./pages/candidate-add-profile/candidate-add-profile.module').then( m => m.CandidateAddProfilePageModule)
  },
  {
    path: 'venue',
    loadChildren: () => import('./pages/venue/venue.module').then( m => m.VenuePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
