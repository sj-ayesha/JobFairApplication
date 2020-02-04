import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CandidateSkill } from 'src/app/model/CandidateSkill';
import { ApiService } from 'src/app/services/api.service';
import { CandidatesService } from 'src/app/services/candidates.service';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { ToastController } from '@ionic/angular';
import { Skills } from 'src/app/model/skills';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Candidate } from 'src/app/model/candidate';

@Component({
  selector: 'app-candidate-add-profile',
  templateUrl: './candidate-add-profile.page.html',
  styleUrls: ['./candidate-add-profile.page.scss']
})
export class CandidateAddProfilePage implements OnInit {

  formCandidateDetails: FormGroup;

  photos: any[];
  genders: Array<string>;
  currentLevels: Array<string>;
  academyYears: Array<string>;
  jobTypes: Array<string>;
  titles: Array<string>;
  divisions: Array<string>;
  durations: Array<string>;
  CandidateSkills: CandidateSkill[] = [];
  skill: Skills[];
  arrayExperience: any[];
  arrayQualification: any[];
  arrayVenue: any[];
  arrayScreening: any[];
  arrayFile: any[];
  fileData: FileList = null; // File Upload
  selectedFiles: File[] = [];
  myFiles: string [] = [];
  uploading: boolean;
  attachments: File[] = [];

  candidateId: number;
  selectedDay = '';
  position: string;
  company: string;
  duration: string;
  fileName: string;
  day: any;
  month: any;
  year: any;
  date: any;
  hours: any;
  minutes: any;
  seconds: any;
  public today: any;
  submitted = false;

  errorMessages = {
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
      { type: 'pattern', message: '⚠ Mobile number is invalid' }
    ],
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
    private candidateService: CandidatesService
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
          Validators.pattern('[0-9]{8}$')
        ])
      ),
      telNumber: new FormControl(
        '',
        Validators.compose([Validators.pattern('[0-9]{7}$')])
      ),
      nationality: new FormControl(
        'Mauritian',
        Validators.compose([
          Validators.pattern('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$')
        ])
      ),
      gender: new FormControl('Male'),
      address: new FormControl(),
      availabilityDate: new FormControl(Validators.required),
      currentAcademicYear: new FormControl(),
      jobType: new FormControl(Validators.required),

      registrationDate: new FormControl(new Date()),

      currentLevel: new FormControl('Fresher', Validators.required),
      title: new FormControl('Degree'),
      division: new FormControl(),
      institution: new FormControl(),
      graduationDate: new FormControl(),
      candidateId: new FormControl(),
      position: new FormControl(),
      companyName: new FormControl(),
      duration: new FormControl(),
      skillId: new FormControl(),
      cvUpload: new FormControl()
    });
  }


  ngOnInit() {
    this.today = new Date();
    this.day = String(this.today.getDate());
    this.month = this.today.getMonth() + 1;
    this.year = this.today.getFullYear();
    this.hours = this.today.getHours();
    this.minutes = this.today.getMinutes();
    this.seconds = this.today.getSeconds();

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

  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
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

  // submit information without cv
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
    if (
      this.arrayExperience[0].companyName == null &&
      this.arrayExperience[0].position == null &&
      this.arrayExperience[0].duration == null) {
        this.arrayExperience = [];
    }

    this.arrayVenue = [{
      venueId: window.localStorage.getItem('venue_id'),
      jobId: window.localStorage.getItem('jobId'),
      jobPriority: window.localStorage.getItem('priority')
    }];

    this.arrayFile = [];

    const candidateDetails = {
      candidateId: null,
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
      cvUpload: false,
      experienceDtos: this.arrayExperience,
      qualificationDtos: this.arrayQualification,
      candidateSkillDtos: filteredCandidateSkills,
      candidateVenueJobSaveDto: this.arrayVenue,
      candidateScreeningDtos: this.arrayScreening,
      candidateFileDtos: this.arrayFile
    };

    this.apiService.saveCandidate(candidateDetails).subscribe(
      data => {
      },
      error => {
      }
    );
  }

  // submit candidate with cv
  submitCandidateCV() {
    if (this.formCandidateDetails.invalid || this.fileData === null) {
      this.unsuccessMsg();
    } else {
      this.attachFile();
      this.successMsg();

      setTimeout(() => {
        this.formCandidateDetails.reset();
        this.router.navigateByUrl('/home');
      }, 2000);
    }
  }

  selectFile(event) {
    this.fileData = event.target.files;
    this.checkFileFormatSize();
  }

  checkFileFormatSize() {
    const output = document.getElementById('fileList');

    for (let i = 0; i < this.fileData.length; i++) {
      const file = this.fileData.item(i);

      if (file.type.match('image.*|application.*')) {
        const size = this.fileData.item(i).size;
        if (size > 5266467) {
          alert('size must not exceeds 5 MB');
        } else {
          output.innerHTML += '<li style="list-style: none;"><ion-icon ios="ios-document" md="md-document"></ion-icon>'
          + file.name + '</li>';
          this.attachments.push(file);
        }
      } else {
        alert('invalid format!');
      }
    }
  }

  attachFile() {
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
    if (
      this.arrayExperience[0].companyName == null &&
      this.arrayExperience[0].position == null &&
      this.arrayExperience[0].duration == null) {
        this.arrayExperience = [];
    }

    this.arrayFile = [];

    const candidateDetails = {
      candidateId: null,
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
      cvUpload: true,
      experienceDtos: this.arrayExperience,
      qualificationDtos: this.arrayQualification,
      candidateSkillDtos: filteredCandidateSkills,
      candidateVenueJobSaveDto: this.arrayVenue,
      candidateScreeningDtos: this.arrayScreening,
      candidateFileDtos: this.arrayFile
    };

    this.candidateService.uploadCVs(candidateDetails, this.attachments).toPromise().then(
      (res) => {
        console.log('res', res);
      }
    )
    .catch(err => console.log('err', err));
  }

  populateSkills() {
    this.apiService.getAllSkills().subscribe(data => {
      data.forEach((element, index) => {
        const data = {
          skill: element,
          checked: null
        };
        if (element !== null && this) {
          this.CandidateSkills.push(data);
        }
      });
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
        this.router.navigateByUrl('/home');
      }, 2000);
    }
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
}
