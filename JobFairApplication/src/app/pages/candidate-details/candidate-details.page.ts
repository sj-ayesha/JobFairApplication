import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { CandidatesService } from 'src/app/services/candidates.service';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.page.html',
  styleUrls: ['./candidate-details.page.scss'],
})
export class CandidateDetailsPage implements OnInit {
  myForm: FormGroup;
  jobs: any;
  public items: any;
  public candidate: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private candidateDetails: CandidatesService) { }

  ngOnInit() {
    this.items = this.dataService.getJobs();
    this.candidate = this.candidateDetails.getcandidateDetail();

    console.log(this.candidate);

    // this.jobs = [
    //   { id: 1, name: 'Software Engineer' },
    //   { id: 2, name: 'Front End Developer' },
    //   { id: 3, name: 'Javasript Developer' },
    //   { id: 4, name: 'Angular Devloper' },
    //   { id: 5, name: 'React Developer' },
    //   { id: 6, name: 'NodeJS Developer' }
    // ];
  }
}
