import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginLogoutService } from 'src/app/services/login-logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: FormGroup;
  loggedIn: boolean;

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
    private formBuilder: FormBuilder,
    private loginLogoutService: LoginLogoutService,
    private router: Router
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
    // this.loggedIn = this.loginLogoutService.isLoggedIn;
  }

  LogInEnter(){
    this.loggedIn = true;
    localStorage.setItem("user", "user")
    this.loginLogoutService.loginUser();
    // console.log(this.loggedIn);
  }
}
