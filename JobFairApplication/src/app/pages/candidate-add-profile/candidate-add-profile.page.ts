import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';

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
  qualifications: Array<string>;
  divisions: Array<string>;
  durations: Array<string>;
  // skills: Array<string>;
  // tslint:disable-next-line: variable-name
  public skills = [
    { val: 'Angular', isChecked: true },
    { val: 'C#', isChecked: false },
    { val: 'Java', isChecked: false },
    { val: 'React', isChecked: false },
    { val: 'Vue', isChecked: false },
    { val: 'SQL', isChecked: false },
  ];

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
    qualification: [
      { type: 'required', message: '⚠ Qualification is required.' },
    ]
  };

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formInformation = this.formBuilder.group({
      firstname: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      lastname: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{7,12}$')
      ])),
      nationality: new FormControl('', Validators.compose([
        Validators.required
      ])),
      gender: new FormControl('', Validators.required),
      address: new FormControl('')
    });
    this.formQualification = this.formBuilder.group({
      qualification: new FormControl('', Validators.required),
      division: new FormControl(''),
      institution: new FormControl(''),
    });

    this.formExperience = this.formBuilder.group({
      position: new FormControl(''),
      company: new FormControl(''),
      duration: new FormControl(''),
    });
    this.formSkills = this.formBuilder.group({
      skill: new FormControl('')
    });
  }

  ngOnInit() {
    this.genders = [
      'Male',
      'Female'
    ];
    this.qualifications = [
      'HSC',
      'Diploma',
      'Degree',
      'Masters',
      'PHD'
    ];
    this.divisions = [
      '1st Class',
      '2nd Class',
      '3rd Class'
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
}
