import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public category: any = [];

  constructor() {
    this.category = [
      { title: 'Software Engineer', img: '../../../assets/img/job_category/software_engineer.png' },
      { title: 'Human Resource', img: '../../../assets/img/job_category/hr.png' },
      { title: 'Manager', img: '../../../assets/img/job_category/management.png' },
      { title: 'Business Analyst', img: '../../../assets/img/job_category/BA.png' },
      { title: 'Quality Assurance', img: '../../../assets/img/job_category/QA.png' },
      { title: 'Architect', img: '../../../assets/img/job_category/architect.png' }
    ];
   }

  public getCategory() {
    return this.category;
  }
}
