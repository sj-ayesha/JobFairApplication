import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { Job } from 'src/app/model/job';
import { ActivatedRoute, Router } from '@angular/router';
import { VenueJob } from 'src/app/model/venueJob';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.page.html',
  styleUrls: ['./job-list.page.scss'],
})
export class JobListPage implements OnInit {

  // jobs: any;
  jobs: Job[];
  venueJobs: VenueJob[];
  public searchTerm: string = "";
  public items: any;
  noJobsAvailable = false;

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {

    const allJobsByVenueId: String = this.route.snapshot.paramMap.get('jobQueryParam');
    if(allJobsByVenueId == 'by-venue'){
      this.getAllJobsByVenueId();
    } else {
      this.getAllJobsByVenueIdAndCategory();
    }
  }

  // ngAfterViewInit() {
  //   this.styleAccordion();
  // }

  // ngOnChanges(): void {

  //   this.styleAccordion();
  // }

  styleAccordion() {
    let coll = document.getElementsByClassName('collapsible');
    let i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener('click', function () {
        this.classList.toggle('active');
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  }

  getAllJobsByVenueId(){
    this.apiService.getJobsByVenueId(1).subscribe(data=>{
      if(data.message == "NO_VENUE_JOB_AVAILABLE"){
        this.noJobsAvailable = true;
      } else {
        this.venueJobs = data;
      }
      // console.log(data);
    },
      error => {
      this.noJobsAvailable = true;
    }
    );
  }

  getAllJobsByVenueIdAndCategory(){
    const category: any = this.route.snapshot.paramMap.get('jobQueryParam');
    this.apiService.getJobsByVenueIdAndCategory(1, category).subscribe(data => {
      if(data.message == "NO_VENUE_JOB_AVAILABLE"){
        this.noJobsAvailable = true;
      } else {
        this.venueJobs = data;
      }
    },
      error => {
      this.noJobsAvailable = true;
    }
    );
  }
}