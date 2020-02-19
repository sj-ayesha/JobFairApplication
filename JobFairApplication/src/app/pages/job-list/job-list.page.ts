import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Job } from 'src/app/model/job';
import { ActivatedRoute, Router } from '@angular/router';
import { VenueJob, VenueJobResponseList } from 'src/app/model/venueJob';
import { ToastController, IonInfiniteScroll } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { timingSafeEqual } from 'crypto';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.page.html',
  styleUrls: ['./job-list.page.scss'],
})
export class JobListPage implements OnInit {

  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  // jobs: any;
  // jobs: Job[];
  public venueJobs: VenueJob[] = [];
  priority = [];

  public splitJobDescriptions;

  checked = true;
  noJobsAvailable = false;
  jobNotFound = false;
  refreshCheck = false;
  insideCategory = false;
  getLocalStorageJoBId = false;
  showQuickApply: boolean;

  limit = 10;
  page = 0;
  totalPages = 0;
  spontaneousId: number;

  filterTextTitle = '';
  filterTextCategory = 'All';
  filterTextPosition = 'All';

  category: string;
  jobPriority: string;
  jobId: string;
  filterText: string;

  data: any;
  public items: any;


  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    public authService: AuthService
  ) {
    const allJobsByVenueId: string = this.route.snapshot.paramMap.get('jobQueryParam');
    if (allJobsByVenueId === 'by-venue') {
      this.filter();
    } else {
      this.getAllJobsByVenueIdAndCategory();
    }
  }

  ngOnInit() {
  }

  doRefresh(event) {
    if (this.filterTextCategory == null) {
      this.venueJobs = [];
      this.filter();
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
    window.localStorage.setItem('priority', '[]');
    window.localStorage.setItem('jobId', '');
  }

  filter(event?, isLoadevent?) {
    if (!isLoadevent) {
      this.page = 0;
      this.venueJobs = [];
      this.totalPages = 0;
    }
    // tslint:disable-next-line: max-line-length
    this.apiService.filterVenueJobs(this.page, this.limit, parseInt(window.localStorage.getItem('venue_id')), this.filterTextTitle, this.filterTextPosition, this.filterTextCategory).subscribe(
      (data: VenueJobResponseList) => {
        console.log(this.filterTextPosition)
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

        this.venueJobs.forEach((element, index) => {
          if (this.venueJobs[index].job.title === 'Spontaneous Application') {
            this.spontaneousId = this.venueJobs[index].job.jobId;
            console.log(this.spontaneousId);
            this.showQuickApply = true;
          } else {
            this.showQuickApply = false;
          }
        });

        if (event) {
          event.target.complete();
        }
    });
  }

  filterByPosition(event) {
    this.filterTextPosition = event.target.value;
    this.filter();
  }

  searchByTitle(title: string) {
    this.filterTextTitle = title;
    this.filter();
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  loadData(event) {
    setTimeout(() => {
      this.page++;
      this.filter(event, true);
    }, 500);
    setTimeout(() => {
      this.styleAccordion();
    }, 0);
    if (this.page === this.totalPages) {
      event.target.disabled = true;
    }
  }

  getAllJobsByVenueIdAndCategory() {
    this.filterTextCategory = this.route.snapshot.paramMap.get('jobQueryParam');
    console.log(this.filterTextCategory);
    this.filter();
  }

  addPriority(event: CustomEvent, jobId: number) {
    if (event.detail.checked) {
      this.priority.push(jobId);
      localStorage.setItem('priority', JSON.stringify(this.priority));
    } else {
      const index = this.priority.indexOf(jobId);
      if (index > -1) {
        this.priority.splice(index, 1);
      }
      localStorage.setItem('priority', JSON.stringify(this.priority));
    }
  }

  setJobId() {
    this.jobPriority = JSON.parse(localStorage.getItem('priority'));
    this.jobId = this.jobPriority[0];
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
      if ( this.spontaneousId != null) {
        this.unsuccessMsgEmptyQuickA();
      } else {
        this.unsuccessMsgEmptyNoQuickA();
      }
    } else {
      this.router.navigate(['candidate-add-profile']);
    }
  }

  back() {
    this.router.navigate(['/home']);
    // window.localStorage.setItem('priority', '[]');
    // this.priority = JSON.parse(localStorage.getItem('priority'));
    // this.priority.forEach((element, index) => {
    //   this.priority.splice(index);
    // });
  }


  quickApplication() {
    localStorage.setItem('jobId', JSON.stringify(this.spontaneousId));
    this.priority.pop();
    this.priority.push(this.spontaneousId);
    localStorage.setItem('priority', JSON.stringify(this.priority));

    if  (localStorage.getItem('jobId') == JSON.stringify(this.spontaneousId)) {
      this.routeToApplyJob();
    } else {
      this.applyOnlyFive();
    }
  }

  routeToApplyJob() {
    this.router.navigate(['candidate-add-profile']);
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

  async unsuccessMsgEmptyQuickA() {
    const toast = await this.toastCtrl.create({
      message: 'Please select at least one job or click on "Quick Application"',
      position: 'top',
      color: 'danger',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  async unsuccessMsgEmptyNoQuickA() {
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
      coll[i].addEventListener('click', function(){
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
}
