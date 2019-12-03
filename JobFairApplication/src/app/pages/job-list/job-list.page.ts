import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { Job } from 'src/app/model/job';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.page.html',
  styleUrls: ['./job-list.page.scss'],
})
export class JobListPage implements OnInit {

  // jobs: any;
  jobs: Job[];
  public searchTerm: string = "";
  public items: any;

  constructor(private dataService: DataService, private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.populateJob();
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

  populateJob() {
    const category: any = this.route.snapshot.paramMap.get('category');
    if (category != null) {
      this.apiService.getJobsByCategory(category).subscribe(data => {
        this.jobs = data;
      },
        error => {
          alert("No jobs available!");
        }
      );
    } 
  }
}