import { Component, OnInit, QueryList, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { IonInfiniteScroll, ToastController, ModalController } from '@ionic/angular';
import { Job, JobResponseList } from 'src/app/model/job';
import { VenueJob, VenueJobResponseList } from 'src/app/model/venueJob';
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
  // venueJobs: VenueJob[] = [];
  editJobs: any[] = [];
  priority = [];
  noJobsAvailable = false;
  jobNotFound = false;
  checked = true;
  refreshCheck = false;
  public isReload: boolean;
  filterTextTitle = '';
  filterTextCategory = 'All';
  filterTextPosition = 'All';
  limit = 20;
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
    this.filter();

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

  // filter jobs based on level
  filterLevel(event) {
    this.filterTextPosition = event.target.value;
    this.filter();
  }

  // filter jobs based on category
  filterCategory(event) {
    this.filterTextCategory = event.target.value;
    this.filter();

  }

  // search based on title of job
  searchByTitle(title: string) {
    this.filterTextTitle = title;
    this.filter();
  }

  // get all jobs
  filter(event?, isLoadevent?) {
    if (!isLoadevent) {
      this.page = 0;
      this.jobs = [];
      this.totalPages = 0;
    }
    // tslint:disable-next-line: max-line-length
    this.apiService.filterJobs(this.page, this.limit, this.filterTextTitle, this.filterTextPosition, this.filterTextCategory).subscribe(
      (data: JobResponseList) => {
        console.log(this.filterTextPosition);
        this.jobs = [...this.jobs, ...data.jobDtoList];
        setTimeout(() => {
          this.styleAccordion();
        }, 0);

        this.totalPages = data.totalPages;

        if (this.jobs.length === 0) {
          this.noJobsAvailable = true;
        } else {
          this.noJobsAvailable = false;
        }

        if (event) {
          event.target.complete();
        }
    });
  }

  // load more jobs on scroll
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

  // open add modal
  openAddModal() {
    this.addEditPopupService.showEdit(false);
    this.modalController.create({
      component: JobsPopupPage,
      cssClass: 'modal-container'
    }).then((modalElement) => {
      modalElement.onDidDismiss().then((data) => {
        if (data) {
          this.jobs = [];
          this.filter();
        }
      })
      modalElement.present();
    });
  }

  // open edit modal
  openEditModal() {
    this.addEditPopupService.showEdit(true);
    this.modalController.create({ component: JobsPopupPage, cssClass: 'modal-container'}).then((modalElement) => {
      modalElement.onDidDismiss().then((data) => {
        if (data) {
          this.jobs = [];
          this.filter();
        }
      })
      modalElement.present();
    });
  }

  // get values of job and populate in modal
  edit(Id) {
    this.openEditModal();
    this.editJobs = [];
    this.jobs.forEach((element, index) => {
      if (this.jobs[index].jobId === Id) {
        this.editJobs.push(this.jobs[index].jobId);
        this.editJobs.push(this.jobs[index].title);
        this.editJobs.push(this.jobs[index].level);
        this.editJobs.push(this.jobs[index].category);
        this.editJobs.push(this.jobs[index].description);
        this.editJobs.push(this.jobs[index].minimumExperience);
        this.editJobs.push(this.jobs[index].qualificationNeeded);
      }
    });
    const LSeditJobs = JSON.stringify(this.editJobs);
    localStorage.setItem('editJobs', LSeditJobs);
  }
}
