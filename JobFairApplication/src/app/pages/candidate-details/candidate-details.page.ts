import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.page.html',
  styleUrls: ['./candidate-details.page.scss'],
})
export class CandidateDetailsPage implements OnInit {
  myForm: FormGroup;
  jobs: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.jobs = [
      { id: 1, name: 'Software Engineer' },
      { id: 2, name: 'Front End Developer' },
      { id: 3, name: 'Javasript Developer' },
      { id: 4, name: 'Angular Devloper' },
      { id: 5, name: 'React Developer' },
      { id: 6, name: 'NodeJS Developer' }
    ];
  }
}
