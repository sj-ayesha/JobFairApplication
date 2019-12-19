import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CandidatesService } from 'src/app/services/candidates.service';
import { ApiService } from 'src/app/services/api.service';
import { Candidate } from 'src/app/model/candidate';
import { ActivatedRoute } from '@angular/router';
import { Qualification } from 'src/app/model/qualification';
import { Experience } from 'src/app/model/experience';
import { Skills } from 'src/app/model/skills';
import { FormGroup, FormBuilder, Validators, FormControl, Form, FormArray } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.page.html',
  styleUrls: ['./candidate-details.page.scss'],
})
export class CandidateDetailsPage implements OnInit {
  formCandidateScreening: FormGroup;

  jobs: any;
  public items: any;
  candidate: Candidate;
  qualifications;
  experiences;
  skills;
  public today: any;
  public venueName: string;
  submitted = false;
  date: any;
  day: any;
  month: any;
  year: any;
  status: any;

  // tslint:disable-next-line: variable-name
  error_messages = {
    interviewerName: [
      { type: 'required', message: '⚠ interviewerName is required' },
      { type: 'maxLength', message: '⚠ interviewerName must be less than 30 letters' },
      { type: 'pattern', message: '⚠ interviewerName is invalid' }
    ],
  }

  constructor(
    private dataService: DataService,
    private candidateDetailsService: CandidatesService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController
  ) {
    this.formCandidateScreening = this.formBuilder.group({
      // tslint:disable-next-line: max-line-length
      interviewerName: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      interviewVenue: new FormControl(localStorage.getItem('venue_name')),
      interviewDate: new FormControl(new Date()),
      feedback: new FormControl('')
    });
  }

  ngOnInit() {
    this.items = this.dataService.getJobs();
    const candiateId: any = this.route.snapshot.paramMap.get('candidateId');
    this.getCandidateById(candiateId);
    this.today = new Date();

    this.venueName = localStorage.getItem('venue_name');

    //Date Format
    this.today = new Date();
    this.day = String(this.today.getDate());
    this.month = this.today.getMonth() + 1;
    this.year = this.today.getFullYear();

    this.date = (this.year + '-' + this.month + '-' + this.day);
  }

  getCandidateById(candidateId: number) {
    this.apiService.getCandidateById(candidateId).subscribe(data => {
      this.candidate = data;
      this.qualifications = this.candidate.qualificationDtos;
      this.experiences = this.candidate.experienceDtos;
      this.skills = this.candidate.candidateSkillDtos;
    }
    );
  }

  radioButtonValue(getValue){
    this.status = getValue.target.value;
  }

  submitInterviewDetails() {
    const interviewDetails = {
      interviewDate: this.formCandidateScreening.get('interviewDate').value,
      interviewVenue: this.formCandidateScreening.get('interviewVenue').value,
      interviewerName: this.formCandidateScreening.get('interviewerName').value,
      feedback: this.formCandidateScreening.get('feedback').value,
      status: this.status
    }
    console.log(interviewDetails);
  }

  async successMsg() {
    const toast = await this.toastCtrl.create({
      message: 'Your information has been succesfully saved',
      position: 'top',
      color: 'success',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  async unsuccessMsg() {
    const toast = await this.toastCtrl.create({
      message: 'Please fill in all the required fields',
      position: 'top',
      color: 'danger',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  onSubmit() {
    this.submitted = true;
    // tslint:disable-next-line: max-line-length
    if (this.formCandidateScreening.invalid) {
      this.unsuccessMsg();
    } else {
      this.submitInterviewDetails();
      this.successMsg();

      // setTimeout(() => {
      //   this.formCandidateDetails.reset();
      //   this.router.navigate(['home']);
      // }, 2000);

    }
  }
}
