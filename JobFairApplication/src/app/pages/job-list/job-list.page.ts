import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.page.html',
  styleUrls: ['./job-list.page.scss'],
})
export class JobListPage implements OnInit, AfterViewInit {

  jobs: any;
  public searchTerm: string = "";
  public items: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
        this.setFilteredItems();
  }

  setFilteredItems() {
    this.items = this.dataService.filterItems(this.searchTerm);
  }

  // ngAfterViewInit() {
  //   this.styleAccordion();
  // }

  // ngOnChanges(): void {

  //   this.styleAccordion();
  // }

  styleAccordion() {
    console.log('test');
    let coll = document.getElementsByClassName('collapsible');
    let i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener('click', function() {
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

}
