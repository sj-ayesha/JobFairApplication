import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidatesService } from '../../services/candidates.service';
import { ApiService } from 'src/app/services/api.service';
import { Candidate, CandidateResponseList } from 'src/app/model/candidate';
import { CandidateVenueJob, CandidateVenueJobDtoResponseList } from 'src/app/model/candidateVenueJob';
import { IonInfiniteScroll } from '@ionic/angular';
import { Venue } from 'src/app/model/venue';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.page.html',
  styleUrls: ['./candidate-list.page.scss'],
})
export class CandidateListPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  candidateDetails: any[];
  candidateVenueJobsLists: CandidateVenueJob[] = [];
  candidateVenueJobsListVENUE: CandidateVenueJob[] = [];
  candidateVenueJobsListsASC: CandidateVenueJob[] = [];
  candidateVenueJobsListsSDESC: CandidateVenueJob[] = [];
  allCandidates: Candidate[] = [];
  venues: Venue[];
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
  pageVenue = 0;
  pageASC = 0;
  pageDESC = 0;
  data: any;
  totalPages = 0;
  filterText: number;

  resetASC = false;
  resetDESC = false;
  resetAll = true;
  resetVenue = false;

  subAll: Subscription;
  subASC: Subscription;
  subDESC: Subscription;

  constructor(
    private router: Router,
    private candidateService: CandidatesService,
    private route: ActivatedRoute,
    private apiService: ApiService) {
  }

  ngOnInit() {
    // this.populateCandidate();
    // this.countCandidatesByVenue();
    this.populateAllCandidates();
    this.getVenueByActive();
  }


  doRefresh(event) {
    this.ngOnInit();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  onSelect(id: number) {
    this.router.navigate(['/candidate-list', id]);
    this.populateCandidateByVenue();
  }

  routeTo(candidateId: number) {
    this.router.navigate(['/candidate-details', candidateId]);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  //FOR ALL CANDIDATES
  populateAllCandidates(event?) {
    this.resetAll = true;
    this.resetASC = false;
    this.resetDESC = false;
    this.resetVenue = false;
    this.subAll = this.apiService.getAllCandidatesVenueJob(this.page, this.limit).subscribe(
      (data: CandidateVenueJobDtoResponseList) => {
        this.candidateVenueJobsLists = [...this.candidateVenueJobsLists, ...data.candidateVenueJobDtoList];
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
      this.populateAllCandidates(event);
    }, 500);

    if (this.page === this.totalPages) {
      event.target.disabled = true;

    }
  }

  // VENUE 
  getVenueByActive() {
    this.apiService.getVenueByActive(true).subscribe(data => {
      this.venues = data;
    });
  }



  // FOR CANDIDATES BASED ON VENUE
  filterByVenue(event) {
    this.filterText = event.target.value;
    if (this.filterText == 0) {
      this.resetAll = true;
      this.resetASC = false;
      this.resetDESC = false;
      this.resetVenue = false;
      this.populateAllCandidates();
    } else {
      this.candidateVenueJobsLists = [];
      this.populateCandidateByVenue();
    }
  }


  populateCandidateByVenue(event?) {
    this.resetAll = false;
    this.resetASC = false;
    this.resetDESC = false;
    this.resetVenue = true;
    // tslint:disable-next-line: radix
    this.apiService.getCandidatesByVenueId(this.filterText, this.pageVenue, this.limit).subscribe(
      (data: CandidateVenueJobDtoResponseList) => {
        this.candidateVenueJobsListVENUE = [...this.candidateVenueJobsListVENUE, ...data.candidateVenueJobDtoList];
        this.totalPages = data.totalPages;

        if (this.candidateVenueJobsListVENUE.length === 0) {
          this.noCandidatesAvailable = true;
        } else {
          this.noCandidatesAvailable = false;
        }

        if (event) {
          event.target.complete();
        }
      });

  }

  loadDataByVenue(event) {
    setTimeout(() => {
      this.pageVenue++;
      this.populateCandidateByVenue(event);
    }, 500);

    if (this.pageVenue === this.totalPages) {
      event.target.disabled = true;

    }
  }

  countCandidatesByVenue() {
    // tslint:disable-next-line: radix
    this.apiService.getCountByVenueId(parseInt(window.localStorage.getItem('venue_id'))).subscribe(data => {
      this.countCandidates = data.countCandidates;
    });
  }

  // getCandidateByAsc() {
  //   // tslint:disable-next-line: radix
  //   this.apiService.getCandidateByASC(parseInt(window.localStorage.getItem('venue_id'))).subscribe(data => {
  //     this.candidateVenueJobsLists = data;
  //   });
  // }

  getAllCandidatesByAsc(event?){
    this.resetASC = true;
    this.resetDESC = false;
    this.resetAll = false;
    this.resetVenue = false;
    this.subASC = this.apiService.getAllCandidateByASC(this.pageASC, this.limit).subscribe(
      (data: CandidateVenueJobDtoResponseList) => {
        this.candidateVenueJobsListsASC = this.candidateVenueJobsListsASC.concat(data.candidateVenueJobDtoList);
        this.totalPages = data.totalPages;
        if (event) {
          event.target.complete();
        } else {
          this.resetASC = true;
          this.resetDESC = false;
          this.resetAll = false;
          this.resetVenue = false;
        }
      });
  }

  loadDataASC(event) {
    setTimeout(() => {
      this.pageASC++;
      this.getAllCandidatesByAsc(event);
    }, 500);

    if (this.pageASC === this.totalPages) {
      event.target.disabled = true;

    }
  }

  getCandidateByDesc() {
    // tslint:disable-next-line: radix
    this.apiService.getCandidateByDESC(parseInt(window.localStorage.getItem('venue_id'))).subscribe(data => {
      this.candidateVenueJobsLists = data;
    });
  }

  getAllCandidatesByDesc(event?){
    this.resetASC = false;
    this.resetDESC = true;
    this.resetAll = false;
    this.resetVenue = false;
    this.subDESC = this.apiService.getAllCandidateByDESC(this.pageDESC, this.limit).subscribe(
      (data: CandidateVenueJobDtoResponseList) => {
        this.candidateVenueJobsListsSDESC = this.candidateVenueJobsListsSDESC.concat(data.candidateVenueJobDtoList);
        this.totalPages = data.totalPages;

        if (event) {
          event.target.complete();
        } else {
          this.resetASC = false;
          this.resetDESC = true;
          this.resetAll = false;
          this.resetVenue = false;
        }
      });
  }

  loadDataDESC(event) {
    setTimeout(() => {
      this.pageDESC++;
      this.getAllCandidatesByDesc(event);
    }, 500);

    if (this.pageDESC === this.totalPages) {
      event.target.disabled = true;

    }
  }

  searchByLastName(lastName: any) {
    this.candidateNotFound = false;
    if (lastName === '') {
      this.resetAll = true;
      this.resetASC = false;
      this.resetDESC = false;
      this.resetVenue = false;
      this.populateAllCandidates();
    } else {
      this.apiService.getCandidateByLastName(lastName).subscribe(data => {
        if (data.message === 'NO_CANDIDATE_VENUE_JOB_AVAILABLE') {
          this.candidateNotFound = true;
        } else {
          this.candidateVenueJobsLists = data;
        }
      });
    }
  }


}
