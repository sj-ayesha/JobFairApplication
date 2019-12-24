import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CandidateSkill } from 'src/app/model/CandidateSkill';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { ToastController } from '@ionic/angular';
import { Skills } from 'src/app/model/skills';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-candidate-add-profile',
  templateUrl: './candidate-add-profile.page.html',
  styleUrls: ['./candidate-add-profile.page.scss']
})
export class CandidateAddProfilePage implements OnInit {
  formCandidateDetails: FormGroup;
  formCandidateUploadCV: FormGroup;

  genders: Array<string>;
  currentLevels: Array<string>;
  academyYears: Array<string>;
  jobTypes: Array<string>;
  titles: Array<string>;
  divisions: Array<string>;
  durations: Array<string>;
  CandidateSkills: CandidateSkill[] = [];
  skill: Skills[];
  candidateId: number;
  selectedDay = '';
  public today: any;
  submitted = false;
  position: string;
  company: string;
  duration: string;
  day: any;
  month: any;
  year: any;
  date: any;
  hours: any;
  minutes: any;
  seconds: any;
  arrayExperience: any[];
  arrayQualification: any[];
  arrayVenue: any[];
  arrayScreening: any[];

  fileData: File = null; // File Upload

  // tslint:disable-next-line: variable-name
  error_messages = {
    firstName: [
      { type: 'required', message: '⚠ First Name is required' },
      {
        type: 'maxLength',
        message: '⚠ First Name must be less than 30 letters'
      },
      { type: 'pattern', message: '⚠ First Name is invalid' }
    ],
    lastName: [
      { type: 'required', message: '⚠ Last Name is required' },
      {
        type: 'maxLength',
        message: '⚠ Last Name must be less than 30 letters'
      },
      { type: 'pattern', message: '⚠ Last Name is invalid' }
    ],
    email: [
      { type: 'required', message: '⚠ Email is required.' },
      { type: 'pattern', message: '⚠ Email is invalid.' }
    ],
    telNumber: [{ type: 'pattern', message: '⚠ Telephone number is invalid' }],
    mobileNumber: [
      { type: 'required', message: '⚠ Mobile number is required.' },
      { type: 'pattern', message: '⚠ Mobile number is invalid' }
    ],
    nationality: [{ type: 'required', message: '⚠ Nationality is required.' }],
    gender: [{ type: 'required', message: '⚠ Gender is required.' }],
    title: [{ type: 'required', message: '⚠ Qualification is required.' }],
    academyYear: [{ type: 'required', message: '⚠ Academy Year is required.' }],
    division: [{ type: 'required', message: '⚠ Division is required.' }],
    availabilityDate: [
      { type: 'required', message: '⚠ Availability Date is required.' }
    ],
    jobType: [{ type: 'required', message: '⚠ Job Type is required.' }],
    currentLevel: [
      { type: 'required', message: '⚠ Current Level is required.' }
    ],
    firstNameCV: [
      { type: 'required', message: '⚠ First Name is required' },
      {
        type: 'maxLength',
        message: '⚠ First Name must be less than 30 letters'
      },
      { type: 'pattern', message: '⚠ First Name is invalid' }
    ],
    lastNameCV: [
      { type: 'required', message: '⚠ Last Name is required' },
      {
        type: 'maxLength',
        message: '⚠ Last Name must be less than 30 letters'
      },
      { type: 'pattern', message: '⚠ Last Name is invalid' }
    ],
    emailCV: [
      { type: 'required', message: '⚠ Email is required.' },
      { type: 'pattern', message: '⚠ Email is invalid.' }
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastCtrl: ToastController,
    private dropdowns: DropdownsService,
    private http: HttpClient
  ) {
    this.formCandidateDetails = this.formBuilder.group({
      firstName: new FormControl(
        '',
        Validators.compose([
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required
        ])
      ),
      lastName: new FormControl(
        '',
        Validators.compose([
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      mobileNumber: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]{8}$')
        ])
      ),
      telNumber: new FormControl(
        '',
        Validators.compose([Validators.pattern('[0-9]{7}$')])
      ),
      nationality: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$')
        ])
      ),
      gender: new FormControl('', Validators.required),
      address: new FormControl(''),
      availabilityDate: new FormControl('', Validators.required),
      currentAcademicYear: new FormControl(''),
      jobType: new FormControl('', Validators.required),

      registrationDate: new FormControl(new Date()),

      currentLevel: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      division: new FormControl(''),
      institution: new FormControl(''),
      graduationDate: new FormControl(''),
      candidateId: new FormControl(''),
      position: new FormControl(''),
      companyName: new FormControl(''),
      duration: new FormControl(''),
      skillId: new FormControl('')
    });

    this.formCandidateUploadCV = this.formBuilder.group({
      firstNameCV: new FormControl(
        '',
        Validators.compose([
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required
        ])
      ),
      lastNameCV: new FormControl(
        '',
        Validators.compose([
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required
        ])
      ),
      emailCV: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
    });
  }

  ngOnInit() {
    // window.localStorage.setItem('priority', JSON.stringify([1, 2, 3]));
    // window.localStorage.setItem('venue_id', JSON.stringify(3));

    const getJobIdLS = window.localStorage.getItem('priority');
    const jobId = getJobIdLS[1];
    window.localStorage.setItem('jobId', jobId);

    this.today = new Date();
    this.day = String(this.today.getDate());
    this.month = this.today.getMonth() + 1;
    this.year = this.today.getFullYear();
    this.hours = this.today.getHours();
    this.minutes = this.today.getMinutes();
    this.seconds = this.today.getSeconds();

    // this.date = (this.year + '-' + this.month + '-' + this.day + 'T' + this.hours + ':' + this.minutes + ':' + this.seconds);
    this.date = this.year + '-' + this.month + '-' + this.day;

    this.populateSkills();

    this.genders = this.dropdowns.genders;
    this.jobTypes = this.dropdowns.jobTypes;
    this.titles = this.dropdowns.titles;
    this.divisions = this.dropdowns.divisions;
    this.durations = this.dropdowns.durations;
    this.academyYears = this.dropdowns.academyYears;
    this.currentLevels = this.dropdowns.currentLevels;
  }

  submitCandidate() {
    const filteredCandidateSkills = this.CandidateSkills.filter(data => {
      return data.checked === true;
    });

    this.arrayExperience = [
      {
        companyName: this.formCandidateDetails.get('companyName').value,
        position: this.formCandidateDetails.get('position').value,
        duration: this.formCandidateDetails.get('duration').value
      }
    ];
    this.arrayQualification = [
      {
        title: this.formCandidateDetails.get('title').value,
        division: this.formCandidateDetails.get('division').value,
        institution: this.formCandidateDetails.get('institution').value,
        graduationDate: this.formCandidateDetails.get('graduationDate').value
      }
    ];
    this.arrayVenue = [{
      venueId: window.localStorage.getItem('venue_id'),
      jobId: window.localStorage.getItem('jobId'),
      jobPriority: window.localStorage.getItem('priority')
    }];
    const candidateDetails = {
      firstName: this.formCandidateDetails.get('firstName').value,
      lastName: this.formCandidateDetails.get('lastName').value,
      email: this.formCandidateDetails.get('email').value,
      telNumber: this.formCandidateDetails.get('telNumber').value,
      mobileNumber: this.formCandidateDetails.get('mobileNumber').value,
      gender: this.formCandidateDetails.get('gender').value,
      address: this.formCandidateDetails.get('address').value,
      nationality: this.formCandidateDetails.get('nationality').value,
      registrationDate: this.formCandidateDetails.get('registrationDate').value,
      availabilityDate: this.formCandidateDetails.get('availabilityDate').value,
      currentLevel: this.formCandidateDetails.get('currentLevel').value,
      jobType: this.formCandidateDetails.get('jobType').value,
      currentAcademicYear: this.formCandidateDetails.get('currentAcademicYear').value,
      experienceDtos: this.arrayExperience,
      qualificationDtos: this.arrayQualification,
      candidateSkillDtos: filteredCandidateSkills,
      candidateVenueJobSaveDto: this.arrayVenue,
      candidateScreeningDtos: this.arrayScreening
    };
    console.log(candidateDetails);

    this.apiService.saveCandidate(candidateDetails).subscribe(
      data => {
        // this.router.navigate(['home']);
      },
      error => {
        // alert("Data not saved!");
      }
    );
  }

  ionViewWillLoad() { }

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
        let data = {
          skill: element,
          checked: null
        };
        if (element !== null && this) {
          this.CandidateSkills.push(data);
        }
      });
      // console.log(this.CandidateSkills);
    });
  }

  checkCheckBoxvalue(event: CustomEvent, skill: CandidateSkill) {
    skill.checked = event.detail.checked;
  }

  routeToJob(jobQueryParam: string) {
    this.router.navigate(['/job-list', jobQueryParam]);
  }

  onSubmit() {
    this.submitted = true;
    // tslint:disable-next-line: max-line-length
    if (this.formCandidateDetails.invalid) {
      this.unsuccessMsg();
    } else {
      this.submitCandidate();
      this.successMsg();

      setTimeout(() => {
        this.formCandidateDetails.reset();
        this.router.navigate(['home']);
      }, 2000);
    }
  }

  duplicate() {
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
                    *ngIf="addCandidate.get('position').hasError(error.type) &&
                     (addCandidate.get('position').dirty || addCandidate.get('position').touched)">
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
                    *ngIf="addCandidate.get('company').hasError(error.type) &&
                    (addCandidate.get('company').dirty || addCandidate.get('company').touched)">
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
                    *ngIf="addCandidate.get('duration').hasError(error.type) && 
                    (addCandidate.get('duration').dirty || addCandidate.get('duration').touched)">
                    {{ error.message }}
                </div>
            </ng-container>
        </div>
    </ion-col>
</ion-row>
  `;

    document.getElementById('content').appendChild(div);
  }

  // Tab Button Function
  openTab(event, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');

    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }

    tablinks = document.getElementsByClassName('tablinks');

    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.className += ' active';
  }

  // File Upload Section
  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
  }

  onSubmitCV() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.http
      .post('url/to/your/api', formData, {
        reportProgress: true,
        observe: 'events'
      })
      .subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          console.log(
            'Upload progress: ',
            Math.round((events.loaded / events.total) * 100) + '%'
          );
        } else if (events.type === HttpEventType.Response) {
          console.log(events);
        }
      });
  }
}
