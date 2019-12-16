import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form, FormArray } from '@angular/forms';
import { CandidateSkill } from 'src/app/model/CandidateSkill';
import { ApiService } from 'src/app/services/api.service';
import { Router, ChildActivationStart } from '@angular/router';
import { element } from 'protractor';
import { ToastController } from '@ionic/angular';
import { Skills } from 'src/app/model/skills';

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
  CandidateSkills: CandidateSkill[] = [];
  skills: Skills[];
  candidateId: Number;
  selectedDay: String = '';
  public today: any;
  submitted = false;
  position: String;
  company: String;
  duration: String;

  x = false;
  day: any;
  month: any;
  year: any;

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
    firstName: [
      { type: 'required', message: '⚠ First Name is required' },
      { type: 'maxLength', message: '⚠ First Name must be less than 30 letters' },
      { type: 'pattern', message: '⚠ First Name is invalid' }
    ],
    lastName: [
      { type: 'required', message: '⚠ Last Name is required' },
      { type: 'maxLength', message: '⚠ Last Name must be less than 30 letters' },
      { type: 'pattern', message: '⚠ Last Name is invalid' }
    ],
    email: [
      { type: 'required', message: '⚠ Email is required.' },
      { type: 'pattern', message: '⚠ Email is invalid.' }
    ],
    telNumber: [
      { type: 'pattern', message: '⚠ Telephone number is invalid' }
    ],
    phoneNumber: [
      { type: 'required', message: '⚠ Mobile number is required.' },
      { type: 'pattern', message: '⚠ Mobile number is invalid' }
    ],
    nationality: [
      { type: 'required', message: '⚠ Nationality is required.' },
    ],
    gender: [
      { type: 'required', message: '⚠ Gender is required.' },
    ],
    title: [
      { type: 'required', message: '⚠ Qualification is required.' },
    ],
    academyYear: [
      { type: 'required', message: '⚠ Academy Year is required.' },
    ],
    division: [
      { type: 'required', message: '⚠ Division is required.' },
    ],
    availabilityDate: [
      { type: 'required', message: '⚠ Availability Date is required.' },
    ],
    jobType: [
      { type: 'required', message: '⚠ Job Type is required.' },
    ],
    currentLevel: [
      { type: 'required', message: '⚠ Current Level is required.' },
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    this.formInformation = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      mobileNumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{8}$')
      ])),
      telNumber: new FormControl('', Validators.compose([
        Validators.pattern('[0-9]{7}$')
      ])),
      nationality: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")
      ])),
      gender: new FormControl('', Validators.required),
      address: new FormControl(''),
      availabilityDate: new FormControl('', Validators.required),
      currentAcademicYear: new FormControl(''),
      jobType: new FormControl('', Validators.required),
      registrationDate: new FormControl(new Date()),
      currentLevel: new FormControl('', Validators.required),
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
      skillId: new FormControl(''),
      candidateId: new FormControl('')
    });
  }

  date: any;

  ngOnInit() {

    this.today = new Date();
    this.day = String(this.today.getDate());
    this.month = this.today.getMonth() + 1;
    this.year = this.today.getFullYear();

    this.date = (this.year + '-' + this.month + '-' + this.day);
    
    this.genders = [
      'Male',
      'Female'
    ];

    this.jobTypes = [
      'Full-Time',
      'Part-Time',
      'Intern-ship'
    ];

    this.currentLevels = [
      'Fresher',
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

  populateSkills() {
    this.apiService.getAllSkills().subscribe(data => {
      data.forEach((element, index) => {
        let data =       {
          skillId: element,
          candidateId: null,
          checked: null,
          message: null
        }

        if( element !== null && this) {
          this.CandidateSkills.push(data);
        }

      });
      console.log(this.CandidateSkills)
    });
  }

  checkCheckBoxvalue(event: CustomEvent, skill: CandidateSkill) {
    skill.checked = event.detail.checked;
    skill.candidateId = this.formSkills.get('candidateId').value;
  }

  routeToJob(jobQueryParam: String) {
    this.router.navigate(['/job-list', jobQueryParam]);
  }

  onSubmit() {
    this.submitted = true;
    // tslint:disable-next-line: max-line-length
    if (this.formQualification.invalid && this.formInformation.invalid) {
      console.log(this.submitted, "not sucessful");
      this.unsuccessMsg();
    } else {
      // this.submitCandidate();
      this.submitCandidate();
      console.log(this.submitted, "sucessful");
      this.successMsg();

      setTimeout(() => {
        this.formInformation.reset();
        this.formQualification.reset();
        this.formExperience.reset();
        this.formSkills.reset();
        this.router.navigate(['home']);
      }, 2000);

    }
  }

  submitCandidate() {
    this.apiService.saveCandidate(this.formInformation.value).subscribe(data => {
      this.submitQualificationAndExperience();
      // this.router.navigate(['home']);
    },
      error => {
        // alert("Data not saved!");
      }
    );
  }

  submitQualificationAndExperience(){
    this.apiService.getCandidateIdByEmail(this.formInformation.get('email').value).subscribe(data => {
      this.candidateId = data.candidateId;
      this.formQualification.patchValue(
        {
          candidateId: this.candidateId
        });

      this.formExperience.patchValue({
        candidateId: this.candidateId
      });

      this.formSkills.patchValue({
        candidateId: this.candidateId
      });

      this.apiService.saveQualification(this.formQualification.value).subscribe(data => {
      },
        error => {
          // alert("Data not saved!");
        }
      );

      this.position = this.formExperience.get('position').value;

      if(this.position == ""){
        
      } else {
        this.apiService.saveExperience(this.formExperience.value).subscribe(data => {
        },
          error => {
            // alert("Data not saved!");
          }
        );
      }

      this.CandidateSkills.filter(x => {
        x.candidateId = this.candidateId;
      })

      // this.apiService.saveCandidateSkill(this.CandidateSkills).subscribe(data => {
      // });

      this.saveCandidateVenueJob(this.candidateId);
      console.log(this.CandidateSkills);

    });
  }

  saveCandidateVenueJob(candidateId: Number){
    var getJobIdLS = window.localStorage.getItem("priority");
    var jobId = getJobIdLS[1]
    // test.replace('[','p');
    console.log(jobId);
    const priority = {
      venueId: parseInt(window.localStorage.getItem('venue_id')),
      jobId: parseInt(jobId),
      candidateId: candidateId,
      jobPriority: getJobIdLS
    }
    console.log(priority);
    this.apiService.saveCandidateVenueJob(priority).subscribe(data=>{
      console.log("Saved")
    });
  }

  duplicate() {
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
}
