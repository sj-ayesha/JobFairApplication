import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-candidate-add-profile',
  templateUrl: './candidate-add-profile.page.html',
  styleUrls: ['./candidate-add-profile.page.scss'],
})
export class CandidateAddProfilePage implements OnInit {
  addCandidate: FormGroup;

  // tslint:disable-next-line: variable-name
  error_messages = {
    firstname: [
      { type: 'required', message: 'First Name is required'},
      { type: 'maxLength', message: 'First Name must be less than 30 letters'},
      { type: 'pattern', message: 'Invalid First Name'}
    ]
  };

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.addCandidate = this.formBuilder.group({
      firstname: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required]))
    });
  }

  ngOnInit() {
  }

}
