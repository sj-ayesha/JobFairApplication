import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Candidate } from 'src/app/model/candidate';
import { Router } from '@angular/router';
import { Venue } from 'src/app/model/venue';
import { CandidateVenueJob, CandidateVenueJobDtoResponseList } from 'src/app/model/candidateVenueJob';
import { JobCategoryDto } from 'src/app/model/jobCategoryDto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  categoryTitle: [];
  categoryCount: JobCategoryDto;
  noCategory = false;
  softwareEngineer = false;
  manager = false;
  humanResource = false;
  qualityAssurance = false;
  businessAnalyst = false;
  architect = false;
  photos: any[];

  candidates: Candidate[];
  venues: Venue[];
  candidateVenueJobsLists: CandidateVenueJob[];
  candidateVenueJob: CandidateVenueJob;
  public countCandidates: any;
  public percentagCountCandidates: number;
  noCandidatesAvailable = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    ) {
  }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.getCategory();
  }

  ionViewWillLeave() {

  }

  doRefresh(event) {
    this.ionViewWillEnter();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }


  private getCategory(): void {
    this.apiService.getCategoryCount().subscribe(data => {
      if (data.message === 'JOB_NOT_FOUND') {
        this.noCategory = true;
      } else {
        this.categoryCount = data;
        if (this.categoryCount.architect === 1) {
          this.architect = true;
        }
        if (this.categoryCount.softwareEngineer === 1) {
          this.softwareEngineer = true;
        }
        if (this.categoryCount.humanResource === 1) {
          this.humanResource = true;
        }
        if (this.categoryCount.qualityAssurance === 1) {
          this.qualityAssurance = true;
        }
        if (this.categoryCount.businessAnalyst === 1) {
          this.businessAnalyst = true;
        }
        if (this.categoryCount.manager === 1) {
          this.manager = true;
        }
      }
    });
  }

  routeTo(candidateId: number) {
    this.router.navigate(['/candidate-details', candidateId]);
  }

  routeToJob(jobQueryParam: string) {
    this.router.navigate(['/job-list', jobQueryParam]);
  }
}
