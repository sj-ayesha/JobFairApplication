import { Component, OnInit, ViewChild, QueryList, ElementRef, ViewChildren } from '@angular/core';
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
export class VenueJobPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;

  formAddVenueJob: FormGroup;

  venues: Venue[] = [];
  jobs: Job[] = [];
  venueJobs: VenueJob[] = [];
  addJob = [];
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
    private formBuilder: FormBuilder
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

  // populateAllJobs() {
  //   this.apiService.getAllJobs(this.pageJob, this.limitJob).subscribe(
  //     (data: JobResponseList[]) => {
  //     data.forEach((element, index) => {
  //       let data = {
  //         job: element.jobDtoList,
  //         checked: null
  //       };
  //       // if (element !== null && this) {
  //       //   this.jobs.push(data);
  //       // }
  //     });
  //     // console.log(this.CandidateSkills);
  //   });
  // }

  checkCheckBoxvalue(event: CustomEvent, job: AssociateVenueJobs) {
    job.checked = event.detail.checked;
    // console.log(job.jobId);

    if (job.checked === true) {
      this.addJob.push(job);
    } else {
      for (let i = 0; i < this.addJob.length; i++) {
        if (this.addJob[i].jobId === job.jobId){
          console.log(this.addJob[i].jobId);
          this.addJob.splice(i, 1);
        }
      }
    }
    console.log('addjob checkbox', this.addJob);
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
          this.checkBoxArray.push(venueJob.job.jobId);
          this.selectedVenue = venueJob.venue.venueName;
        });
      }
    );
  }


  // FILTER BY VENUE
  filter(event) {
    this.filterText = event.target.value;
    if (this.filterText === 0) {
      this.getAllJobsByVenueId();
    } else {
      this.getAllJobsByVenueId();
      // this.venueName = this.venueJobs[0].venue.venueName;
    }
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
  postJobsVenue(){
    const addVenueJob = {
      venue: {
      venueId: this.filterText
      },
      job: this.addJob
    };

    console.log(addVenueJob);
  }

  onSubmit(){
    this.postJobsVenue();
  }
}
