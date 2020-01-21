import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AuthFrontOfficeGuard } from './services/auth-frontOffice.guard';

const routes: Routes = [
  { path: '', redirectTo: 'venue', pathMatch: 'full' },
  {
    path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthFrontOfficeGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'job-list',
    loadChildren: () => import('./pages/job-list/job-list.module').then(m => m.JobListPageModule),
    canActivate: [AuthFrontOfficeGuard]
  },
  {
    path: 'job-list/:jobQueryParam',
    loadChildren: () => import('./pages/job-list/job-list.module').then(m => m.JobListPageModule),
    canActivate: [AuthFrontOfficeGuard]
  },
  {
    path: 'candidate-list',
    loadChildren: () => import('./pages/candidate-list/candidate-list.module').then(m => m.CandidateListPageModule),
    canActivate: [AuthGuard],
    // canActivate: [AuthFrontOfficeGuard]
  },
  {
    path: 'candidate-details',
    loadChildren: () => import('./pages/candidate-details/candidate-details.module').then(m => m.CandidateDetailsPageModule),
    canActivate: [AuthGuard]
    // canActivate: [AuthFrontOfficeGuard]
  },
  {
    path: 'candidate-details/:candidateId',
    loadChildren: () => import('./pages/candidate-details/candidate-details.module').then(m => m.CandidateDetailsPageModule),
    canActivate: [AuthGuard]
    // canActivate: [AuthFrontOfficeGuard]
  },
  {
    path: 'candidate-add-profile',
    loadChildren: () => import('./pages/candidate-add-profile/candidate-add-profile.module').then(m => m.CandidateAddProfilePageModule),
    canActivate: [AuthFrontOfficeGuard]
  },
  {
    path: 'venue',
    loadChildren: () => import('./pages/venue/venue.module').then(m => m.VenuePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./back-office/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'venue-bo',
    loadChildren: () => import('./back-office/venue-bo/venue-bo.module').then( m => m.VenueBoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'jobs-bo',
    loadChildren: () => import('./back-office/jobs-bo/jobs-bo.module').then( m => m.JobsBoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'skills-bo',
    loadChildren: () => import('./back-office/skills-bo/skills-bo.module').then( m => m.SkillsBoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'venue-popup',
    loadChildren: () => import('./back-office/venue-popup/venue-popup.module').then( m => m.VenuePopupPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'skill-popup',
    loadChildren: () => import('./back-office/skill-popup/skill-popup.module').then( m => m.SkillPopupPageModule)
  },
  {
    path: 'skill-popup/:skillId',
    loadChildren: () => import('./back-office/skill-popup/skill-popup.module').then( m => m.SkillPopupPageModule)
  },
  {
    path: 'jobs-popup',
    loadChildren: () => import('./back-office/jobs-popup/jobs-popup.module').then( m => m.JobsPopupPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
