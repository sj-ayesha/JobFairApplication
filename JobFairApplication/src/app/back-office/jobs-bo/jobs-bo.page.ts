import { Component, OnInit, QueryList, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { IonInfiniteScroll, ToastController, ModalController } from '@ionic/angular';
import { Job, JobResponseList } from 'src/app/model/job';
import { VenueJob, VenueJobResponseList } from 'src/app/model/venueJob';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { JobsPopupPage } from '../jobs-popup/jobs-popup.page';
import { AddEditPopupService } from 'src/app/services/add-edit-popup.service';

@Component({
  selector: 'app-jobs-bo',
  templateUrl: './jobs-bo.page.html',
  styleUrls: ['./jobs-bo.page.scss'],
})
export class JobsBoPage implements OnInit {
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  jobs: Job[] = [];
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
  limit = 20;
  page = 0;
  data: any;
  totalPages = 0;
  editJobs: any[] = [];
  // allJobs = Job[];
  public isReload: boolean;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private addEditPopupService: AddEditPopupService,
    private modalController: ModalController) {
  }

  ngOnInit() {

    this.addEditPopupService.castReload.subscribe(data => this.isReload = data);

    window.localStorage.setItem('priority', '[]');
    window.localStorage.setItem('jobId', '');
    this.getAllJobs();

    if (this.isReload == true) {
      this.jobs = [];
      this.addEditPopupService.reloadComponent(false);
    }
  }

    doRefresh(event) {
      console.log('Begin async operation');
      this.jobs = [];
      this.ngOnInit();

      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }

    filter(event) {
      this.filterText = event.target.value;
      if (this.filterText == 'all') {
        this.getAllJobsByVenueId();
      } else {
        this.getJobByLevel();
      }
    }

    toggleInfiniteScroll() {
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }



    styleAccordion() {
      const coll = document.getElementsByClassName('collapsible');

      for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener('click', function () {

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
        message: 'Please select atleast a job',
        position: 'top',
        color: 'danger',
        duration: 2000,
        cssClass: 'toast-custom'
      });
      toast.present();
    }


    searchByTitle(title: string) {
      this.jobNotFound = false;
      const venueId = parseInt(window.localStorage.getItem('venue_id'));
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
    }

    getAllJobs(event ?) {
      this.apiService.getAllJobs(this.page, this.limit).subscribe(
        (data: JobResponseList) => {

          this.jobs = [...this.jobs, ...data.jobDtoList];
          console.log(this.jobs);
          setTimeout(() => {
            this.styleAccordion();
          }, 0);
        });

      if (event) {
        event.target.complete();
      }
    }

    loadData(event) {
      setTimeout(() => {
        this.page++;
        this.getAllJobs(event);
      }, 500);
      setTimeout(() => {
        this.styleAccordion();
      }, 0);
      if (this.page === this.totalPages) {
        event.target.disabled = true;
      }
    }

    getJobByLevel() {
      // tslint:disable-next-line: radix
      // this.jobNotFound = false;
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
    }

    getAllJobsByVenueId(event ?) {
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

    getAllJobsByVenueIdAndCategory() {
      const category: any = this.route.snapshot.paramMap.get('jobQueryParam');
      this.apiService.getJobsByVenueIdAndCategory(parseInt(window.localStorage.getItem('venue_id')), category).subscribe(data => {
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


    routeToJob(jobQueryParam: string) {
      this.router.navigate(['/job-list', jobQueryParam]);
    }

    openAddModal() {
      this.addEditPopupService.showEdit(false);
      this.modalController.create({ component: JobsPopupPage }).then((modalElement) => {
        modalElement.present();
      });
    }

    openEditModal() {
      this.addEditPopupService.showEdit(true);
      this.modalController.create({ component: JobsPopupPage }).then((modalElement) => {
        modalElement.present();
      });
    }

    edit(Id) {
      this.openEditModal();
      this.editJobs = [];
      for (let i = 0; i < this.jobs.length; i++) {
        if (this.jobs[i].jobId === Id) {
          this.editJobs.push(this.jobs[i].jobId);
          this.editJobs.push(this.jobs[i].title);
          this.editJobs.push(this.jobs[i].level);
          this.editJobs.push(this.jobs[i].category);
          this.editJobs.push(this.jobs[i].description);
          this.editJobs.push(this.jobs[i].minimumExperience);
          this.editJobs.push(this.jobs[i].qualificationNeeded);
        }
      }
      const LSeditJobs = JSON.stringify(this.editJobs);
      localStorage.setItem('editJobs', LSeditJobs);
    }
  }
