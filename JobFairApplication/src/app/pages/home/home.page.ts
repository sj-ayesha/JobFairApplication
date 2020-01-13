import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Candidate } from 'src/app/model/candidate';
import { Router } from '@angular/router';
import { Venue } from 'src/app/model/venue';
import { CandidateVenueJob } from 'src/app/model/candidateVenueJob';
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

  candidates: Candidate[];
  venues: Venue[];
  candidateVenueJobs: CandidateVenueJob;
  public countCandidates: any;
  public percentagCountCandidates: number;
  noCandidatesAvailable = false;

  constructor(private router: Router, private apiService: ApiService) {

  }

  ngOnInit() {
    // this.populateCandidate();
    this.countCandidatesByVenue();
    console.log('onInit Triggered');
  }

  ionViewWillEnter() {
    this.populateCandidate();
    this.countCandidatesByVenue();
    console.log('ionViewWillEnter Triggered');
    this.getCategory();
  
  }
  ionViewWillLeave(){
    console.log('Left');
    this.populateCandidate();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewWillEnter();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  private populateCandidate(): void {
    // tslint:disable-next-line: radix
    this.apiService.getCandidatesByVenueId(parseInt(window.localStorage.getItem('venue_id')), true).subscribe(data => {
      if (data.message === 'NO_CANDIDATE_VENUE_JOB_AVAILABLE') {
        this.noCandidatesAvailable = true;
      } else {
      this.candidateVenueJobs = data;
      }
    });
  }

  private getCategory(): void {
    this.apiService.getCategoryCount().subscribe(data => {
      if (data.message === 'JOB_NOT_FOUND') {
        this.noCategory = true;
      } else {
        this.categoryCount = data;
        if (this.categoryCount.architect == 1){
          this.architect = true;
          console.log(this.architect);
        }
        if (this.categoryCount.softwareEngineer == 1) {
          this.softwareEngineer = true;
          console.log(this.softwareEngineer)
        }
        if (this.categoryCount.humanResource == 1){
          this.humanResource = true;
          console.log(this.humanResource);
        }
        if (this.categoryCount.qualityAssurance == 1) {
          this.qualityAssurance = true;
          console.log(this.qualityAssurance)
        }
        if (this.categoryCount.businessAnalyst == 1){
          this.businessAnalyst = true;
          console.log(this.businessAnalyst);
        }
        if (this.categoryCount.manager == 1) {
          this.manager = true;
          console.log(this.manager)
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

  private countCandidatesByVenue(): void {
    // tslint:disable-next-line: radix
    this.apiService.getCountByVenueId(parseInt(window.localStorage.getItem('venue_id'))).subscribe(data => {
      this.countCandidates = data.countCandidates;
      this.percentagCountCandidates = (this.countCandidates / 100);
    });
  }
}
