import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { CandidatesService } from 'src/app/services/candidates.service';
import { ApiService } from 'src/app/services/api.service';
import { Candidate } from 'src/app/model/candidate';
import { ActivatedRoute } from '@angular/router';
import { Qualification } from 'src/app/model/qualification';
import { Experience } from 'src/app/model/experience';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.page.html',
  styleUrls: ['./candidate-details.page.scss'],
})
export class CandidateDetailsPage implements OnInit {
  jobs: any;
  public items: any;
  public candidate1: any;
  candidates : Candidate[];
  qualifications: Qualification[];
  experiences: Experience[];
  public today: any; 

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private candidateDetails: CandidatesService,private apiService: ApiService,private route: ActivatedRoute) {
}

  ngOnInit() {
    this.items = this.dataService.getJobs();
    this.candidate1 = this.candidateDetails.getcandidateDetail();

    const candiateId: any = this.route.snapshot.paramMap.get('candidateId');
    this.getCandidateById(candiateId);
    this.getQualificationByCandidateId(candiateId);
    this.getExperienceByCandidateId(candiateId);

    this.today = new Date();
    let dd = String(this.today.getDate()).padStart(2, '0');
    let mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = this.today.getFullYear(); 
 

  }

  getCandidateById(candidateId:Number){
    this.apiService.getCandidateById(candidateId).subscribe(data=>{
      this.candidates = data;
      console.log(this.candidates);
    },
    error => {
      // alert("No Candidate found!");
    }
    );
  }

  getQualificationByCandidateId(candidateId:Number){
    this.apiService.getQualificationByCandidateId(candidateId).subscribe(data=>{
      this.qualifications = data;
      // console.log(this.qualifications);
    },
    error => {
      // alert("No Qualification found!");
    }
    );
  }

  getExperienceByCandidateId(candidateId:Number){
    this.apiService.getExperienceByCandidateId(candidateId).subscribe(data=>{
      this.experiences = data;
      // console.log(this.experiences);
    },
    error => {
      // alert("No Experience found!");
    }
    );
  }
}
