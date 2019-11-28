import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: FormGroup;

  error_messages = {
    username: [
      { type: 'required', message: '⚠ Username is required.' },
      { type: 'minlength', message: '⚠ Username must be of 3 characters.' },
      { type: 'maxlength', message: '⚠ Username must be of 3 characters.' }
      // { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      // { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    password: [
      { type: 'required', message: '⚠ Password is required.' },
    ]
  };
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.login = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.maxLength(3),
        Validators.minLength(3),
        // Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      password: new FormControl('', Validators.required)
    });
  }
  ngOnInit() {
  }

}
