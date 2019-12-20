import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { Job } from 'src/app/model/job';
import { ActivatedRoute, Router } from '@angular/router';
import { VenueJob } from 'src/app/model/venueJob';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.page.html',
  styleUrls: ['./job-list.page.scss'],
})
export class JobListPage implements OnInit {

  // jobs: any;
  jobs: Job[];
  public venueJobs: VenueJob[];
  public searchTerm: string = "";
  public items: any;
  noJobsAvailable = false;
  public splitJobDescriptions;
  checked = true;
  priority = [];

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

  }

  // ngAfterViewInit() {
  //   this.styleAccordion();
  // }

  // ngOnChanges(): void {

  //   this.styleAccordion();
  // }
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

  getAllJobsByVenueId() {
    // tslint:disable-next-line: radix
    this.apiService.getJobsByVenueId(parseInt(window.localStorage.getItem('venue_id'))).subscribe(data => {
      if (data.message == 'NO_VENUE_JOB_AVAILABLE') {
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

  getAllJobsByVenueIdAndCategory() {
    const category: any = this.route.snapshot.paramMap.get('jobQueryParam');
    this.apiService.getJobsByVenueIdAndCategory(parseInt(window.localStorage.getItem('venue_id')), category).subscribe(data => {
      if (data.message == "NO_VENUE_JOB_AVAILABLE") {
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
    console.log(event.detail.checked);
    if (event.detail.checked) {
      this.priority.push(jobId);
      console.log(this.priority);
      localStorage.setItem('priority', JSON.stringify(this.priority));
    } else {
      var index = this.priority.indexOf(jobId);
      if (index > -1) {
        this.priority.splice(index, 1);
      }
      // console.log(this.priority);
      localStorage.setItem('priority', JSON.stringify(this.priority));
    }
  }

  routeToJob(jobQueryParam: string) {
    this.router.navigate(['/job-list', jobQueryParam]);
  }

  applyOnlyFive() {
    const count = JSON.parse(localStorage.priority).length;
    // console.log(count);
    if (count <= 5) {
      this.router.navigate(['candidate-add-profile']);
    } else {
      this.unsuccessMsg();
    }
  }

  back(){
    this.router.navigate(['/home']);
    window.localStorage.removeItem('priority');
  }

  searchByTitle(title: string){
    // tslint:disable-next-line: radix
    const venueId = parseInt(window.localStorage.getItem('venue_id'));
    this.apiService.searchJobByTitle(venueId, title).subscribe(data => {
      this.venueJobs = data;
      setTimeout(() => {
        this.styleAccordion();
      }, 0);
    });
  }
}