import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CandidatesService } from '../../services/candidates.service';
import { ApiService } from 'src/app/services/api.service';
import { Candidate } from 'src/app/model/candidate';
import { CandidateVenueJob } from 'src/app/model/candidateVenueJob';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.page.html',
  styleUrls: ['./candidate-list.page.scss'],
})
export class CandidateListPage implements OnInit {
  candidateDetails: any[];
  candidateVenueJobs: CandidateVenueJob[] = [];
  // candidateVenueJobsSort: CandidateVenueJob[];
  public countCandidates: any;
  noCandidatesAvailable = false;
  candidateNotFound = false;
  message: any;

  constructor(
    private router: Router,
    private candidateService: CandidatesService,
    private route: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit() {
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   let id = parseInt(params.get('id'));
    //   this.candidateDetails = this.candidateService.getcandidateDetail();
    //   this.candidateDetails = this.candidateDetails.filter(data => data.id === id);
    // });
    this.populateCandidate();
    this.countCandidatesByVenue();
  }

  onSelect(id: number) {
    this.router.navigate(['/candidate-list', id]);
    this.populateCandidate();
  }

  populateCandidate() {
    // tslint:disable-next-line: radix
    this.apiService.getCandidatesByVenueId(parseInt(window.localStorage.getItem('venue_id')), false).subscribe(data => {
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

  countCandidatesByVenue() {
    // tslint:disable-next-line: radix
    this.apiService.getCountByVenueId(parseInt(window.localStorage.getItem('venue_id'))).subscribe(data => {
      this.countCandidates = data.countCandidates;
    });
  }

  getCandidateByAsc() {
    // tslint:disable-next-line: radix
    this.apiService.getCandidateByASC(parseInt(window.localStorage.getItem('venue_id'))).subscribe(data => {
      this.candidateVenueJobs = data;
    });
  }

  getCandidateByDesc() {
    // tslint:disable-next-line: radix
    this.apiService.getCandidateByDESC(parseInt(window.localStorage.getItem('venue_id'))).subscribe(data => {
      this.candidateVenueJobs = data;
    });
  }

  searchByLastName(lastName: any) {
    this.candidateNotFound = false;
    if (lastName === '') {
      this.populateCandidate();
    } else {
      this.apiService.getCandidateByLastName(lastName).subscribe(data => {
        if (data.message === 'NO_CANDIDATE_AVAILABLE') {
          this.candidateNotFound = true;
        } else {
          this.candidateVenueJobs = data;
        }
      });
    }
  }
}
