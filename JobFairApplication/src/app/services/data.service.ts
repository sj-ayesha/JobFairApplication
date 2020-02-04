import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public items: any = [];

  constructor() {
    this.items = [
      { title: 'Software Developer' },
      { title: 'Front Developer' },
      { title: 'Back Developer' },
      { title: 'QA' },
      { title: 'Manager' },
      { title: 'HR' }
    ];
   }

   filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  public getJobs() {
    return this.items;
  }
}
