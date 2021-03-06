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
  @ViewChild('venueFilter', {static: false}) venueFilter;

  candidateDetails: any[];
  candidateVenueJobsLists: CandidateVenueJob[] = [];
  allCandidates: Candidate[] = [];
  venues: Venue[];
  public dataSet: [];

  limit = 10;
  page = 0;

  totalPages = 0;
  totalCandidates = 0;
  filterTextVenue = 0;
  filterTextScreening = 'All';
  filterTextLevel: string;
  filterTextSortOrder = 'DESC';
  filterTextSortBy = 'candidate.registrationDate';
  filterTextLastname = '';

  data: any;
  message: any;
  selectedElementForVenue: '0';
  selectedElementForScreening: 'All';
  selectedElementForSearch: '';
  public responseData: any;
  public countCandidates: any;

  noCandidatesAvailable = false;
  candidateNotFound = false;

  constructor(
    private router: Router,
    private apiService: ApiService) {
  }

  ngOnInit() {
    this.getVenueByActive();
    this.filter();
  }


  doRefresh(event) {
    this.ngOnInit();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  onSelect(id: number) {
    this.router.navigate(['/candidate-list', id]);
  }

  routeTo(candidateId: number) {
    this.router.navigate(['/candidate-details', candidateId]);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  filter(event?, isLoadevent?) {
    if (!isLoadevent) {
      this.page = 0;
      this.candidateVenueJobsLists = [];
      this.totalCandidates = 0;
    }
    this.apiService.filterCandidates(this.page, this.limit, this.filterTextSortOrder,
    this.filterTextSortBy, this.filterTextVenue, this.filterTextScreening, this.filterTextLastname).subscribe(
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

  // VENUE
  getVenueByActive() {
    this.apiService.getVenueByActive(true).subscribe(data => {
      this.venues = data;
    });
  }

  // FOR CANDIDATES BASED ON VENUE
  filterByVenue(event) {
    this.filterTextVenue = event.target.value;
    this.filter();
  }


  // SCREENING STATUS
  filterByScreeningStatus(event) {
    this.filterTextScreening = event.target.value;
    this.filter();
  }

  // LEVEL
  filterByLevel(event) {
    this.filterTextLevel = event.target.value;
    this.filter();
  }

  getAllCandidatesByAsc() {
    this.filterTextSortBy = 'candidate.lastName';
    this.filterTextSortOrder = 'ASC';
    this.filter();
  }

  getAllCandidatesByDesc() {
    this.filterTextSortBy = 'candidate.lastName';
    this.filterTextSortOrder = 'DESC';
    this.filter();
  }

  resetFilters() {
    this.filterTextVenue = 0;
    this.filterTextScreening = 'All';
    this.filterTextSortBy = 'candidate.registrationDate';
    this.filterTextSortOrder = 'DESC';
    this.filterTextLastname = '';
    this.filter();
    this.selectedElementForVenue = '0';
    this.selectedElementForScreening = 'All';
    this.selectedElementForSearch = '';
  }

  loadData(event) {
    setTimeout(() => {
      this.page++;
      this.filter(event, true);
    }, 500);
  }

  searchByLastName(lastName: any) {
    this.filterTextLastname = lastName;
    this.filter();
  }

  countCandidatesByVenue() {
    // tslint:disable-next-line: radix
    this.apiService.getCountByVenueId(parseInt(window.localStorage.getItem('venue_id'))).subscribe(data => {
      this.countCandidates = data.countCandidates;
    });
  }
}
