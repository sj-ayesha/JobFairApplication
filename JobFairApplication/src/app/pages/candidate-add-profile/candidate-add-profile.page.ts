import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { Skill } from 'src/app/model/skill';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-add-profile',
  templateUrl: './candidate-add-profile.page.html',
  styleUrls: ['./candidate-add-profile.page.scss'],
})
export class CandidateAddProfilePage implements OnInit {
  addCandidate: FormGroup;
  formInformation: FormGroup;
  formQualification: FormGroup;
  formExperience: FormGroup;
  formSkills: FormGroup;

  genders: Array<string>;
  currentLevels: Array<string>;
  academyYears: Array<string>;
  jobTypes: Array<string>;
  titles: Array<string>;
  divisions: Array<string>;
  durations: Array<string>;
  skills: Skill[];
  candidateId: Number;
  // skills: Array<string>;
  // tslint:disable-next-line: variable-name
  // public skills = [
  //   { val: 'Angular', isChecked: true },
  //   { val: 'C#', isChecked: false },
  //   { val: 'Java', isChecked: false },
  //   { val: 'React', isChecked: false },
  //   { val: 'Vue', isChecked: false },
  //   { val: 'SQL', isChecked: false },
  // ];

  error_messages = {
    firstname: [
      { type: 'required', message: '⚠ First Name is required'},
      { type: 'maxLength', message: '⚠ First Name must be less than 30 letters'},
      { type: 'pattern', message: '⚠ First Name is invalid'}
    ],
    lastname: [
      { type: 'required', message: '⚠ Last Name is required'},
      { type: 'maxLength', message: '⚠ Last Name must be less than 30 letters'},
      { type: 'pattern', message: '⚠ Last Name is invalid'}
    ],
    email: [
      { type: 'required', message: '⚠ Email is required.' },
      { type: 'pattern', message: '⚠ Email is invalid.' }
    ],
    phone: [
      { type: 'required', message: '⚠ Phone is required.' },
      { type: 'pattern', message: '⚠ Phone number is invalid' }
    ],

    nationality: [
      { type: 'required', message: '⚠ Nationality is required.' },
    ],
    gender: [
      { type: 'required', message: '⚠ Gender is required.' },
    ],
    title: [
      { type: 'required', message: '⚠ Title is required.' },
    ],
    academyYear: [
      { type: 'required', message: '⚠ Academy Year is required.' },
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.formInformation = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      telNumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{7,12}$')
      ])),
      nationality: new FormControl('', Validators.compose([
        Validators.required
      ])),
      mobileNumber: new FormControl(''),
      gender: new FormControl('', Validators.required),
      address: new FormControl(''),
      availabilityDate: new FormControl(''),
      currentAcademicYear: new FormControl(''),
      jobType: new FormControl(''),
      registrationDate: new FormControl(''),
      currentLevel: new FormControl(''),
    });
    this.formQualification = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      division: new FormControl(''),
      institution: new FormControl(''),
      graduationDate: new FormControl(''),
      candidateId: new FormControl(''),
    });

    this.formExperience = this.formBuilder.group({
      position: new FormControl(''),
      companyName: new FormControl(''),
      duration: new FormControl(''),
      candidateId: new FormControl('')
    });
    this.formSkills = this.formBuilder.group({
      skill: new FormControl(''),
      candidateId: new FormControl('')
    });
  }

  ngOnInit() {
    this.genders = [
      'Male',
      'Female'
    ];

    this.jobTypes = [
      'Full-Time',
      'Half-Time',
      'Intern-ship'
    ];

    this.currentLevels = [
      'Fresher',
      'Experience'
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
      'HSC',
      'Diploma',
      'Degree',
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

    this.populateSkills();
  }

  ionViewWillLoad() {

  }

  duplicate(){
    console.log('Hi');
    const div = document.createElement('div');

    div.className = 'row';

    div.innerHTML = `
    <ion-row id="duplicater">
    <ion-col col-md-6 size="12" size-sm>
        <ion-item>
            <ion-input formControlName="position" type="text" placeholder="Position"></ion-input>
        </ion-item>
        <div class="error-messages">
            <ng-container *ngFor='let error of error_messages.position'>
                <div class="error-message"
                    *ngIf="addCandidate.get('position').hasError(error.type) && (addCandidate.get('position').dirty || addCandidate.get('position').touched)">
                    {{ error.message }}
                </div>
            </ng-container>
        </div>
    </ion-col>
    <ion-col col-md-6 size="12" size-sm>
        <ion-item>
            <ion-input formControlName="company" type="text" placeholder="Company"></ion-input>
        </ion-item>
        <div class="error-messages">
            <ng-container *ngFor='let error of error_messages.company'>
                <div class="error-message"
                    *ngIf="addCandidate.get('company').hasError(error.type) && (addCandidate.get('company').dirty || addCandidate.get('company').touched)">
                    {{ error.message }}
                </div>
            </ng-container>
        </div>
    </ion-col>
</ion-row>
<ion-row>
    <ion-col size="6" size-md size="12" size-sm>
        <ion-item>
            <ion-label floating color="medium">*Duration</ion-label>
            <ion-select interface="popover" formControlName="duration" cancelText="Cancel" okText="OK">
                <ion-select-option *ngFor="let duration of durations" [value]="duration">
                    {{ duration }}
                </ion-select-option>
            </ion-select>
        </ion-item>
        <div class="error-messages">
            <ng-container *ngFor='let error of error_messages.duration'>
                <div class="error-message"
                    *ngIf="addCandidate.get('duration').hasError(error.type) && (addCandidate.get('duration').dirty || addCandidate.get('duration').touched)">
                    {{ error.message }}
                </div>
            </ng-container>
        </div>
    </ion-col>
</ion-row>
  `;

    document.getElementById('content').appendChild(div);
  }

  populateSkills(){
    this.apiService.getAllSkills().subscribe(data=>{
      this.skills = data;
    });
  }

  submitCandidate(){
    // this.apiService.saveCandidate(this.formInformation.value).subscribe(data=>{
    //   alert("Candidate saved successfully!");
    //   // this.router.navigate(['home']);
    // },
    // error => {
    //   alert("Data not saved!");
    // }
    // );

    this.apiService.getCandidateIdByEmail(this.formInformation.get('email').value).subscribe(data=>{
      this.candidateId = data.candidateId;
      this.formQualification.patchValue(
        {
        candidateId:this.candidateId
      });

      this.formExperience.patchValue({
        candidateId:this.candidateId
      });

      this.formSkills.patchValue({
        candidateId:this.candidateId
      });

      // this.apiService.saveQualification(this.formQualification.value).subscribe(data=>{
      //   alert("Qualification saved successfully!");
      // },
      // error => {
      //   alert("Data not saved!");
      // }
      // );

      // this.apiService.saveExperience(this.formExperience.value).subscribe(data=>{
      //   alert("Experience saved successfully!");
      // },
      // error => {
      //   alert("Data not saved!");
      // }
      // );

      // this.apiService.saveCandidateSkill(this.formSkills.value).subscribe(data=>{
      //   console.log(data);
      // });

      

    });
  }
}
