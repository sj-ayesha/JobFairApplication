import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownsService {
  public genders: any[];
  public jobTypes: any[];
  public currentLevels: any[];
  public academyYears: any[];
  public titles: any[];
  public divisions: any[];
  public durations: any[];
  public categories: any[];
  public roles: any[];

  constructor() {
    this.genders = [
      'Male',
      'Female'
    ];

    this.jobTypes = [
      'Full-Time',
      'Part-Time',
      'Internship'
    ];

    this.currentLevels = [
      'Fresher',
      'Junior',
      'Senior'
    ];


    this.academyYears = [
      '1st Year 1st Semester',
      '1st Year 2nd Semester',
      '2nd Year 1st Semester',
      '2nd Year 2nd Semester',
      '3rd Year 1st Semester',
      '3rd Year 2nd Semester',
      'Graduated'
    ];

    this.titles = [
      'Degree',
      'HSC',
      'Diploma',
      'Masters',
      'PHD'
    ];
    this.divisions = [
      '1st Class Honours',
      '2nd Class 1st Division Honours',
      '2nd Class 2nd Division Honours',
      '3rd Class Honours',
      'Pass Degree',
      'MSc with Distinction',
      'MSc with Merit',
      'MSc',
      'No Award'
    ];
    this.durations = [
      '< 1 year',
      '1 year',
      '2 years',
      '3 years',
      '4 years',
      '5 years',
      '6 years',
      '7 years',
      '8 years',
      '9 years',
      '10 years',
      '> 10 years',
    ];
    this.categories = [
      'Software Engineer',
      'Human Resource',
      'Manager',
      'Business Analyst',
      'Quality Assurance',
      'Architect'
    ];
    this.roles = [
      'HR',
      'MANAGER',
      'INTERVIEWER'
    ];
   }
}
