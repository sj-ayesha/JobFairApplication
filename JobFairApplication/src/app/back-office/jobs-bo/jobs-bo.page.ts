import { Component, OnInit, QueryList, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { IonInfiniteScroll, ToastController, ModalController } from '@ionic/angular';
import { Job, JobResponseList } from 'src/app/model/job';
import { VenueJob } from 'src/app/model/venueJob';
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
  venueJobs: VenueJob[] = [];
  editJobs: any[] = [];
  priority = [];
  noJobsAvailable = false;
  jobNotFound = false;
  checked = true;
  refreshCheck = false;
  public searchTerm: '';
  level: string;
  category: string;
  public isReload: boolean;
  limit = 10;
  page = 0;
  totalPages = 0;
  data: any;
  public items: any;
  public splitJobDescriptions;


  constructor(
    private apiService: ApiService,
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

  // infinite scrolling to populate more jobs on scroll
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  // refreshing component without reloading the whole page
  doRefresh(event) {
    this.jobs = [];
    this.ngOnInit();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  // accordion
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

  // successful message
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

  // unsuccessful message
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

  // filter jobs based on level
  filterLevel(event) {
    this.level = event.target.value;
    if (this.level === 'all') {
      this.jobs = [];
      this.getAllJobs();
    } else {
      this.getJobByLevel();
    }
  }

  // get all jobs based on level
  getJobByLevel() {
    // tslint:disable-next-line: radix
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

  // filter jobs based on category
  filterCategory(event) {
    this.category = event.target.value;
    if (this.category === 'all') {
      this.jobs = [];
      this.getAllJobs();
    } else {
      this.getAllJobsByCategory();
    }
  }

  // get all jobs based on category
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

  // search based on title of job
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

  // get all jobs
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

  // load more jobs on scroll
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

  // open add modal
  openAddModal() {
    this.addEditPopupService.showEdit(false);
    this.modalController.create({
      component: JobsPopupPage,
      cssClass: 'modal-container'
    }).then((modalElement) => {
      modalElement.present();
    });
  }

  // open edit modal
  openEditModal() {
    this.addEditPopupService.showEdit(true);
    this.modalController.create({ component: JobsPopupPage, cssClass: 'modal-container'}).then((modalElement) => {
      modalElement.present();
    });
  }

  // get values of job and populate in modal
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
