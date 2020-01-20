import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CandidatesService } from '../../services/candidates.service';
import { ApiService } from 'src/app/services/api.service';
import { Candidate } from 'src/app/model/candidate';
import { CandidateVenueJob, CandidateVenueJobDtoResponseList } from 'src/app/model/candidateVenueJob';
import { IonInfiniteScroll } from '@ionic/angular';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.page.html',
  styleUrls: ['./candidate-list.page.scss'],
})
export class CandidateListPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  candidateDetails: any[];
  candidateVenueJobsLists: CandidateVenueJob[] = [];
  // candidateVenueJob: CandidateVenueJob;
  // candidateVenueJobsSort: CandidateVenueJob[];
  public countCandidates: any;
  noCandidatesAvailable = false;
  candidateNotFound = false;
  message: any;
  public responseData: any;
  public dataSet: [];
  limit = 10;
  page = 0;
  data: any;
  totalPages = 0;

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
    this.apiService.getCandidatesByVenueId(parseInt(window.localStorage.getItem('venue_id')), this.page, this.limit).subscribe(
      (data: CandidateVenueJobDtoResponseList) => {
      this.candidateVenueJobsLists = [...this.candidateVenueJobsLists, ...data.candidateVenueJobDtoList];
      console.log(this.candidateVenueJobsLists);
      console.log('x',data.candidateVenueJobDtoList);
      this.totalPages = data.totalPages;

      if (this.candidateVenueJobsLists.length === 0) {
        this.noCandidatesAvailable = true;
      } else {
        this.noCandidatesAvailable = false;
      }

      if (event) {
        event.target.complete();
      }
    });

  }


  loadData(event) {
    setTimeout(() => {
      this.page++;
      this.populateCandidate(event);
    }, 500);

    if (this.page === this.totalPages) {
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
      this.candidateVenueJobsLists = data;
    });
  }

  getCandidateByDesc() {
    // tslint:disable-next-line: radix
    this.apiService.getCandidateByDESC(parseInt(window.localStorage.getItem('venue_id'))).subscribe(data => {
      this.candidateVenueJobsLists = data;
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
          this.candidateVenueJobsLists = data;
        }
      });
    }
  }
}
