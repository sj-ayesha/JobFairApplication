import { Component, OnInit, ViewChild, QueryList, ElementRef, ViewChildren, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { VenueResponseList, Venue } from 'src/app/model/venue';
import { IonInfiniteScroll } from '@ionic/angular';
import { JobResponseList, Job } from 'src/app/model/job';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AssociateVenueJobs } from 'src/app/model/AssociateVenueJob';
import { element } from 'protractor';
import { VenueJobResponseList, VenueJob } from 'src/app/model/venueJob';

@Component({
  selector: 'app-venue-job',
  templateUrl: './venue-job.page.html',
  styleUrls: ['./venue-job.page.scss'],
})
export class VenueJobPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;

  formAddVenueJob: FormGroup;

  venues: Venue[] = [];
  jobs: Job[] = [];
  venueJobs: VenueJob[] = [];
  addJob: any[] = [];
  filterText: number;
  selectedVenue: string;
  genders: Array<string>;

  checkBoxArray: Array<number> = [];

  limitVenueJobs = 50;
  pageVenueJobs = 0;
  limitVenue = 50;
  pageVenue = 0;
  limitJob = 50;
  pageJob = 0;

  venueName: string;

  totalPages = 0;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.formAddVenueJob = this.formBuilder.group({
      venue: new FormControl(),
      job: new FormControl()
    });
  }

  ngOnInit() {
    this.getAllVenue();
    this.getAllJobs();
  }

  ngOnDestroy() {
    this.changeDetectorRef.detach()
  }

  ionViewWillEnter() {
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  doRefresh(event) {
    this.venues = [];
    this.jobs = [];
    this.ngOnInit();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  // VENUE
  getAllVenue() {
    this.apiService.getAllVenue(this.pageVenue, this.limitVenue).subscribe(
      (data: VenueResponseList) => {

        this.venues = [...this.venues, ...data.venueDtoList];
        // this.venues = this.venues.concat(data.venueDtoList);
        console.log('venues', data.venueDtoList);
        this.totalPages = data.totalPages;
      });
  }

  // JOB
  getAllJobs() {
    this.apiService.getAllJobs(this.pageJob, this.limitJob).subscribe(
      (data: JobResponseList) => {
        this.jobs = [...this.jobs, ...data.jobDtoList];
        console.log('jobs', this.jobs);
      });
  }

  // VENUE JOBS
  getAllJobsByVenueId() {
    this.venueJobs = [];
    this.selectedVenue = '';
    this.checkBoxArray = [];
    this.addJob = [];

    // tslint:disable-next-line: radix
    this.apiService.getJobsByVenueId(this.filterText, this.pageVenueJobs, this.limitVenueJobs).subscribe(
      (data: VenueJobResponseList) => {
        this.venueJobs = [...this.venueJobs, ...data.venueJobDtoList];
        this.totalPages = data.totalPages;
        this.venueJobs.forEach(venueJob => {
          this.selectedVenue = venueJob.venue.venueName;
        });
        const jobIdsForVenue = this.venueJobs.map((venueJob) => venueJob.job.jobId);
        this.jobs = this.jobs.map((job) => {
          job['checked'] = false;
          job['checked'] = jobIdsForVenue.includes(job.jobId);
          return job;
        });
      }
    );
  }


  // FILTER BY VENUE
  filter(event) {
    this.filterText = event.target.value;
    this.getAllJobsByVenueId();
  }

  // GET VENUE BY ACTIVE
  getVenueByActive() {
    this.apiService.getVenueByActive(true).subscribe(data => {
      this.venues = data;
    });
  }


  reset() {
    this.formAddVenueJob.reset();
  }


  // SUBMIT ADD JOBS TO VENUE
  postJobsVenue() {
    const addVenueJob = {
      venue: {
        venueId: this.filterText
      },
      job: this.addJob
    };

    console.log(addVenueJob);
  }

  onSubmit() {
    const addVenueJob = {
      venue: {
        venueId: this.filterText
      },
      job: this.jobs
    };

    console.log(addVenueJob)
  }
}
