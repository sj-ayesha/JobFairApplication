import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public items: any = [];

  constructor() {
    this.items = [
      { title: "Software" },
      { title: "Front" },
      { title: "Back" },
      { title: "QA" },
      { title: "Manager" },
      { title: "HR" }
    ];
   }

   filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
