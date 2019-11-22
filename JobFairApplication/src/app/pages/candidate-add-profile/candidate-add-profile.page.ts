import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-candidate-add-profile',
  templateUrl: './candidate-add-profile.page.html',
  styleUrls: ['./candidate-add-profile.page.scss'],
})
export class CandidateAddProfilePage implements OnInit {
  addCandidate: FormGroup;

  genders: Array<string>;
  qualifications: Array<string>;
  divisions: Array<string>;
  // tslint:disable-next-line: variable-name
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
    ],
  };

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.addCandidate = this.formBuilder.group({
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
      qualification: new FormControl('', Validators.required),
      division: new FormControl(''),
      address: new FormControl(''),
      institution: new FormControl('')
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
  }

  ionViewWillLoad() {

  }

}
