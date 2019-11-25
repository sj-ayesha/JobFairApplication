import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.page.html',
  styleUrls: ['./job-list.page.scss'],
})
export class JobListPage implements OnInit, AfterViewInit {

  jobs: any;

  constructor() { }

  ngOnInit() {
    

    this.jobs = [
      { id: 1, name: 'Software Engineer' },
      { id: 2, name: 'Front End Developer' },
      { id: 3, name: 'JAVASCRIPT Developer' },
      { id: 4, name: 'ANGULAR Devloper' },
      { id: 5, name: 'REACT Developer' },
      { id: 6, name: 'NODEJS Developer' }
    ];
  }

  ngAfterViewInit() {
    this.styleAccordion();
  }

  styleAccordion() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  }

}
