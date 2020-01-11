import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'job-list',
    loadChildren: () => import('./pages/job-list/job-list.module').then(m => m.JobListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'job-list/:jobQueryParam',
    loadChildren: () => import('./pages/job-list/job-list.module').then(m => m.JobListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'candidate-list',
    loadChildren: () => import('./pages/candidate-list/candidate-list.module').then(m => m.CandidateListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'candidate-details',
    loadChildren: () => import('./pages/candidate-details/candidate-details.module').then(m => m.CandidateDetailsPageModule)
  },
  {
    path: 'candidate-details/:candidateId',
    loadChildren: () => import('./pages/candidate-details/candidate-details.module').then(m => m.CandidateDetailsPageModule)
  },
  {
    path: 'candidate-add-profile',
    loadChildren: () => import('./pages/candidate-add-profile/candidate-add-profile.module').then(m => m.CandidateAddProfilePageModule)
  },
  {
    path: 'venue',
    loadChildren: () => import('./pages/venue/venue.module').then(m => m.VenuePageModule)
  },  {
    path: 'home-page',
    loadChildren: () => import('./pages/home-page/home-page.module').then( m => m.HomePagePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
