import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CandidatesService } from '../../services/candidates.service';
import { ApiService } from 'src/app/services/api.service';
import { Candidate } from 'src/app/model/candidate';
import { CandidateVenueJob } from 'src/app/model/candidateVenueJob';
import { IonInfiniteScroll } from '@ionic/angular';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.page.html',
  styleUrls: ['./candidate-list.page.scss'],
})
export class CandidateListPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  candidateDetails: any[];
  candidateVenueJobs: CandidateVenueJob[] = [];
  // candidateVenueJobsSort: CandidateVenueJob[];
  public countCandidates: any;
  noCandidatesAvailable = false;
  candidateNotFound = false;
  message: any;
  public responseData: any;
  public dataSet: any;
  increment = 5;

  constructor(
    private router: Router,
    private candidateService: CandidatesService,
    private route: ActivatedRoute,
    private apiService: ApiService) {
    }

  ngOnInit() {
    this.populateCandidate();
    this.countCandidatesByVenue();
  }


  doRefresh(event) {
    this.ngOnInit();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  onSelect(id: number) {
    this.router.navigate(['/candidate-list', id]);
    this.populateCandidate();
  }


  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  populateCandidate(event?) {
    // tslint:disable-next-line: radix
    this.apiService.getCandidatesByVenueId(parseInt(window.localStorage.getItem('venue_id')), 0, this.increment).subscribe(data => {
      if (data.message === 'NO_CANDIDATE_VENUE_JOB_AVAILABLE') {
        this.noCandidatesAvailable = true;
      } else {
        this.candidateVenueJobs = data;
        console.log(this.candidateVenueJobs);
      }
      if (event) {
        event.target.complete();
      }
     });

  }


  loadData(event) {
    setTimeout(() => {
      console.log(event);
      this.increment = this.increment + 5;
      this.populateCandidate(event);
    }, 500);

    if (this.increment === this.countCandidates) {
      event.target.disabled = true;
    }
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
