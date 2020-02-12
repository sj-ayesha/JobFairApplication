import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AuthFrontOfficeGuard } from './services/auth-frontOffice.guard';


const routes: Routes = [
  { path: '', redirectTo: 'venue', pathMatch: 'full' },
  // {path: '**', redirectTo: 'not-authorized', canActivate: [AuthFrontOfficeGuard]},
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
    data: {
      role: ['HR', 'INTERVIEWER']
    }
  },
  {
    path: 'candidate-details',
    loadChildren: () => import('./pages/candidate-details/candidate-details.module').then(m => m.CandidateDetailsPageModule),
    canActivate: [AuthGuard],
    data: {
      role: ['HR', 'INTERVIEWER']
    }
  },
  {
    path: 'candidate-details/:candidateId',
    loadChildren: () => import('./pages/candidate-details/candidate-details.module').then(m => m.CandidateDetailsPageModule),
    canActivate: [AuthGuard],
    data: {
      role: ['HR', 'INTERVIEWER']
    }
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
    canActivate: [AuthGuard],
    data: {
      role: ['HR', 'MANAGER']
    }
  },
  {
    path: 'venue-bo',
    loadChildren: () => import('./back-office/venue-bo/venue-bo.module').then( m => m.VenueBoPageModule),
    canActivate: [AuthGuard],
    data: {
      role: ['HR']
    }
  },
  {
    path: 'jobs-bo',
    loadChildren: () => import('./back-office/jobs-bo/jobs-bo.module').then( m => m.JobsBoPageModule),
    canActivate: [AuthGuard],
    data: {
      role: ['HR']
    }
  },
  {
    path: 'skills-bo',
    loadChildren: () => import('./back-office/skills-bo/skills-bo.module').then( m => m.SkillsBoPageModule),
    canActivate: [AuthGuard],
    data: {
      role: ['HR']
    }
  },
  {
    path: 'venue-popup',
    loadChildren: () => import('./back-office/venue-popup/venue-popup.module').then( m => m.VenuePopupPageModule),
    canActivate: [AuthGuard],
    data: {
      role: ['HR']
    }
  },
  {
    path: 'skill-popup',
    loadChildren: () => import('./back-office/skill-popup/skill-popup.module').then( m => m.SkillPopupPageModule),
    canActivate: [AuthGuard],
    data: {
      role: ['HR']
    }
  },
  {
    path: 'skill-popup/:skillId',
    loadChildren: () => import('./back-office/skill-popup/skill-popup.module').then( m => m.SkillPopupPageModule),
    canActivate: [AuthGuard],
    data: {
      role: ['HR']
    }
  },
  {
    path: 'jobs-popup',
    loadChildren: () => import('./back-office/jobs-popup/jobs-popup.module').then( m => m.JobsPopupPageModule),
    canActivate: [AuthGuard],
    data: {
      role: ['HR']
    }
  },
  {
    path: 'venue-job',
    loadChildren: () => import('./back-office/venue-job/venue-job.module').then( m => m.VenueJobPageModule),
    canActivate: [AuthGuard],
    data: {
      role: ['HR']
    }
  },
  {
    path: 'export-files',
    loadChildren: () => import('./back-office/export-files/export-files.module').then( m => m.ExportFilesPageModule),
    canActivate: [AuthGuard],
    data: {
      role: ['HR']
    }
  },
  {
    path: 'not-authorized',
    loadChildren: () => import('./pages/not-authorized/not-authorized.module').then( m => m.NotAuthorizedPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
