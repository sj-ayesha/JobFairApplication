import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Candidate } from 'src/app/model/candidate';
import { Router } from '@angular/router';
import { Venue } from 'src/app/model/venue';
import { CandidateVenueJob } from 'src/app/model/candidateVenueJob';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  categoryTitle: [];

  candidates: Candidate[];
  venues: Venue[];
  candidateVenueJobs: CandidateVenueJob;
  public countCandidates: any;
  public percentagCountCandidates: number;
  noCandidatesAvailable = false;

  constructor(private router: Router, private apiService: ApiService) {

  }

  ngOnInit() {
    this.populateCandidate();
    this.countCandidatesByVenue();
    console.log('HOME');
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
