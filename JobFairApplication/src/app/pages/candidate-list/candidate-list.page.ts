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
  allCandidates: Candidate[] = [];
  venues: Venue[];
  public dataSet: [];

  limit = 10;
  page = 0;

  totalPages = 0;
  totalCandidates = 0;
  filterText: number;
  filterTextScreening: string;
  filterTextLevel: string;
  lastname: string;

  data: any;
  message: any;
  public responseData: any;
  public countCandidates: any;

  noCandidatesAvailable = false;
  candidateNotFound = false;

  disableASC = false;
  disableDESC = false;

  subAll: Subscription;
  subASC: Subscription;
  subDESC: Subscription;

  populateCandidates = false;
  populateCandidatesByVenue = false;
  populateCandidatesByScreeningStatus = false;
  populateCandidatesByLevel = false;
  populateCandidatesByAsc = false;
  populateCandidatesByDesc = false;

  constructor(
    private router: Router,
    private apiService: ApiService) {
  }

  ngOnInit() {
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

  // VENUE
  getVenueByActive() {
    this.apiService.getVenueByActive(true).subscribe(data => {
      this.venues = data;
    });
  }

  // FOR ALL CANDIDATES
  populateAllCandidates(event?, isLoadevent?) {
    this.populateCandidates = true;
    this.populateCandidatesByVenue = false;
    this.populateCandidatesByScreeningStatus = false;
    this.populateCandidatesByLevel = false;
    this.populateCandidatesByAsc = false;
    this.populateCandidatesByDesc = false;
    this.totalPages = 0;
    if (!isLoadevent) {
      this.page = 0;
      this.candidateVenueJobsLists = [];
      this.totalCandidates = 0;
    }

    this.subAll = this.apiService.getAllCandidatesVenueJob(this.page, this.limit).subscribe(
      (data: CandidateVenueJobDtoResponseList) => {
        this.candidateVenueJobsLists = [...this.candidateVenueJobsLists, ...data.candidateVenueJobDtoList];
        this.totalPages = data.totalPages;
        this.totalCandidates = this.totalCandidates + data.totalElements;

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

  // FOR CANDIDATES BASED ON VENUE
  filterByVenue(event) {
    this.populateCandidates = false;
    this.populateCandidatesByVenue = true;
    this.populateCandidatesByScreeningStatus = false;
    this.populateCandidatesByLevel = false;
    this.populateCandidatesByAsc = false;
    this.populateCandidatesByDesc = false;
    this.filterText = event.target.value;
    if (this.filterText == 0) {
      // this.candidateVenueJobsLists = [];
      this.populateAllCandidates();
    } else {
      this.populateCandidateByVenue();
    }
  }

  populateCandidateByVenue(event?, isLoadevent?) {
    if (!isLoadevent) {
      this.page = 0;
      this.candidateVenueJobsLists = [];
      this.totalCandidates = 0;
      this.totalPages = 0;
    }
    // tslint:disable-next-line: radix
    this.apiService.getCandidatesByVenueId(this.filterText, this.page, this.limit).subscribe(
      (data: CandidateVenueJobDtoResponseList) => {
        this.candidateVenueJobsLists = [...this.candidateVenueJobsLists, ...data.candidateVenueJobDtoList];
        this.totalPages = data.totalPages;
        this.totalCandidates = this.totalCandidates + data.totalElements;

        if (this.totalPages === 0) {
          this.noCandidatesAvailable = true;
        } else {
          this.noCandidatesAvailable = false;
        }

        if (event) {
          event.target.complete();
        }
      });

  }

  // SCREENING STATUS
  filterByScreeningStatus(event) {
    this.populateCandidates = false;
    this.populateCandidatesByVenue = false;
    this.populateCandidatesByScreeningStatus = true;
    this.populateCandidatesByLevel = false;
    this.populateCandidatesByAsc = false;
    this.populateCandidatesByDesc = false;
    this.filterTextScreening = event.target.value;
    if (this.filterTextScreening === 'All') {
      this.populateAllCandidates();
    } else {
      this.populateCandidateByScreeningStatus();
    }
  }

  populateCandidateByScreeningStatus(event?, isLoadevent?) {
    if (!isLoadevent) {
      this.page = 0;
      this.candidateVenueJobsLists = [];
      this.totalCandidates = 0;
      // this.totalPages = 0;
    }
    // tslint:disable-next-line: radix
    this.apiService.getAllCandidatesByScreeningStatus(this.filterTextScreening, this.page, this.limit).subscribe(
      (data: CandidateVenueJobDtoResponseList) => {
        this.candidateVenueJobsLists = [...this.candidateVenueJobsLists, ...data.candidateVenueJobDtoList];
        this.totalPages = data.totalPages;
        this.totalCandidates = this.totalCandidates + data.totalElements;

        if (this.totalPages === 0) {
          this.noCandidatesAvailable = true;
        } else {
          this.noCandidatesAvailable = false;
        }

        if (event) {
          event.target.complete();
        }
      });

  }

  // LEVEL
  filterByLevel(event) {
    this.populateCandidates = false;
    this.populateCandidatesByVenue = false;
    this.populateCandidatesByScreeningStatus = false;
    this.populateCandidatesByLevel = true;
    this.populateCandidatesByAsc = false;
    this.populateCandidatesByDesc = false;
    this.filterTextLevel = event.target.value;
    if (this.filterTextLevel === 'All') {
      this.populateAllCandidates();
    } else {
      this.populateCandidateByLevel();
    }
  }


  populateCandidateByLevel(event?, isLoadevent?) {
    if (!isLoadevent) {
      this.page = 0;
      this.candidateVenueJobsLists = [];
      this.totalCandidates = 0;
      this.totalPages = 0;
    }
    // tslint:disable-next-line: radix
    this.apiService.getAllCandidatesByLevel(this.filterTextLevel, this.page, this.limit).subscribe(
      (data: CandidateVenueJobDtoResponseList) => {
        this.candidateVenueJobsLists = [...this.candidateVenueJobsLists, ...data.candidateVenueJobDtoList];
        this.totalPages = data.totalPages;
        console.log(this.totalPages)
        this.totalCandidates = this.totalCandidates + data.totalElements;

        if (this.totalPages === 0) {
          this.noCandidatesAvailable = true;
        } else {
          this.noCandidatesAvailable = false;
        }

        if (event) {
          event.target.complete();
        }
      });

  }

  getAllCandidatesByAsc(event?, isLoadevent?) {
    // this.disableASC = true;
    // this.disableDESC = false;
    this.populateCandidates = false;
    this.populateCandidatesByVenue = false;
    this.populateCandidatesByScreeningStatus = false;
    this.populateCandidatesByLevel = false;
    this.populateCandidatesByAsc = true;
    this.populateCandidatesByDesc = false;
    if (!isLoadevent) {
      this.page = 0;
      this.candidateVenueJobsLists = [];
      this.totalCandidates = 0;
    }

    this.subASC = this.apiService.getAllCandidateByASC(this.page, this.limit).subscribe(
      (data: CandidateVenueJobDtoResponseList) => {
        this.candidateVenueJobsLists = [...this.candidateVenueJobsLists, ...data.candidateVenueJobDtoList];
        this.totalPages = data.totalPages;
        console.log(this.totalPages);
        this.totalCandidates = this.totalCandidates + data.totalElements;

        if (event) {
          event.target.complete();
        } else {
        }
      });
  }

  getAllCandidatesByDesc(event?, isLoadevent?) {
    // this.disableASC = false;
    // this.disableDESC = true;
    this.populateCandidates = false;
    this.populateCandidatesByVenue = false;
    this.populateCandidatesByScreeningStatus = false;
    this.populateCandidatesByLevel = false;
    this.populateCandidatesByAsc = false;
    this.populateCandidatesByDesc = true;

    if (!isLoadevent) {
      this.page = 0;
      this.candidateVenueJobsLists = [];
      this.totalCandidates = 0;
    }

    this.subDESC = this.apiService.getAllCandidateByDESC(this.page, this.limit).subscribe(
      (data: CandidateVenueJobDtoResponseList) => {
        this.candidateVenueJobsLists = [...this.candidateVenueJobsLists, ...data.candidateVenueJobDtoList];
        this.totalPages = data.totalPages;
        this.totalCandidates = this.totalCandidates + data.totalElements;

        console.log(this.candidateVenueJobsLists);
        if (event) {
          event.target.complete();
        } else {
        }
      });
  }

  searchByLastName(lastName: any) {
    this.candidateNotFound = false;
    if (lastName === '' ) {
      this.populateAllCandidates();
    } else {
      this.totalCandidates = 0;
      this.apiService.getCandidateByLastName(lastName).subscribe(data => {
        if (data.message === 'NO_CANDIDATE_VENUE_JOB_AVAILABLE') {
          this.candidateNotFound = true;
        } else {
          this.candidateVenueJobsLists = data;
          this.totalCandidates = this.candidateVenueJobsLists.length;
          return this.candidateVenueJobsLists;
        }
      });
    }
  }

  // LOADING FOR INFINITE SCROLL
  loadData(event) {
    console.log(this.page);
    if (this.populateCandidates === true) {
      setTimeout(() => {
        this.page++;
        this.populateAllCandidates(event, true);
      }, 500);
    } else if (this.populateCandidatesByVenue === true) {
      setTimeout(() => {
        this.page++;
        this.populateCandidateByVenue(event, true);
      }, 500);
    } else if (this.populateCandidatesByScreeningStatus === true) {
      setTimeout(() => {
        this.page++;
        this.populateCandidateByScreeningStatus(event, true);
      }, 500);
    }  else if (this.populateCandidatesByLevel === true) {
      setTimeout(() => {
        this.page++;
        this.populateCandidateByLevel(event, true);
      }, 500);
    } else if (this.populateCandidatesByAsc === true) {
      setTimeout(() => {
        this.page++;
        this.getAllCandidatesByAsc(event, true);
      }, 500);
    } else if (this.populateCandidatesByDesc === true) {
      setTimeout(() => {
        this.page++;
        this.getAllCandidatesByDesc(event, true);
      }, 500);
    }

    // if (this.page === this.totalPages) {
    //   event.target.disabled = true;
    // }
  }

  countCandidatesByVenue() {
    // tslint:disable-next-line: radix
    this.apiService.getCountByVenueId(parseInt(window.localStorage.getItem('venue_id'))).subscribe(data => {
      this.countCandidates = data.countCandidates;
    });
  }
}
