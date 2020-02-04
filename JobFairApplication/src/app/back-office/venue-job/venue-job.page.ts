import { Component, OnInit, ViewChild, QueryList, ElementRef, ViewChildren, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Venue } from 'src/app/model/venue';
import { IonInfiniteScroll, ToastController } from '@ionic/angular';
import { JobResponseList, Job } from 'src/app/model/job';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
  checkBoxArray: Array<number> = [];
  genders: Array<string>;

  selectedVenueDto: Venue;

  selectedVenue: string;
  venueName: string;
  submitted = false;
  selectedVenueDate: Date;

  filterText: number;
  limitVenueJobs = 50;
  pageVenueJobs = 0;
  limitVenue = 50;
  pageVenue = 0;
  limitJob = 50;
  pageJob = 0;
  totalPages = 0;

  errorMessages = {
    venue: [
      { type: 'required', message: '⚠ Venue is required' },
    ]
  };

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.formAddVenueJob = this.formBuilder.group({
      venue: new FormControl('', Validators.required),
      job: new FormControl()
    });
  }

  ngOnInit() {
    this.getVenueByActive();
    this.getAllJobs();
  }

  ngOnDestroy() {
    this.changeDetectorRef.detach();
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

  // JOB
  getAllJobs() {
    this.apiService.getAllJobs(this.pageJob, this.limitJob).subscribe(
      (data: JobResponseList) => {
        this.jobs = [...this.jobs, ...data.jobDtoList];
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
          this.selectedVenueDate = venueJob.venue.startDate;
          this.selectedVenueDto = venueJob.venue;
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
    const venue = {
      venueId: this.filterText,
      venueName: null,
      startDate: null,
      endDate: null,
      address: null,
      active: null
    };
    const addVenueJob = {
      venue: venue,
      job: this.jobs,
      venueJobDate: new Date()
    };

    console.log('addVenueJob', addVenueJob);
    this.apiService.saveMultipleVenueJob(addVenueJob).subscribe(
      data => {
        this.getAllJobsByVenueId();
      },
      error => {
      }
    );
  }

  async successMsg() {
    const toast = await this.toastCtrl.create({
      message: 'Job(s) have been successfully added to Venue: ' + this.selectedVenue,
      position: 'top',
      color: 'success',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  async unsuccessMsg() {
    const toast = await this.toastCtrl.create({
      message: 'Please select a venue',
      position: 'top',
      color: 'danger',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  onSubmit() {
    if (this.formAddVenueJob.invalid) {
      this.unsuccessMsg();
    } else {
      this.submitted = true;
      this.postJobsVenue();
      this.successMsg();
    }
  }
}
