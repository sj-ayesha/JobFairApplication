import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Job } from 'src/app/model/job';
import { ActivatedRoute, Router } from '@angular/router';
import { VenueJob, VenueJobResponseList } from 'src/app/model/venueJob';
import { ToastController, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.page.html',
  styleUrls: ['./job-list.page.scss'],
})
export class JobListPage implements OnInit {

  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  // jobs: any;
  jobs: Job[];
  public venueJobs: VenueJob[] = [];
  public searchTerm: string = '';
  public items: any;
  noJobsAvailable = false;
  jobNotFound = false;
  public splitJobDescriptions;
  checked = true;
  priority = [];
  filterText: string;
  refreshCheck = false;
  limit = 10;
  page = 0;
  data: any;
  totalPages = 0;
  insideCategory = false;
  category: string;

  jobPriority: string;
  jobId: string;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
  ) {
    const allJobsByVenueId: string = this.route.snapshot.paramMap.get('jobQueryParam');
    if (allJobsByVenueId === 'by-venue') {
      this.getAllJobsByVenueId();
    } else {
      this.getAllJobsByVenueIdAndCategory();
    }
  }

  ngOnInit() {
    window.localStorage.setItem('priority', '[]');
    window.localStorage.setItem('jobId', '');
  }

  doRefresh(event) {
    if (this.category == null) {
      this.venueJobs = [];
      this.getAllJobsByVenueId();
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    } else {
      this.venueJobs = [];
      this.getAllJobsByVenueIdAndCategory();
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }
  }

  ionViewWillEnter() {
    this.uncheckAll();
  }

  filter(event) {
    this.filterText = event.target.value;
    if (this.filterText === 'all') {
      this.venueJobs = [];
      if (this.category == null) {
        this.getAllJobsByVenueId();
      } else {
        this.getAllJobsByVenueIdAndCategory();
      }
    } else {
      this.getJobByLevel();
    }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  getJobByLevel() {
    // tslint:disable-next-line: radix
    // this.jobNotFound = false;
    const venueId = parseInt(window.localStorage.getItem('venue_id'));
    if (this.category == null) {
      this.apiService.searchJobByLevel(parseInt(window.localStorage.getItem('venue_id')), this.filterText).subscribe(data => {
        this.jobNotFound = false;
        if (data.message === 'NO_VENUE_JOB_AVAILABLE') {
          this.jobNotFound = true;
        } else {
          this.venueJobs = data;
          setTimeout(() => {
            this.styleAccordion();
          }, 0);
        }
      });
    } else {
      this.apiService.getJobByCategoryAndLevel(venueId, this.category, this.filterText).subscribe(data => {
        this.jobNotFound = false;
        if (data.message === 'NO_VENUE_JOB_AVAILABLE') {
          this.jobNotFound = true;
        } else {
          this.venueJobs = data;
          setTimeout(() => {
            this.styleAccordion();
          }, 0);
        }
      });
    }
  }

  async unsuccessMsg() {
    const toast = await this.toastCtrl.create({
      message: 'Please select a maximum of 5 jobs',
      position: 'top',
      color: 'danger',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  async unsuccessMsgEmpty() {
    const toast = await this.toastCtrl.create({
      message: 'Please select at least one job',
      position: 'top',
      color: 'danger',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }


  styleAccordion() {
    const coll = document.getElementsByClassName('collapsible');
    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  }

  uncheckAll() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
  }


  getAllJobsByVenueId(event?) {
    // tslint:disable-next-line: radix
    this.jobNotFound = false;
    this.apiService.getJobsByVenueId(parseInt(window.localStorage.getItem('venue_id')), this.page, this.limit).subscribe(
      (data: VenueJobResponseList) => {
        this.venueJobs = [...this.venueJobs, ...data.venueJobDtoList];
        setTimeout(() => {
          this.styleAccordion();
        }, 0);

        this.totalPages = data.totalPages;

        if (this.venueJobs.length === 0) {
          this.noJobsAvailable = true;
        } else {
          this.noJobsAvailable = false;
        }
        if (event) {
          event.target.complete();
        }
      }
    );
  }

  loadData(event) {
    setTimeout(() => {
      this.page++;
      this.getAllJobsByVenueId(event);
    }, 500);
    setTimeout(() => {
      this.styleAccordion();
    }, 0);
    if (this.page === this.totalPages) {
      event.target.disabled = true;
    }
  }

  getAllJobsByVenueIdAndCategory() {
    this.jobNotFound = false;
    this.venueJobs = [];
    this.category = this.route.snapshot.paramMap.get('jobQueryParam');
    this.apiService.getJobsByVenueIdAndCategory(parseInt(window.localStorage.getItem('venue_id')), this.category).subscribe(data => {
      if (data.message === 'NO_VENUE_JOB_AVAILABLE') {
        this.noJobsAvailable = true;
      } else {
        this.venueJobs = data;
        setTimeout(() => {
          this.styleAccordion();
        }, 0);
      }
    },
      error => {
        this.noJobsAvailable = true;
      }
    );
  }

  addPriority(event: CustomEvent, jobId: number) {
    if (event.detail.checked) {
      this.priority.push(jobId);
      localStorage.setItem('priority', JSON.stringify(this.priority));
    } else {
      const index = this.priority.indexOf(jobId);
      if (index > -1) {
        this.priority.splice(index, 1);
        console.log('prio', this.priority);
      }
      localStorage.setItem('priority', JSON.stringify(this.priority));
    }
  }

  setJobId() {
    this.jobPriority = JSON.parse(localStorage.getItem('priority'));
    this.jobId = this.jobPriority[0];
    console.log(this.jobId);
    localStorage.setItem('jobId', this.jobId);
  }

  routeToJob(jobQueryParam: string) {
    this.router.navigate(['/job-list', jobQueryParam]);
  }

  applyOnlyFive() {
    const count = JSON.parse(localStorage.priority).length;

    if (count > 5) {
      this.unsuccessMsg();
    } else if (count <= 0) {
      this.unsuccessMsgEmpty();
    } else {
      this.router.navigate(['candidate-add-profile']);
    }
  }

  back() {
    this.router.navigate(['/home']);
    window.localStorage.removeItem('priority');
    window.localStorage.removeItem('jobId');
  }

  searchByTitle(title: string) {
    this.jobNotFound = false;
    const venueId = parseInt(window.localStorage.getItem('venue_id'));
    if (this.category == null) {
        this.apiService.searchJobByTitle(venueId, title).subscribe(data => {
          if (data.message === 'NO_VENUE_JOB_AVAILABLE') {
            this.jobNotFound = true;
          } else {
            this.venueJobs = data;
            setTimeout(() => {
              this.styleAccordion();
            }, 0);
          }
        });
    } else {
      if (title === '') {
        this.getAllJobsByVenueIdAndCategory();
      } else {
        this.apiService.searchJobByCategoryAndTitle(venueId, this.category, title).subscribe(data => {
          if (data.message === 'NO_VENUE_JOB_AVAILABLE') {
            this.jobNotFound = true;
          } else {
            this.venueJobs = data;
            setTimeout(() => {
              this.styleAccordion();
            }, 0);
          }
        });
      }
    }
  }

  routeToApplyJob() {
    this.router.navigate(['candidate-add-profile']);
  }
}
