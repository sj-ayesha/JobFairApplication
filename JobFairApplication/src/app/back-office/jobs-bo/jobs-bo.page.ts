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
  level: string;
  category: string;
  refreshCheck = false;
  limit = 10;
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

    if (this.isReload === true) {
      this.jobs = [];
      this.addEditPopupService.reloadComponent(false);
    }

  }

    doRefresh(event) {
      this.jobs = [];
      this.ngOnInit();

      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }

    filterLevel(event) {
      this.level = event.target.value;
      if (this.level === 'all') {
        this.jobs = [];
        this.getAllJobs();
      } else {
        this.getJobByLevel();
      }
    }

    filterCategory(event) {
      this.category = event.target.value;
      if (this.level === 'all') {
        this.jobs = [];
        this.getAllJobs();
      } else {
        this.getAllJobsByCategory();
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
      this.apiService.searchAllJobsByTitle(title).subscribe(data => {
        if (data.message === 'JOB_NOT_FOUND') {
          this.jobNotFound = true;
        } else {
          this.jobs = data;
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
      this.apiService.searchAllJobsByLevel(this.level).subscribe(data => {
        this.jobNotFound = false;
        if (data.message === 'NO_JOB_FOUND') {
          this.jobNotFound = true;
        } else {
          this.jobs = data;
          setTimeout(() => {
            this.styleAccordion();
          }, 0);
        }
      });
    }


    getAllJobsByCategory() {
      this.apiService.getJobsByCategory(this.category).subscribe(data => {
        this.jobNotFound = false;
        if (data.message === 'NO_JOB_FOUND') {
          this.jobNotFound = true;
        } else {
          this.jobs = data;
          setTimeout(() => {
            this.styleAccordion();
          }, 0);
        }
      });
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
